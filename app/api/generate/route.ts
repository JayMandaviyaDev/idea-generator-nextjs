import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// This function will handle any POST requests that are sent to /api/generate
export async function POST(request: Request) {
  const { topic } = await request.json();
  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required." },
      { status: 400 }
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      You are an expert brainstorming assistant. Your goal is to generate creative and actionable ideas.
      Generate 5 unique ideas for the following topic: "${topic}"
      Format your response as a numbered list. For each idea, provide a one-sentence description.
      Example:
      Input : genai project ideas
      Output : 
      1. Idea Name 1\n
      Idea point 1\n
      Idea point 2\n\n
      2. Idea Name 2\n
      Idea point 1\n
      Idea point 2\n
      [Example End]
      As per above example give responce in points, not the whole paragraph
      This is the sample response
      '''
      "1. **\"The Accidental Expert\"**: \n Interviews individuals who unexpectedly became highly skilled in a niche area, exploring their unconventional paths to mastery and offering relatable lessons on skill development.\n\n\n2. **\"Future Forward Folklore\"**:  \nReimagines classic folklore and mythology within futuristic settings, blending storytelling with speculative fiction and societal commentary.\n\n\n3. **\"The Sensory Symphony\"**: \nA fully immersive soundscape podcast using binaural audio and ambient sounds to create unique auditory experiences themed around different emotions, locations, or historical events.\n\n\n4. **\"Deconstructing Decades\"**:  \nEach episode analyzes a specific decade through the lens of popular culture, examining its trends, social anxieties, and enduring impact on the present.\n\n\n5. **\"The Curiosity Cabinet\"**: \nA podcast dedicated to exploring bizarre, unexplained phenomena and historical oddities, blending investigative journalism with storytelling and expert analysis.\n"
      '''
      Give response in the markdown file
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const ideas = response.text();

    return NextResponse.json({ ideas });

  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas." },
      { status: 500 }
    );
  }
}