import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnvironmentSimulation = () => {
  const [environments, setEnvironments] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    fetchEnvironments();
  }, []);

  const fetchEnvironments = async () => {
    try {
      const res = await axios.get('/api/environments');
      setEnvironments(res.data);
    } catch (err) {
      console.error('Error fetching environments:', err);
    }
  };

  const fetchPersonas = async (envId) => {
    try {
      const res = await axios.get(`/api/environments/${envId}/personas`);
      setPersonas(res.data);
    } catch (err) {
      console.error('Error fetching personas:', err);
    }
  };

  const startSimulation = async () => {
    if (!selectedEnv) return;
    setIsSimulating(true);
    setMessages([]);
    try {
      const res = await axios.post('/api/simulateConversation', {
        environmentId: selectedEnv,
        mode: 'auto',
        turns: 5
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Simulation failed:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Environment Simulation</h1>

      <select
        className="border p-2 mb-4"
        onChange={(e) => {
          setSelectedEnv(e.target.value);
          fetchPersonas(e.target.value);
        }}
      >
        <option value="">Select an environment</option>
        {environments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.name}
          </option>
        ))}
      </select>

      {personas.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Personas in this Environment:</h2>
          <ul className="list-disc ml-6">
            {personas.map((p) => (
              <li key={p.id}>
                {p.name} ({p.llm})
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        onClick={startSimulation}
        disabled={isSimulating || !selectedEnv}
      >
        {isSimulating ? 'Simulating...' : 'Run Auto Simulation'}
      </button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Conversation Log:</h2>
        <div className="border p-4 max-h-96 overflow-y-auto bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-4">
              <strong>{msg.sender}:</strong>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSimulation;
