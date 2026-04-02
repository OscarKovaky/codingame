import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChatAdapter } from './chat-adapter';
import { ChatQuickReply, ChatReply, ChatReplyDraft, ChatRequest } from './chat.models';

interface ExternalChatApiResponse {
  messages?: Array<{
    sender?: 'bot' | 'user';
    text?: string;
    quickReplies?: ChatQuickReply[];
  }>;
  askForLeadField?: 'name' | 'business' | 'need' | null;
}

@Injectable({
  providedIn: 'root'
})
export class ExternalApiChatAdapter implements ChatAdapter {
  readonly adapterName = 'external-api';

  private readonly http = inject(HttpClient);

  getWelcomeMessages(): ChatReplyDraft[] {
    return [
      {
        sender: 'bot',
        text: 'El widget está listo para conectarse a un backend externo cuando se configure un endpoint real.'
      }
    ];
  }

  getDefaultQuickReplies(): ChatQuickReply[] {
    return [
      { id: 'quote', label: 'Quiero una cotización', action: 'message', payload: 'Quiero una cotización' },
      { id: 'services', label: 'Ver servicios', action: 'navigate-services', payload: 'Ver servicios' },
      { id: 'works', label: 'Ver trabajos', action: 'navigate-works', payload: 'Ver trabajos' },
      { id: 'whatsapp', label: 'Hablar por WhatsApp', action: 'whatsapp', payload: 'Hablar por WhatsApp' }
    ];
  }

  respond(request: ChatRequest): Observable<ChatReply> {
    const endpoint = environment.chat.externalEndpoint;

    return this.http
      .post<ExternalChatApiResponse>(endpoint, {
        message: request.message,
        lead: request.lead,
        history: request.history
      })
      .pipe(
        map((response) => ({
          messages:
            response.messages?.map((message) => ({
              sender: message.sender ?? 'bot',
              text: message.text ?? '',
              quickReplies: message.quickReplies
            })) ?? [],
          askForLeadField: response.askForLeadField ?? null
        }))
      );
  }
}
