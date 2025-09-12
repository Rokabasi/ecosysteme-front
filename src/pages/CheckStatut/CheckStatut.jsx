import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const CheckStatut = () => {
  const [reference, setReference] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reference.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // This is a mock status. In a real app, you would fetch this from your backend
      setStatus({
        reference: reference,
        status: 'en_attente', // 'approuve', 'en_attente', 'rejete'
        date: new Date().toLocaleDateString(),
        message: 'Votre demande est en cours de traitement.'
      });
      setIsLoading(false);
    }, 1000);
  };

  const getStatusDetails = () => {
    if (!status) return null;
    
    const statusConfig = {
      approuve: {
        icon: <FiCheckCircle className="h-8 w-8 text-green-500" />,
        color: 'bg-green-100 text-green-800',
        label: 'Approuvé',
        message: 'Votre demande a été approuvée avec succès.'
      },
      en_attente: {
        icon: <FiClock className="h-8 w-8 text-yellow-500" />,
        color: 'bg-yellow-100 text-yellow-800',
        label: 'En attente',
        message: 'Votre demande est en cours de traitement.'
      },
      rejete: {
        icon: <FiXCircle className="h-8 w-8 text-red-500" />,
        color: 'bg-red-100 text-red-800',
        label: 'Rejeté',
        message: 'Votre demande a été rejetée. Veuillez contacter le support.'
      }
    };

    const config = statusConfig[status.status] || statusConfig.en_attente;

    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {config.icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              Référence: <span className="font-bold">{status.reference}</span>
            </h3>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {config.message}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Dernière mise à jour: {status.date}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#6a1754]">
            Vérifier le statut
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Entrez votre numéro de référence pour suivre l'état de votre demande
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="reference" className="sr-only">
                Numéro de référence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="reference"
                  name="reference"
                  type="text"
                  required
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="focus:ring-[#0089CF] focus:border-[#0089CF] block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  placeholder="Entrez votre numéro de référence"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5a1446] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0089CF] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Recherche en cours...' : 'Vérifier le statut'}
            </button>
          </div>
        </form>

        {status && getStatusDetails()}

        <div className="text-center mt-4">
          <Link to="/" className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckStatut;
