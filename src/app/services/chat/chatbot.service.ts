import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatAdapter } from './chat-adapter';
import { ChatQuickReply, ChatReply, ChatReplyDraft, ChatRequest } from './chat.models';
import { ExternalApiChatAdapter } from './external-api-chat.adapter';
import { LocalFaqChatAdapter } from './local-faq-chat.adapter';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private readonly localAdapter = inject(LocalFaqChatAdapter);
  private readonly externalAdapter = inject(ExternalApiChatAdapter);

  getWelcomeMessages(): ChatReplyDraft[] {
    return this.getAdapter().getWelcomeMessages();
  }

  getQuickReplies(): ChatQuickReply[] {
    return this.getAdapter().getDefaultQuickReplies();
  }

  respond(request: ChatRequest): Observable<ChatReply> {
    const primaryAdapter = this.getAdapter();

    if (primaryAdapter.adapterName === this.localAdapter.adapterName) {
      return primaryAdapter.respond(request);
    }

    return primaryAdapter.respond(request).pipe(catchError(() => this.localAdapter.respond(request)));
  }

  get storageKey(): string {
    return environment.chat.storageKey;
  }

  get whatsappUrl(): string {
    const rawNumber = environment.chat.whatsappNumber.replace(/\D/g, '');
    const defaultMessage = encodeURIComponent(
      'Hola, te escribo desde el portafolio. Me interesa una cotización para mi proyecto.'
    );

    return rawNumber
      ? `https://wa.me/${rawNumber}?text=${defaultMessage}`
      : `https://wa.me/?text=${defaultMessage}`;
  }

  private getAdapter(): ChatAdapter {
    const { mode, externalEndpoint } = environment.chat;

    if (mode === 'local') {
      return this.localAdapter;
    }

    if (mode === 'external' && externalEndpoint) {
      return this.externalAdapter;
    }

    if (mode === 'auto' && externalEndpoint) {
      return this.externalAdapter;
    }

    return this.localAdapter;
  }
}
