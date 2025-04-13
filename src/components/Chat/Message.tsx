import { IMessage } from '../../store/IMessage';
import styles from './Chat.module.css';

interface MessageProps {
  message: IMessage;
}

export const Message = ({ message }: MessageProps) => {
  return (
    <div className={`${styles.message} ${styles[message.sender]}`}>
      <div className={styles.messageContent}>
        {message.text}
      </div>
      <div className={styles.messageTimestamp}>
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  );
}; 