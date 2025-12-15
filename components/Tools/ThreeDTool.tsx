import React, { useState } from "react";
import { Button } from "../Button";
import { ImageResult } from "../ImageResult";
import { generateImage } from "../../services/geminiService";

export const ThreeDTool: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    // Enhance prompt for 3D generation
    const enhancedPrompt = `3D Render, isometric view, high poly, unreal engine 5 render, 8k resolution, highly detailed, clean background, 3d model style: ${prompt}`;

    try {
      const base64Image = await generateImage(enhancedPrompt, "1:1");
      setResultImage(base64Image);
    } catch (err) {
      setError("Failed to generate 3D model visualization.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = `WowArt Ai-3d-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          3D Model Creator
        </h2>
        <p className="text-gray-400">
          Generate high-quality 3D rendered assets from text prompts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="glass-panel p-6 rounded-2xl">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe your 3D Object
          </label>
          <textarea
            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none h-32"
            placeholder="A cute robot toy, matte plastic finish..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-4 p-3 bg-emerald-900/20 border border-emerald-900/50 rounded-lg">
            <p className="text-xs text-emerald-300 flex items-center">
              <span className="mr-2">💡</span>
              Auto-enhanced for: Isometric view, High Poly, Clean Lighting.
            </p>
          </div>
          <Button
            className="w-full mt-6"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!prompt}
          >
            {isGenerating ? "Rendering..." : "Generate 3D Asset"}
          </Button>
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>

        <div className="flex items-center justify-center">
          {resultImage ? (
            <div className="w-full">
              <ImageResult
                imageUrl={resultImage}
                prompt={prompt}
                onDownload={handleDownload}
              />
            </div>
          ) : (
            <div className="w-full aspect-square glass-panel border border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 mb-4 opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              <p>3D Preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
