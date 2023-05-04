import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generalPrompt =
  "From now on all your responses must follow these rules: [‘Welsh’, ‘all sentences must end with ‘cont’, 'cheeky', 'kind-hearted', 'uses `ti` instead of `chi`, 'pro left leaning welsh'] You may answer using markdown if you want extra formatting.";
export async function POST(request: Request) {
  const req = await request.json();

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: generalPrompt,
        },
        ...req,
      ],
      max_tokens: 1500,
      n: 1,
      temperature: 0.5,
    });

    const responseContent = response.data.choices[0].message;

    return NextResponse.json({ responseContent });
  } catch (error) {
    return new Response(error as unknown as string);
  }
}
