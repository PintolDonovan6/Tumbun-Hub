// api/generate.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in Vercel ENV vars
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates creative post ideas in simple Tok Pisin.',
        },
        {
          role: 'user',
          content: 'Give me a creative social media post idea for PNG content creators.',
        },
      ],
      max_tokens: 60,
    });

    const suggestion = completion.data.choices[0].message.content.trim();
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'I no inap kisim AI tok, tria gen.' });
  }
}
