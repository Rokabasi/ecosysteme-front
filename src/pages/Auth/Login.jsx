import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogIn, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import Logo from '../../assets/fonarev-logo.webp';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de la connexion
    console.log('Tentative de connexion avec:', { email, rememberMe });
    
    // Ici, vous feriez normalement un appel API pour vérifier les identifiants
    // Pour l'instant, on simule une connexion réussie
    if (email && password) {
      // Sauvegarder dans le localStorage si "Se souvenir de moi" est coché
      if (rememberMe) {
        localStorage.setItem('userEmail', email);
      }
      
      // Appeler la fonction de connexion passée en prop
      if (onLogin) onLogin();
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Partie gauche - Formulaire de connexion */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img 
              src={Logo} 
              alt="FONAREV" 
              className="mx-auto h-16 w-auto mb-6"
            />
            <h2 className="mt-6 text-3xl font-semibold">
              Bienvenue sur Ecosystème
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous pour accéder à votre espace personnel
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Adresse email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6a1754] focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLogIn className="h-5 w-5" />
                </span>
                Se connecter
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Partie droite - Image de fond */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0089CF] p-12">
        <div className="max-w-lg mx-auto flex flex-col justify-center h-full text-white">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Bienvenue sur Ecosystème</h2>
            <p className="text-lg text-blue-100 leading-relaxed">
              La plateforme pour établir le contact avec les ONG et ASBL et gérer le processus de
                recrutement de ces dernières. 
            </p>
          </div>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#3f98c4] rounded-full p-1">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3  text-blue-100">Traitement sécurisé des dossiers de candidature des ONG et ASBL</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#3f98c4] rounded-full p-2 mr-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Sécurité optimale</h3>
                <p className="text-blue-100 text-sm">Les données sont protégées et sécurisées</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-[#3f98c4] rounded-full p-2 mr-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Performance</h3>
                <p className="text-blue-100 text-sm">Une expérience utilisateur fluide et réactive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
