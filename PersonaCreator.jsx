import React, { useState } from 'react';

const PersonaCreator = ({ onCreate }) => {
  const [persona, setPersona] = useState({
    name: '',
    role: '',
    llm: 'ChatGPT',
    traits: {},
    knowledge: ''
  });

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onCreate) onCreate(persona);
    alert('Persona created (not saved yet — backend required).');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Persona</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input type="text" name="name" value={persona.name} onChange={handleChange}
            className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Role/Function</label>
          <input type="text" name="role" value={persona.role} onChange={handleChange}
            className="border p-2 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Select LLM</label>
          <select name="llm" value={persona.llm} onChange={handleChange}
            className="border p-2 w-full">
            <option value="ChatGPT">ChatGPT (OpenAI)</option>
            <option value="Gemini">Gemini (Google)</option>
            <option value="Claude">Claude (Anthropic)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Knowledge / Backstory</label>
          <textarea name="knowledge" value={persona.knowledge} onChange={handleChange}
            className="border p-2 w-full" rows="4" placeholder="Paste knowledge here..." />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Persona
        </button>
      </form>
    </div>
  );
};

export default PersonaCreator;
