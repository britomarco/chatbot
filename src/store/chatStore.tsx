import { create } from 'zustand';
import { IMessage } from './IMessage';

interface ChatState {
  messages: IMessage[];
  theme: 'light' | 'dark';
  userId: string | null;
  addMessage: (message: IMessage) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setUserId: (userId: string) => void;
}

export const botResponses = [
  "Olá! Como posso ajudar você hoje?",
  "Interessante! Conte-me mais sobre isso.",
  "Entendi. Há algo mais que você gostaria de saber?",
  "Ótimo ponto! Vamos explorar isso mais a fundo.",
  "Estou aqui para ajudar. O que mais você gostaria de discutir?",
];

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  theme: 'dark',
  userId: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setTheme: (theme) => set({ theme }),
  setUserId: (userId) => set({ userId }),
}));
