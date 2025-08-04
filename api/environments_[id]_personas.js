import { getPersonasByEnvId } from '../../../../src/lib/personaStore';

export default function handler(req, res) {
  const {
    query: { id }
  } = req;

  const personas = getPersonasByEnvId(id);
  res.status(200).json(personas);
}
