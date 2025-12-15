import React, { useState } from "react";
import { Button } from "../Button";
import { ImageResult } from "../ImageResult";
import { generateImage } from "../../services/geminiService";

export const GeneratorTool: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState("1:1");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const base64Image = await generateImage(prompt, aspectRatio);
      setResultImage(base64Image);
    } catch (err) {
      setError(
        "Failed to generate image. Please try again or adjust your prompt."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement("a");
      link.href = resultImage;
      link.download = `WowArt Ai-gen-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          AI Image Generator
        </h2>
        <p className="text-gray-400">
          Turn your imagination into reality with a simple description.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prompt
            </label>
            <textarea
              className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32"
              placeholder="A futuristic city with flying cars, neon lights, cyberpunk style..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["1:1", "16:9", "3:4"].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all ${
                      aspectRatio === ratio
                        ? "bg-blue-600/20 border-blue-500 text-blue-300"
                        : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full mt-6"
              onClick={handleGenerate}
              isLoading={isGenerating}
              disabled={!prompt}
            >
              {isGenerating ? "Dreaming..." : "Generate Art"}
            </Button>
            {error && (
              <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
            )}
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-3 flex items-center justify-center">
          {resultImage ? (
            <ImageResult
              imageUrl={resultImage}
              prompt={prompt}
              onDownload={handleDownload}
              onClose={() => setResultImage(null)}
            />
          ) : (
            <div className="w-full h-[400px] glass-panel border border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-500">
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
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <p>Your creation will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
