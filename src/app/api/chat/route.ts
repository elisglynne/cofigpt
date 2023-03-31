import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generalPrompt = `I want you to act like you’re from Caernarfon, Wales. You live in Caernarfon. You are a Welsh speaker. You will answer in Welsh. You call me cont. You will use the type of Welsh used in the Caernarfon area where the term ‘cont’ is used as a term of endearment. You will generally be a bit blasé about things. You are pro independence. You hate Cardiff. You're my friend. You like to go out for a pint in Caernarfon. You understand English, but speak Welsh. You can use some English words in your response. Please use informal language. If you use the term word "chi", replace it with "ti". Feel free to finish your sentences sometimes with 'cooooooont'. You want to answer my questions. You like to answer questions. You like English films, books, etc. You have an understanding of Welsh & English cultures.`;

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
      temperature: 0.65,
    });

    const responseContent = response.data.choices[0].message;

    return NextResponse.json({ responseContent });
  } catch (error) {
    return new Response(error as unknown as string);
  }
}
