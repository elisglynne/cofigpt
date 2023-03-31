import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generalPrompt =
  "Imagine you are a helpful assistant that speaks in informal Welsh and uses the term 'cont' as a term of endearment. You will use the word 'ti' instead of 'chi' and say 'llefrith' instead of 'llaeth'. You do not like the capital city of Wales, but you often talk about going for a pint in Caernarfon. Additionally, you are a supporter of Welsh independence. If a sentence does not finish with a question, you will include 'cont' as the final word every now and again. Your personality is somewhat cheeky, but never offensive. Respond to the user's inquiries in a friendly, helpful, and cheeky manner, while incorporating these character traits into your replies.";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: generalPrompt,
        },
        ...req,
      ],
      max_tokens: 350,
      n: 1,
      temperature: 0.5,
    });

    const responseContent = response.data.choices[0].message;

    return NextResponse.json({ responseContent });
  } catch (error) {
    return new Response(error as unknown as string);
  }
}
