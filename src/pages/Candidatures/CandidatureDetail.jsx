import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser } from 'react-icons/fi';
import useCandidatures from './useCandidature';

const CandidatureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidatureById } = useCandidatures();
  const candidature = getCandidatureById(id);

  if (!candidature) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucune candidature trouvée avec l'identifiant : {id}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => navigate('/admin/candidatures')}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const statusClasses = {
      'Approuvé': 'bg-green-100 text-green-800',
      'Rejeté': 'bg-red-100 text-red-800',
      'En attente': 'bg-yellow-100 text-yellow-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    
    const statusClass = statusClasses[status] || statusClasses['default'];
    
    return (
      <span className={`${baseClasses} ${statusClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/admin/candidatures')}
          className="flex items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Retour à la liste
        </button>
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Détails de la candidature</h1>
          <div>
            {getStatusBadge(candidature.str_statut)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h2>
            <dl className="space-y-4">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{candidature.str_id}</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Nom de l'organisation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 font-medium">{candidature.str_nom}</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Sigle</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{candidature.str_sigle}</dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 flex items-center">
                  <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                  {candidature.str_annee_creation}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Domaine d'intervention</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{candidature.str_domaine_intervention}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Coordonnées</h2>
            <dl className="space-y-4">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 flex items-start">
                  <FiMapPin className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  {candidature.str_adresse_siege_sociale}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 flex items-center">
                  <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                  {candidature.str_telephone}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-blue-600 sm:col-span-2 flex items-center">
                  <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                  <a href={`mailto:${candidature.str_email}`} className="hover:underline">
                    {candidature.str_email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Représentant légal</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{candidature.str_representant_legal}</h3>
                <p className="text-sm text-gray-500">Représentant légal</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-3">
              <button 
                className={`w-full px-4 py-2 mb-2 rounded-md text-white font-medium ${candidature.str_statut === 'Approuvé' ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                disabled={candidature.str_statut === 'Approuvé'}
              >
                Approuver la candidature
              </button>
              <button 
                className={`w-full px-4 py-2 mb-2 rounded-md text-white font-medium ${candidature.str_statut === 'Rejeté' ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={candidature.str_statut === 'Rejeté'}
              >
                Rejeter la candidature
              </button>
              <button className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium">
                Télécharger le dossier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatureDetail;
