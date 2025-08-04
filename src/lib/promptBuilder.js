export function buildPrompt(persona, history) {
  const traits = Object.entries(persona.traits || {})
    .map(([category, values]) => `${category}: ${values.join(', ')}`)
    .join('\n');

  const knowledge = persona.knowledge || '';
  const role = persona.role || 'A helpful assistant';

  const previousMessages = history.map(m => `${m.sender}: ${m.text}`).join('\n');

  return `
You are ${persona.name}, ${role}.
Your behavioral traits are:
${traits}

Context/Knowledge:
${knowledge}

Conversation so far:
${previousMessages}

Continue the conversation with a relevant and realistic reply.
  `.trim();
}
