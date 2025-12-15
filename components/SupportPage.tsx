import React from "react";

const FaqItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => (
  <div className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
    <h4 className="text-white font-medium mb-2 flex items-start">
      <span className="text-blue-500 mr-2">Q:</span>
      {question}
    </h4>
    <p className="text-gray-400 text-sm leading-relaxed pl-6">{answer}</p>
  </div>
);

export const SupportPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto w-full animate-fade-in-up pb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          WowArt Ai – Support & Help Center
        </h2>
        <p className="text-gray-400">
          Support information, main feature overview, and basic usage guide for
          the WowArt Ai application.
        </p>
      </div>

      <div className="grid gap-8">
        {/* App Overview & Key Features */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">
              Overview & Key Features
            </h3>
          </div>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              WowArt Ai is an AI-powered image creation and editing app that
              helps you generate and refine visuals quickly and intuitively,
              even if you have no design experience.
            </p>
            <div>
              <p className="font-semibold text-white mb-2">Key features:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>
                  Create AI images from your text descriptions (text to image).
                </li>
                <li>
                  Automatically remove unwanted objects from photos while
                  preserving natural background context.
                </li>
                <li>Generate 3D-style visuals from images or text prompts.</li>
                <li>
                  Smart editing tools for colors, background, and fine details.
                </li>
                <li>Simple, easy-to-use interface suitable for beginners.</li>
                <li>Multi-language support for a more comfortable workflow.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Quick Start Guide</h3>
          </div>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <span className="font-semibold text-white">
                  Generate images with AI:
                </span>{" "}
                choose the Image Generator tool, enter a detailed description
                (subject, style, colors, background), then tap Generate.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Remove objects from photos:
                </span>{" "}
                upload a photo and describe the object you want to remove (for
                example: &quot;Remove the red car in the background&quot;). The
                system will automatically fill in the background.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Create 3D-style visuals:
                </span>{" "}
                choose the 3D tool, enter a text prompt or use a reference image
                to generate impressive 3D-style renders.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Advanced editing:
                </span>{" "}
                use the smart editing tools to fine-tune colors, lighting,
                background, and details to match your needs.
              </li>
            </ol>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">
              Frequently Asked Questions (FAQ)
            </h3>
          </div>
          <div className="space-y-6">
            <FaqItem
              question="What can I do with WowArt Ai?"
              answer="With WowArt Ai you can generate new images from text prompts, remove unwanted objects from photos, create 3D-style visuals, and quickly edit many aspects of your images – all in one app."
            />
            <FaqItem
              question="Do I need an internet connection?"
              answer="Yes. All AI features (image generation, object removal, 3D, etc.) require a stable internet connection to send requests to the server and return results to your device."
            />
            <FaqItem
              question="What should I do if I see errors or the results are not as expected?"
              answer="Try again with a more detailed prompt, check your internet connection, or close and reopen the app. If the issue continues, please contact the developer using the support information shown on the app’s App Store page."
            />
          </div>
        </div>

        {/* Contact */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 mb-2 text-sm">
            If you need additional help with WowArt Ai (technical issues,
            feature requests, payment problems, etc.), please contact the
            developer.
          </p>
          <p className="text-gray-500 mb-4 text-xs">
            Detailed contact information (email, website, or support form) is
            provided in the{" "}
            <span className="text-gray-300 font-medium">
              Developer Contact / Support
            </span>{" "}
            section on the app&apos;s App Store page.
          </p>
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Open this app on the App Store &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
