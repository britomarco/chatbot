import { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import { useChatStore } from '../store/chatStore';
import { IMessage } from '../store/IMessage';
import { botResponses } from '../store/chatStore';

export const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, theme, addMessage, setTheme, setUserId } = useChatStore();

  useEffect(() => {
    const storedUserId = localStorage.getItem('chatUserId');
    if (!storedUserId) {
      const newUserId = Math.random().toString(36).substring(7);
      localStorage.setItem('chatUserId', newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }

    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      const parsedMessages = JSON.parse(storedMessages).map((msg: IMessage) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      parsedMessages.forEach((msg: IMessage) => addMessage(msg));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: IMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputMessage('');

    setTimeout(() => {
      const botMessage: IMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      };
      addMessage(botMessage);
    }, 1000);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <div className={`${styles.chatContainer} ${styles[theme]}`}>
      <div className={styles.chatHeader}>
        <h2>Chat Bot</h2>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]}`}
          >
            <div className={styles.messageContent}>
              {message.text}
            </div>
            <div className={styles.messageTimestamp}>
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}; 