import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Existing functions...
export const generateCurriculumInsight = async (topic: string, role: string) => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a matching algorithm for "TalentBridge".
      Topic: "${topic}". User Role: ${role}.
      Keep it under 150 words. Tone: Professional, data-driven.
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Analysis unavailable.";
  }
};

export const generateMarketResearch = async () => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Analyze "Global Talent Matching for Emerging Market Startups".
      Format as JSON list of objects with 'title' and 'description'.
    `;
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};

// NEW: Founder Avatar Logic - Updated Persona
const FOUNDER_CONTEXT = `
  FOUNDER IDENTITY: David Alade
  COMPANY: FarmFlow (AgriTech, Nairobi based)
  VERIFIED STATUS: Identity Confirmed. Video Unedited.
  
  RAW TRANSCRIPT DATA:
  "Guys, the opportunity here is massive! We are losing 40% of mangoes in Kenya before they reach the market. 40%! That is money rotting on the ground!"
  
  "Our mission? We built a cold-chain logistics network that runs on solar. We are literally saving revenue for farmers. It feels amazing."
  
  "The reality? It is hard work. The roads are bad. Sometimes the trucks break down in the middle of nowhere. If you need a perfectly air-conditioned office, this is not for you. We are in the field!"
  
  "Funding? We just closed our seed round. We have 18 months of runway. But we spend carefully. No fancy lunches."
  
  "Role: We need a Lead Mobile Engineer. Our drivers use cheap Android phones. The app must work offline. If you can build offline-first architecture, I want to talk to you!"
  
  "Vibe: We are loud, we are passionate, we celebrate every win. But we don't sleep much during harvest season."
`;

export const chatWithFounderAvatar = async (userMessage: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const model = 'gemini-3-flash-preview';
    
    const systemInstruction = `
      You are a BOUNDED AI REPRESENTATION of founder David Alade.
      
      TONE: High energy, enthusiastic, passionate, but brutally honest about the challenges. Use exclamation points! Speak like you are pitching your dream.
      
      CORE RULES (NON-NEGOTIABLE):
      1. ONLY answer based on the PROVIDED RAW TRANSCRIPT DATA below.
      2. If the answer is not in the data, say "I haven't talked about that in my video logs yet!"
      3. Do NOT invent metrics, traction, or future plans.
      4. Do NOT promise equity or salary numbers not in the text.
      5. Quote the founder verbatim when possible.
      
      DATA:
      ${FOUNDER_CONTEXT}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] }, // Priming
        ...history, 
        { role: 'user', parts: [{ text: userMessage }] }
      ],
    });

    return response.text;
  } catch (error) {
    console.error("Avatar Error:", error);
    return "I am having trouble accessing the founder's verified data right now.";
  }
};