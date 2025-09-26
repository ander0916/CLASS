import React from 'react';
import { ChatIcon } from './icons/ChatIcon';

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartChat }) => {
  return (
    <div className="h-dvh w-screen flex items-center justify-center p-4">
      <div className="text-center bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-wide">
          電腦 AI 助理
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          您好！準備好解決任何電腦問題了嗎？
        </p>
        <button
          onClick={onStartChat}
          className="bg-cyan-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black/50 flex items-center justify-center gap-2 mx-auto"
        >
          <ChatIcon className="w-6 h-6" />
          <span>開始對話</span>
        </button>
      </div>
    </div>
  );
};