import styles from './Chat.module.css';

interface ChatInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const ChatInput = ({ inputMessage, onInputChange, onSendMessage }: ChatInputProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={onSendMessage}>Enviar</button>
    </div>
  );
}; 