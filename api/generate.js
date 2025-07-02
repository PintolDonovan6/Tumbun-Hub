// File: /api/generate.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY // Must be set in Vercel environment
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content:
              'Suggest a short, engaging social media post idea that highlights PNG culture, tradition, or community life for Tumbuna Hub.'
          }
        ]
      });

      const suggestion = completion.choices[0].message.content;
      res.status(200).json({ suggestion });
    } catch (err) {
      console.error('OpenAI error:', err);
      res.status(500).json({ error: 'AI generation failed.', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
