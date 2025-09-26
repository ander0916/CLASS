import React from 'react';
import { SendIcon } from './icons/SendIcon';
import { RefreshIcon } from './icons/RefreshIcon';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  handleNewChat: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSubmit, isLoading, handleNewChat }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };
    
  return (
    <div className="bg-gray-900/50 backdrop-blur-xl p-2 sm:p-3 border border-white/10 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleNewChat}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-200 flex-shrink-0"
          aria-label="New chat"
        >
          <RefreshIcon className="w-6 h-6" />
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="在這裡輸入您關於電腦的問題..."
          rows={1}
          className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none p-2 max-h-40 text-base"
          disabled={isLoading}
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-cyan-500 text-white p-3 rounded-xl disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 flex-shrink-0"
          aria-label="Send message"
        >
          {isLoading ? (
             <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-6 h-6" />
          )}
        </button>
      </form>
    </div>
  );
};