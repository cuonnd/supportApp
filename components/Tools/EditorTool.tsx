import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import { ImageResult } from '../ImageResult';
import { blobToBase64, transformImage } from '../../services/geminiService';

export const EditorTool: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Please use an image under 5MB.");
        return;
      }
      try {
        const base64 = await blobToBase64(file);
        // Add prefix if missing from blobToBase64 raw data
        setSourceImage(`data:${file.type};base64,${base64}`);
        setResultImage(null); // Clear previous result
        setError(null);
      } catch (err) {
        setError("Error reading file.");
      }
    }
  };

  const handleTransform = async () => {
    if (!sourceImage || !prompt.trim()) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Strip prefix for the API call
      const rawBase64 = sourceImage.split(',')[1];
      const mimeType = sourceImage.substring(sourceImage.indexOf(':') + 1, sourceImage.indexOf(';'));
      
      const newImage = await transformImage(rawBase64, prompt, mimeType);
      setResultImage(newImage);
    } catch (err) {
      setError("Transformation failed. Try a different prompt or image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `wowai-edit-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-400 to-pink-400 bg-clip-text text-transparent">Smart Editor & Object Removal</h2>
        <p className="text-gray-400">Upload a photo and tell the AI what to change, remove, or transform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Source Column */}
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-2xl min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-white mb-4">1. Upload Image</h3>
            
            {!sourceImage ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-800/30 transition-all p-8"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-gray-300 font-medium">Click to upload</p>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 5MB</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden flex-1 bg-black/40 flex items-center justify-center">
                 <img src={sourceImage} alt="Source" className="max-h-[300px] w-auto object-contain" />
                 <button 
                   onClick={() => setSourceImage(null)}
                   className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white hover:bg-red-500 transition-colors"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                 </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        </div>

        {/* Action & Result Column */}
        <div className="space-y-4">
           {/* Prompt Input */}
           <div className="glass-panel p-6 rounded-2xl">
             <h3 className="text-lg font-semibold text-white mb-2">2. Describe Changes</h3>
             <textarea
               className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none resize-none h-24 mb-4"
               placeholder="Example: Remove the person on the left, Make the sky starry, Turn the cat into a tiger..."
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
             />
             <Button 
               className="w-full" 
               onClick={handleTransform} 
               disabled={!sourceImage || !prompt}
               isLoading={isProcessing}
               variant="primary"
             >
               {isProcessing ? 'Transforming...' : 'Apply Magic Edit'}
             </Button>
             {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}
           </div>

           {/* Result Display */}
           {resultImage && (
             <div className="animate-fade-in">
               <h3 className="text-lg font-semibold text-white mb-2">3. Result</h3>
               <ImageResult 
                 imageUrl={resultImage} 
                 onDownload={handleDownload}
               />
             </div>
           )}
        </div>
      </div>
    </div>
  );
};