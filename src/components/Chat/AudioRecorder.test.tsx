import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AudioRecorder } from './AudioRecorder';

describe('AudioRecorder Component', () => {
  const mockOnTranscription = jest.fn();
  const mockOnRecordingChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the microphone button initially', () => {
    render(
      <AudioRecorder
        onTranscription={mockOnTranscription}
        onRecordingChange={mockOnRecordingChange}
      />
    );

    const button = screen.getByTitle('Iniciar gravação');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('🎤');
  });

  it('should show alert when browser does not support speech recognition', () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    render(
      <AudioRecorder
        onTranscription={mockOnTranscription}
        onRecordingChange={mockOnRecordingChange}
      />
    );

    const button = screen.getByTitle('Iniciar gravação');
    fireEvent.click(button);

    expect(mockAlert).toHaveBeenCalledWith('Seu navegador não suporta reconhecimento de voz');
    mockAlert.mockRestore();
  });

  it('should handle recording state changes', async () => {
    const mockRecognition = {
      continuous: true,
      interimResults: true,
      lang: 'pt-BR',
      start: jest.fn(),
      stop: jest.fn(),
      onstart: jest.fn(),
      onend: jest.fn(),
      onresult: jest.fn(),
      onerror: jest.fn()
    };

    Object.defineProperty(window, 'webkitSpeechRecognition', {
      value: jest.fn(() => mockRecognition)
    });

    render(
      <AudioRecorder
        onTranscription={mockOnTranscription}
        onRecordingChange={mockOnRecordingChange}
      />
    );

    const button = screen.getByTitle('Iniciar gravação');
    fireEvent.click(button);

    mockRecognition.onstart();

    await waitFor(() => {
      expect(button).toHaveTextContent('🔴');
      expect(button).toHaveAttribute('title', 'Parar gravação');
      expect(mockOnRecordingChange).toHaveBeenCalledWith(true);
    });

    mockRecognition.onend();

    await waitFor(() => {
      expect(button).toHaveTextContent('🎤');
      expect(button).toHaveAttribute('title', 'Iniciar gravação');
      expect(mockOnRecordingChange).toHaveBeenCalledWith(false);
    });
  });

}); 