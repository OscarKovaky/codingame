export type ChatSender = 'bot' | 'user';
export type LeadField = 'name' | 'business' | 'need';
export type ChatAdapterMode = 'auto' | 'local' | 'external';

export interface ChatQuickReply {
  id: string;
  label: string;
  action?: 'message' | 'whatsapp' | 'navigate-services' | 'navigate-works';
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  quickReplies?: ChatQuickReply[];
}

export interface ChatReplyDraft {
  sender: ChatSender;
  text: string;
  quickReplies?: ChatQuickReply[];
}

export interface ChatLead {
  name: string;
  business: string;
  need: string;
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
  lead: ChatLead;
}

export interface ChatReply {
  messages: ChatReplyDraft[];
  askForLeadField?: LeadField | null;
}

export interface ChatWidgetState {
  isOpen: boolean;
  lead: ChatLead;
  pendingLeadField: LeadField | null;
  messages: ChatMessage[];
}
