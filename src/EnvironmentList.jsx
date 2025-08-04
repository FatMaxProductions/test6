
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EnvironmentList() {
  const [environments, setEnvironments] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('environments');
    if (stored) setEnvironments(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Saved Environments</h1>
      {environments.length === 0 ? (
        <p className="text-gray-600">No environments found.</p>
      ) : (
        <ul className="space-y-3">
          {environments.map((env, i) => (
            <li key={i} className="border bg-white p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold">{env.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{env.prompt}</p>
              <p className="text-xs text-gray-500">Personas: {env.personas.join(', ') || 'None'}</p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link to="/create-environment" className="text-blue-600 underline">Create New Environment</Link>
      </div>
    </div>
  );
}
