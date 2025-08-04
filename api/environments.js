import { getAllEnvironments } from '../../src/lib/personaStore';

export default function handler(req, res) {
  const environments = getAllEnvironments();
  res.status(200).json(environments);
}
