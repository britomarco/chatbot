import { useState, useRef } from 'react';
import styles from './Chat.module.css';

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
  onRecordingChange: (isRecording: boolean) => void;
}

export const AudioRecorder = ({ onTranscription, onRecordingChange }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onstart = () => {
      setIsRecording(true);
      onRecordingChange(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

      onTranscription(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error('Erro no reconhecimento de voz:', event.error);
      setIsRecording(false);
      onRecordingChange(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      onRecordingChange(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      onRecordingChange(false);
    }
  };

  return (
    <button
      className={`${styles.audioButton} ${isRecording ? styles.recording : ''}`}
      onClick={isRecording ? stopRecording : startRecording}
      title={isRecording ? 'Parar gravação' : 'Iniciar gravação'}
    >
      {isRecording ? '🔴' : '🎤'}
    </button>
  );
}; 