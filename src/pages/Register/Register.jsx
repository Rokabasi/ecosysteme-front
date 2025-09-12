import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#6a1754]">
            Enregistrement
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Remplissez le formulaire pour enregistrer votre organisation
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">
                Nom de l'organisation
              </label>
              <input
                id="org-name"
                name="orgName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0089CF] focus:border-transparent"
                placeholder="Nom de votre organisation"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0089CF] focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0089CF] focus:border-transparent"
                placeholder="+243 XX XXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type d'organisation
              </label>
              <select
                id="type"
                name="type"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0089CF] focus:border-transparent rounded-md"
              >
                <option value="">Sélectionnez un type</option>
                <option value="ong">ONG</option>
                <option value="asbl">ASBL</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5a1446] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0089CF] transition-colors duration-300"
            >
              Envoyer la demande
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
