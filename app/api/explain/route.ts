import { ExplainRequest } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
if(!apiKey){
    throw new Error('GEMINI API KEY NOT SET IN THE ENVIRONMEMT VARIABLES')
}

const genAI=new GoogleGenerativeAI(apiKey)

export const POST=async(req:NextRequest)=>{
    try{
        const {code}:ExplainRequest=await req.json()
        if (!code){
            return NextResponse.json({error:"Code is Required"},{status:400})
        }
        const model=genAI.getGenerativeModel({model:"gemini-2.5-flash"})
        const prompt=`Please Explain the Fallowing Code in Detail : \n\n${code}\n\nExplanation:`
        const result=await model.generateContent(prompt)
        const response=await result.response;
        const explanation=response.text();
        return NextResponse.json({ data: { explanation }},{status:200});


    }catch(error){
        console.error(error)
        return NextResponse.json({error:"Failed to generate Explanation"},{status:500})

    }

}