import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert Blob to Base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Generates an image using Imagen 3 models.
 */
export const generateImage = async (prompt: string, aspectRatio: string = "1:1"): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    const base64EncodeString = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64EncodeString) {
      throw new Error("No image generated");
    }
    return `data:image/jpeg;base64,${base64EncodeString}`;
  } catch (error) {
    console.error("Image generation failed:", error);
    throw error;
  }
};

/**
 * Edits/Transforms an image using Gemini Multimodal capabilities.
 * Since specific 'edit' endpoints vary, we use the multimodal generation capabilities
 * of gemini-2.5-flash-image to take an image + prompt and output a new image.
 */
export const transformImage = async (base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string> => {
  try {
    // We frame the prompt to ensure the model understands it should return an image.
    const enhancedPrompt = `
      Task: Edit or transform the provided image based on this instruction: "${prompt}".
      Return ONLY the modified image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: enhancedPrompt,
          },
        ],
      },
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("The model did not return an image. Please try a different prompt.");

  } catch (error) {
    console.error("Image transformation failed:", error);
    throw error;
  }
};