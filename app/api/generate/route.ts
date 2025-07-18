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

  // Validate topic length
  if (topic.length > 200) {
    return NextResponse.json(
      { error: "Topic is too long. Please keep it under 200 characters." },
      { status: 400 }
    );
  }

  try {
    // Check if API key exists
    if (!process.env.GOOGLE_API_KEY) {
      console.error("Google API key is not configured");
      return NextResponse.json(
        { error: "Service configuration error." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const prompt = `You are a creative brainstorming assistant specializing in generating innovative, actionable ideas. Your task is to provide exactly 5 unique, well-structured ideas for the given topic.

TOPIC: "${topic}"

FORMATTING REQUIREMENTS:
- Use numbered list format (1., 2., 3., etc.)
- Each idea must have a bold title followed by bullet points
- Provide 2-3 bullet points per idea explaining key aspects
- Use markdown formatting
- Keep each bullet point concise (1-2 sentences)
- Make ideas diverse and creative

EXAMPLE FORMAT:
1. **Creative Title Here**
   • Brief description of the main concept
   • Key benefit or unique aspect
   • Implementation consideration

2. **Another Creative Title**
   • Main concept explanation
   • Why this idea stands out
   • Practical application note

GUIDELINES:
- Ideas should be practical and actionable
- Avoid generic or overly broad suggestions
- Focus on innovation and creativity
- Consider different perspectives and approaches
- Make each idea distinct from the others

Generate 5 creative ideas for: "${topic}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Check if response is blocked or empty
    if (!response || !response.text()) {
      console.error("Empty or blocked response from Gemini API");
      return NextResponse.json(
        { error: "Unable to generate ideas for this topic. Please try a different topic." },
        { status: 422 }
      );
    }

    const ideas = response.text();
    
    // Basic validation of response format
    if (ideas.length < 50) {
      console.error("Response too short:", ideas);
      return NextResponse.json(
        { error: "Generated response was too short. Please try again." },
        { status: 422 }
      );
    }

    return NextResponse.json({ 
      ideas: ideas.trim(),
      timestamp: new Date().toISOString(),
      topic: topic 
    });

  } catch (error) {
    console.error("Error generating ideas:", error);

    return NextResponse.json(
      { error: "Failed to generate ideas. Please try again." },
      { status: 500 }
    );
  }
}