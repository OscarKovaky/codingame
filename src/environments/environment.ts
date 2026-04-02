import { ChatAdapterMode } from '../app/services/chat/chat.models';

interface AppEnvironment {
  production: boolean;
  chat: {
    mode: ChatAdapterMode;
    externalEndpoint: string;
    storageKey: string;
    whatsappNumber: string;
  };
}

export const environment: AppEnvironment = {
  production: false,
  chat: {
    mode: 'auto',
    externalEndpoint: '',
    storageKey: 'portfolio-chat-state',
    whatsappNumber: ''
  }
};
