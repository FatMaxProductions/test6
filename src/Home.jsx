
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 px-4">
      <div className="bg-white shadow rounded-lg p-10 w-full max-w-xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to Persona Builder</h1>
        <p className="text-gray-600">What would you like to do?</p>
        <div className="space-y-4">
          <Link to="/create-persona" className="block bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700">
            Create Persona
          </Link>
          <Link to="/create-environment" className="block bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700">
            Create Environment
          </Link>
          <Link to="/environments" className="block text-blue-600 underline text-sm">
            View Environments
          </Link>
        </div>
      </div>
    </div>
  );
}
