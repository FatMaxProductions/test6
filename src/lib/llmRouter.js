import axios from 'axios';

export async function routeToLLM(llm, prompt) {
  if (llm === 'ChatGPT') {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [{ role: 'system', content: prompt }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    return response.data.choices[0].message.content.trim();
  }

  if (llm === 'Gemini') {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
      { headers: { 'x-goog-api-key': process.env.GOOGLE_API_KEY } }
    );
    return response.data.candidates[0].content.parts[0].text.trim();
  }

  if (llm === 'Claude') {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.content[0].text.trim();
  }

  return '[Unknown LLM]';
}
