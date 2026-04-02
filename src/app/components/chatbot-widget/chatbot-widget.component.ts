import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ChatLead,
  ChatMessage,
  ChatQuickReply,
  ChatReplyDraft,
  ChatWidgetState,
  LeadField
} from '../../services/chat/chat.models';
import { ChatbotService } from '../../services/chat/chatbot.service';

type ChatSectionTarget = 'services' | 'works';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chatbot-widget.component.html',
  styleUrl: './chatbot-widget.component.css'
})
export class ChatbotWidgetComponent implements AfterViewChecked {
  @Output() navigateToSection = new EventEmitter<ChatSectionTarget>();

  @ViewChild('messagesViewport')
  private readonly messagesViewport?: ElementRef<HTMLDivElement>;

  private readonly chatbotService = inject(ChatbotService);

  readonly lead: ChatLead = {
    name: '',
    business: '',
    need: ''
  };

  draftMessage = '';
  isOpen = false;
  isLoading = false;
  pendingLeadField: LeadField | null = null;
  messages: ChatMessage[] = [];
  private shouldScrollToBottom = false;

  constructor() {
    this.restoreState();
  }

  ngAfterViewChecked(): void {
    if (!this.shouldScrollToBottom) {
      return;
    }

    this.shouldScrollToBottom = false;
    const viewport = this.messagesViewport?.nativeElement;

    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }

  get quickReplies(): ChatQuickReply[] {
    const latestBotMessage = [...this.messages].reverse().find((message) => message.sender === 'bot');
    return latestBotMessage?.quickReplies?.length ? latestBotMessage.quickReplies : this.chatbotService.getQuickReplies();
  }

  get canSend(): boolean {
    return this.draftMessage.trim().length > 0 && !this.isLoading;
  }

  get whatsappUrl(): string {
    return this.chatbotService.whatsappUrl;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.persistState();
    this.shouldScroll();
  }

  send(): void {
    const message = this.draftMessage.trim();

    if (!message || this.isLoading) {
      return;
    }

    this.draftMessage = '';
    this.pushMessage({ sender: 'user', text: message });

    if (this.pendingLeadField) {
      this.captureLeadValue(message, this.pendingLeadField);
      return;
    }

    this.isLoading = true;

    this.chatbotService
      .respond({
        message,
        history: this.messages,
        lead: { ...this.lead }
      })
      .subscribe({
        next: (reply) => {
          this.pendingLeadField = reply.askForLeadField ?? null;
          this.pushDrafts(reply.messages);
          this.isLoading = false;
          this.persistState();
        },
        error: () => {
          this.pushMessage({
            sender: 'bot',
            text: 'Hubo un problema temporal. Puedes intentar de nuevo o continuar por WhatsApp.',
            quickReplies: this.chatbotService.getQuickReplies()
          });
          this.isLoading = false;
          this.persistState();
        }
      });
  }

  handleQuickReply(reply: ChatQuickReply): void {
    if (reply.action === 'navigate-services') {
      this.navigateToSection.emit('services');
    }

    if (reply.action === 'navigate-works') {
      this.navigateToSection.emit('works');
    }

    if (reply.action === 'whatsapp') {
      window.open(this.whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    this.draftMessage = reply.payload ?? reply.label;
    this.send();
  }

  onMessageKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private captureLeadValue(value: string, field: LeadField): void {
    this.lead[field] = value;

    if (field === 'name') {
      this.pendingLeadField = 'business';
      this.pushDrafts([
        {
          sender: 'bot',
          text: `Gracias, ${value}. ¿Cuál es tu negocio o proyecto?`
        }
      ]);
      this.persistState();
      return;
    }

    if (field === 'business') {
      this.pendingLeadField = 'need';
      this.pushDrafts([
        {
          sender: 'bot',
          text: 'Perfecto. Ahora cuéntame brevemente qué necesitas resolver.'
        }
      ]);
      this.persistState();
      return;
    }

    this.pendingLeadField = null;
    this.pushDrafts([
      {
        sender: 'bot',
        text: 'Excelente. Ya tengo tu nombre, tu proyecto y la necesidad principal.'
      },
      {
        sender: 'bot',
        text: 'Puedes continuar por WhatsApp para revisar alcance, tiempos y propuesta.',
        quickReplies: this.chatbotService.getQuickReplies()
      }
    ]);
    this.persistState();
  }

  private restoreState(): void {
    const rawState = localStorage.getItem(this.chatbotService.storageKey);

    if (!rawState) {
      this.seedInitialState();
      return;
    }

    try {
      const state = JSON.parse(rawState) as ChatWidgetState;
      this.isOpen = state.isOpen;
      this.pendingLeadField = state.pendingLeadField;
      this.messages = state.messages ?? [];
      Object.assign(this.lead, state.lead ?? {});

      if (!this.messages.length) {
        this.seedInitialState();
      }
    } catch {
      this.seedInitialState();
    }
  }

  private seedInitialState(): void {
    this.isOpen = false;
    this.pendingLeadField = null;
    this.messages = [];
    const welcomeMessages = this.chatbotService.getWelcomeMessages();
    this.pushDrafts(welcomeMessages);
    this.persistState();
  }

  private pushDrafts(drafts: ChatReplyDraft[]): void {
    drafts.forEach((draft) => this.pushMessage(draft));
  }

  private pushMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): void {
    this.messages = [
      ...this.messages,
      {
        ...message,
        id: this.createId(),
        timestamp: this.createTimestamp()
      }
    ];
    this.shouldScroll();
  }

  private persistState(): void {
    const state: ChatWidgetState = {
      isOpen: this.isOpen,
      lead: { ...this.lead },
      pendingLeadField: this.pendingLeadField,
      messages: this.messages
    };

    localStorage.setItem(this.chatbotService.storageKey, JSON.stringify(state));
  }

  private shouldScroll(): void {
    this.shouldScrollToBottom = true;
  }

  private createTimestamp(): string {
    return new Date().toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }
}
