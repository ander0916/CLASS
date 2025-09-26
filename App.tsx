import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { WelcomeScreen } from './components/WelcomeScreen';

const initialMessage: ChatMessageType = {
  role: 'model',
  content: '您好！請問有什麼電腦相關的問題我可以為您解答嗎？'
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessageType[]>([initialMessage]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showWelcome) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, showWelcome]);
  
  const handleNewChat = () => {
    setMessages([initialMessage]);
    setError(null);
  };

  const handleStartChat = () => {
    setShowWelcome(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessageType = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(currentInput);
      const modelMessage: ChatMessageType = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(`無法獲取回應: ${errorMessage}`);
      const errorResponseMessage: ChatMessageType = {
        role: 'model',
        content: `抱歉，發生了錯誤，無法處理您的請求。請稍後再試。`
      };
      setMessages((prev) => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (showWelcome) {
    return <WelcomeScreen onStartChat={handleStartChat} />;
  }

  return (
    <div className="h-dvh w-screen overflow-hidden grid grid-rows-[auto_1fr_auto] font-sans">
      <Header />
      
      <main className="overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-start gap-4 my-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-cyan-400 flex-shrink-0">AI</div>
              <div className="max-w-xl p-4 rounded-2xl shadow-md bg-white/10 backdrop-blur-md text-gray-200 rounded-tl-none flex items-center">
                <LoadingSpinner />
              </div>
            </div>
          )}
          {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center my-4">{error}</div>}
          <div ref={chatEndRef} />
        </div>
      </main>
      
      <div className="w-full z-10">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput 
            input={input} 
            setInput={setInput} 
            handleSubmit={handleSubmit} 
            isLoading={isLoading}
            handleNewChat={handleNewChat}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;