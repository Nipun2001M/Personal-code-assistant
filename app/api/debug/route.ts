import { DebugRequest, ExplainRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI API KEY NOT SET IN THE ENVIRONMEMT VARIABLES");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const POST = async (req: NextRequest) => {
  try {
    const { code, error }: DebugRequest = await req.json();
    if (!code) {
      return NextResponse.json({ error: "Code is Required" }, { status: 400 });
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    let prompt = `Please Debug the Fallowing Code : \n\n${code}\n\n`;
    if (error) {
      prompt += `The Error I am getting is :${error}\n\n`;
    }
    prompt += `Debugging Suggestion : `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const debugging = response.text();
    return NextResponse.json({ data: { debugging } }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to debugging suggestion" },
      { status: 500 }
    );
  }
};
