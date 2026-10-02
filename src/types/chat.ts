import { RetrievedSource } from './disease';

export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  language?: LanguageCode;
  imageUrl?: string;
  sources?: RetrievedSource[];
  isStreaming?: boolean;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
  category: 'Disease' | 'Yield' | 'Multilingual' | 'General';
}
