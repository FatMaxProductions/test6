import { routeToLLM } from '../../src/lib/llmRouter';
import { getEnvironmentById, getPersonasByEnvId } from '../../src/lib/personaStore';
import { buildPrompt } from '../../src/lib/promptBuilder';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { environmentId, mode = 'auto', turns = 5 } = req.body;
  const environment = getEnvironmentById(environmentId);
  if (!environment) return res.status(404).json({ error: 'Environment not found' });

  const personas = getPersonasByEnvId(environmentId);
  const messages = [];

  for (let i = 0; i < turns; i++) {
    const persona = personas[i % personas.length];
    const prompt = buildPrompt(persona, messages);

    const reply = await routeToLLM(persona.llm, prompt);
    messages.push({ sender: persona.name, text: reply });
  }

  res.status(200).json(messages);
}
