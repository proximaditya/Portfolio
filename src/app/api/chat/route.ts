import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { systemPrompt } from '@/lib/prompt';

// Explicitly tell the SDK where your API key is
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || '', 
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if the key is actually loaded
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing from .env.local!");
    }

    // Call the newest stable Llama 3.1 model
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      system: systemPrompt,
      messages,
    });

    return Response.json({ text });
    
  } catch (error: any) {
    // Log the exact error to your VS Code terminal
    console.error("🔥 AI API CRASH:", error.message || error);
    
    // Send the exact error to the frontend
    return new Response(
      JSON.stringify({ error: error.message || "Unknown API Error" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}