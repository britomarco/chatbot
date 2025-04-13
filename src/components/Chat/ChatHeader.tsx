import styles from './Chat.module.css';

interface ChatHeaderProps {
  theme: string;
  onToggleTheme: () => void;
}

export const ChatHeader = ({ theme, onToggleTheme }: ChatHeaderProps) => {
  return (
    <div className={styles.chatHeader}>
      <h2>Chat</h2>
      <button onClick={onToggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}; 