import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Suggest a creative social media post idea for a nonprofit organization.",
      max_tokens: 50,
    });

    const suggestion = completion.data.choices[0].text.trim();

    res.status(200).json({ suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating suggestion" });
  }
}
