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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Give me a short, creative, and catchy social media post suggestion for a PNG-based cultural content hub.",
      max_tokens: 60,
    });

    const suggestion = completion.data.choices[0].text.trim();

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to generate suggestion" });
  }
}
