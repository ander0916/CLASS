import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 flex justify-center items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-white/80 tracking-wider">
        電腦 AI 助理
      </h1>
    </header>
  );
};