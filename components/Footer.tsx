import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full p-3 text-center text-gray-400/60 text-xs">
      <div className="flex justify-center items-center space-x-2">
        <span>作者: 徐安德</span>
        <span className="text-gray-500/50">|</span>
        <a href="https://www.instagram.com/hsu.x1/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200" aria-label="Instagram">
          <InstagramIcon className="w-5 h-5" />
        </a>
        <a href="https://www.youtube.com/@7xozx_09" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors duration-200" aria-label="YouTube">
          <YoutubeIcon className="w-5 h-5" />
        </a>
      </div>
    </footer>
  );
};