
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import PersonaCreator from './PersonaCreator';
import EnvironmentCreator from './EnvironmentCreator';
import EnvironmentList from './EnvironmentList';

function AppWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 mb-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <Link to="/" className="text-lg font-bold text-blue-700">Home</Link>
        </div>
      </nav>
      {children}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-persona" element={<PersonaCreator />} />
          <Route path="/create-environment" element={<EnvironmentCreator />} />
          <Route path="/environments" element={<EnvironmentList />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  </React.StrictMode>,
);
