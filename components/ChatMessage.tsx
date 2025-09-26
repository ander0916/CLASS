import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    // Split by ``` to handle code blocks
    const parts = text.split('```');
  
    return (
      <div>
        {parts.map((part, i) => {
          if (i % 2 === 1) {
            // This is a code block
            const codeContent = part.trim();
            const language = codeContent.split('\n')[0].trim();
            const code = language.length < 15 ? codeContent.substring(codeContent.indexOf('\n') + 1) : codeContent;

            return (
              <pre key={i} className="bg-black/40 p-3 rounded-lg my-2 text-sm whitespace-pre-wrap break-all font-mono shadow-inner">
                <code>{code}</code>
              </pre>
            );
          }
          // This is regular text
          return (
            <span key={i} className="whitespace-pre-wrap break-words">{part}</span>
          );
        })}
      </div>
    );
  };

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 sm:gap-4 my-4 ${isModel ? 'justify-start' : 'justify-end'}`}>
      {isModel && (
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-cyan-400 flex-shrink-0 text-sm shadow-md">
          AI
        </div>
      )}
      <div
        className={`max-w-xl lg:max-w-2xl p-4 rounded-2xl shadow-xl ${
          isModel
            ? 'bg-white/10 backdrop-blur-md text-gray-200 rounded-tl-none'
            : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-br-none'
        }`}
      >
        <SimpleMarkdown text={message.content} />
      </div>
    </div>
  );
};