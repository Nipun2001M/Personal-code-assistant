import { ExplainRequest, GenerateRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI API KEY NOT SET IN THE ENVIRONMEMT VARIABLES");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async (req: NextRequest) => {
  try {
    const { description,language }: GenerateRequest = await req.json();
    if (!description) {
      return NextResponse.json({ error: "Description is Required" }, { status: 400 });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const prompt = `Generate ONLY ${
  language || "JavaScript"
} code for the following description without any explanation or comments: 
${description}

Provide only the code.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedCode = response.text();
    return NextResponse.json({ data: { generatedCode } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate code !" },
      { status: 500 }
    );
  }
};
