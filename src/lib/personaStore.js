const environments = [];
const personas = [];

export function getAllEnvironments() {
  return environments;
}

export function getEnvironmentById(id) {
  return environments.find((env) => env.id === id);
}

export function addEnvironment(env) {
  environments.push(env);
}

export function getPersonasByEnvId(envId) {
  return personas.filter((p) => p.environmentId === envId);
}

export function addPersona(persona) {
  personas.push(persona);
}
