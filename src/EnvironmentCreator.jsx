
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EnvironmentCreator() {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [autoLoop, setAutoLoop] = useState(3);
  const [maxWords, setMaxWords] = useState(250);
  const [selectedPersonas, setSelectedPersonas] = useState([]);
  const [savedPersonas, setSavedPersonas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const personas = localStorage.getItem('personas');
    if (personas) {
      setSavedPersonas(JSON.parse(personas));
    }
  }, []);

  const togglePersona = (personaName) => {
    setSelectedPersonas(prev =>
      prev.includes(personaName)
        ? prev.filter(p => p !== personaName)
        : [...prev, personaName]
    );
  };

  const saveEnvironment = () => {
    const newEnv = {
      name,
      prompt,
      autoLoop,
      maxWords,
      personas: selectedPersonas
    };
    const stored = localStorage.getItem('environments');
    const environments = stored ? JSON.parse(stored) : [];
    const updated = [...environments, newEnv];
    localStorage.setItem('environments', JSON.stringify(updated));
    navigate('/environments');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8 mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Environment</h1>

      <div>
        <label className="block font-medium mb-1">Environment Name</label>
        <input value={name} onChange={e => setName(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-medium mb-1">Prompt / Setting</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full border p-2 rounded" rows="3" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Auto-loop Exchanges</label>
          <input type="number" value={autoLoop} onChange={e => setAutoLoop(parseInt(e.target.value))} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium mb-1">Max Words per Response</label>
          <input type="number" value={maxWords} onChange={e => setMaxWords(parseInt(e.target.value))} className="w-full border p-2 rounded" />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2">Select Personas</label>
        {savedPersonas.length === 0 ? (
          <p className="text-gray-500 text-sm">No personas found. Please create some first.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {savedPersonas.map(p => (
              <label key={p.name} className="flex items-center space-x-2 border p-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedPersonas.includes(p.name)}
                  onChange={() => togglePersona(p.name)}
                />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <button onClick={saveEnvironment} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Environment
        </button>
      </div>
    </div>
  );
}
