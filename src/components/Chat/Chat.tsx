import { useState, useEffect } from 'react';
import styles from './Chat.module.css';
import { IMessage } from '../../store/IMessage';
import { botResponses, useChatStore } from '../../store/chatStore.tsx';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
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
      const parsedMessages = JSON.parse(storedMessages).map((msg: IMessage, index: number) => ({
        ...msg,
        id: `${msg.sender}_${msg.timestamp}_${index}`,
        timestamp: new Date(msg.timestamp),
      }));
      parsedMessages.forEach((msg: IMessage) => addMessage(msg));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const timestamp = Date.now();
    const userMessage: IMessage = {
      id: `user_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputMessage('');

    setTimeout(() => {
      const botMessage: IMessage = {
        id: `bot_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
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
      <ChatHeader theme={theme} onToggleTheme={toggleTheme} />
      <MessageList messages={messages} />
      <ChatInput
        inputMessage={inputMessage}
        onInputChange={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}; 