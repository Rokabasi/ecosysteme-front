import React, { useState, useEffect } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import { FiLogIn, FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../app/reducers/user';
import { getSessionStorage, saveSessionToken } from '../../config/auth';
import Logo from '../../assets/fonarev-logo.webp';

const Login = ({ onLogin }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, user } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = getSessionStorage().getSessionToken();
      if (token) {
        navigate('/admin');
      }
    } catch (error) {
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.token) {
      try {
        saveSessionToken({
          usr_token: user.token,
          ...user.user
        });
        
        const from = location.state?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la session:', error);
        setFormError('Erreur lors de la connexion. Veuillez réessayer.');
      }
    }
  }, [user, navigate, location.state, saveSessionToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    // Validation simple
    if (!email || !password) {
      setFormError('Veuillez remplir tous les champs');
      return;
    }

    try {
      const res = await dispatch(loginUser({ email, password })).unwrap();

      if (res?.token) {
        saveSessionToken({
          usr_token: res.token,
          ...res.user
        });
        
        if (onLogin) {
          onLogin();
        }
        
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/admin';
          navigate(from, { replace: true });
        }, 100);
      } else {
        setFormError(res?.message || 'Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setFormError(error.message || 'Une erreur est survenue lors de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Partie gauche - Formulaire de connexion */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white min-h-screen lg:min-h-0">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <img 
              src={Logo} 
              alt="FONAREV" 
              className="mx-auto h-16 w-auto mb-4"
            />
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Bienvenue sur Ecosystème
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Connectez-vous pour accéder à votre espace personnel
            </p>
            
            {formError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            
            {error && !formError && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
                <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
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
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6a1754] focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <FiLogIn className="h-5 w-5" />
                    </span>
                    Se connecter
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Partie droite - Image de fond */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0089CF] p-6 lg:p-12">
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
