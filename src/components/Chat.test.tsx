import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Chat } from './Chat'

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock do CSS Modules
jest.mock('./Chat.module.css', () => ({
  chatContainer: 'chatContainer',
  light: 'light',
  dark: 'dark',
  chatHeader: 'chatHeader',
  themeToggle: 'themeToggle',
  messagesContainer: 'messagesContainer',
  message: 'message',
  user: 'user',
  bot: 'bot',
  messageContent: 'messageContent',
  messageTimestamp: 'messageTimestamp',
  inputContainer: 'inputContainer',
}));

describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renderiza corretamente', () => {
    render(<Chat />);
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('envia mensagem quando o botão é clicado', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const button = screen.getByText('Enviar');

    fireEvent.change(input, { target: { value: 'Olá' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText('Olá')[0]).toBeInTheDocument();
    });
  });

  it('envia mensagem quando Enter é pressionado', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');

    fireEvent.change(input, { target: { value: 'Olá' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getAllByText('Olá')[0]).toBeInTheDocument();
    });
  });

  it('alterna entre temas claro e escuro', () => {
    render(<Chat />);
    const themeToggle = screen.getByRole('button', { name: '🌙' });

    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveTextContent('☀️');

    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveTextContent('🌙');
  });

  it('carrega mensagens salvas do localStorage', () => {
    const savedMessages = [
      {
        id: '1',
        text: 'Mensagem salva',
        sender: 'user',
        timestamp: new Date().toISOString()
      }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedMessages));

    render(<Chat />);
    expect(screen.getByText('Mensagem salva')).toBeInTheDocument();
  });
}); 