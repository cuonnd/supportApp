import React from 'react';

interface ImageResultProps {
  imageUrl: string;
  prompt?: string;
  onDownload: () => void;
  onClose?: () => void;
}

export const ImageResult: React.FC<ImageResultProps> = ({ imageUrl, prompt, onDownload, onClose }) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden glass-panel border border-gray-700 shadow-2xl animate-fade-in">
      <div className="relative group">
        <img 
          src={imageUrl} 
          alt={prompt || "Generated content"} 
          className="w-full h-auto object-cover max-h-[600px] bg-black/50"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button 
            onClick={onDownload}
            className="p-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            title="Download"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-3 bg-gray-800 text-white border border-gray-600 rounded-full hover:bg-gray-700 transition-colors"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {prompt && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Prompt</p>
          <p className="text-gray-300 text-sm line-clamp-2">{prompt}</p>
        </div>
      )}
    </div>
  );
};