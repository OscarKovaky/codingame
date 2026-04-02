import { Observable } from 'rxjs';
import { ChatQuickReply, ChatReply, ChatReplyDraft, ChatRequest } from './chat.models';

export interface ChatAdapter {
  readonly adapterName: string;
  getWelcomeMessages(): ChatReplyDraft[];
  getDefaultQuickReplies(): ChatQuickReply[];
  respond(request: ChatRequest): Observable<ChatReply>;
}
