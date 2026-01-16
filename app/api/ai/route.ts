import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { weather, aqi } = await req.json();

  const prompt = `
Weather: ${weather}
AQI: ${aqi}

Give:
- Health advice
- Clothing suggestion
- Outdoor activity advice
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return Response.json({
    insight: res.choices[0].message.content,
  });
}
