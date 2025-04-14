import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Chat } from './Chat'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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

  it('Should send message when the button is clicked', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const button = screen.getByText('Enviar');

    fireEvent.change(input, { target: { value: 'Olá' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByText('Olá')[0]).toBeInTheDocument();
    });
  });

  it('Should send message when Enter is pressed', async () => {
    render(<Chat />);
    const input = screen.getByPlaceholderText('Digite sua mensagem...');

    fireEvent.change(input, { target: { value: 'Olá' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getAllByText('Olá')[0]).toBeInTheDocument();
    });
  });

  it('Should toggle between light and dark themes', () => {
    render(<Chat />);
    const themeToggle = screen.getByRole('button', { name: '☀️' });

    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveTextContent('🌙');

    fireEvent.click(themeToggle);
    expect(themeToggle).toHaveTextContent('☀️');
  });

  it('Should load saved messages from localStorage', () => {
    const savedMessages = [
      {
        id: '1',
        text: 'Saved message',
        sender: 'user',
        timestamp: new Date().toISOString()
      }
    ];
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedMessages));

    render(<Chat />);
    expect(screen.getByText('Saved message')).toBeInTheDocument();
  });

}); 