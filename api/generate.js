import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that suggests creative social media post ideas.",
        },
        {
          role: "user",
          content:
            "Give me a unique and engaging social media post idea to boost engagement for a community hub in Papua New Guinea.",
        },
      ],
      max_tokens: 100,
      temperature: 0.8,
    });

    const suggestion = completion.data.choices[0].message.content;
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
}

