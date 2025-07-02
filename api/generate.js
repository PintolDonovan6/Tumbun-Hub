import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Give a creative social media post idea about PNG culture, youth or tradition.',
        },
      ],
    });

    const suggestion = completion.data.choices[0].message.content;
    res.status(200).json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch AI suggestion' });
  }
}
