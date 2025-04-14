import { AudioRecorder } from './AudioRecorder';
import styles from './Chat.module.css';

interface ChatInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isRecording: boolean;
  onRecordingChange: (isRecording: boolean) => void;
}

export const ChatInput = ({ 
  inputMessage, 
  onInputChange, 
  onSendMessage, 
  isRecording,
  onRecordingChange 
}: ChatInputProps) => {
  const isButtonDisabled = isRecording || !inputMessage.trim();

  return (
    <>
    <div className={styles.inputContainer}>
    <AudioRecorder 
      onTranscription={onInputChange} 
      onRecordingChange={onRecordingChange}
    />
      <input
        value={inputMessage}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !isButtonDisabled && onSendMessage()}
        placeholder="Digite sua mensagem..."
      />
      <button 
        onClick={onSendMessage}
        disabled={isButtonDisabled}
        className={isButtonDisabled ? styles.disabledButton : ''}
      >
        Enviar
      </button>
    </div>
    </>
  );
}; 