import React, { useState, useMemo, useCallback } from 'react';
import {  Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { 
  FiEye, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiX, 
  FiChevronDown, 
  FiRefreshCw,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from 'react-icons/fi';
import useCandidatures from './useCandidature';
import Loader from '../../components/Loader/Loader';

// Composant Badge personnalisé pour les statuts
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'soumis': { 
      bg: 'bg-blue-50', 
      text: 'text-[#0089CF]', 
      icon: <FiClock className="mr-1" />,
      label: 'Soumis'
    },
    'en_cours': { 
      bg: 'bg-yellow-50', 
      text: 'text-yellow-800',
      icon: <FiRefreshCw className="mr-1 animate-spin" />,
      label: 'En cours de traitement'
    },
    'approuvé': { 
      bg: 'bg-green-50', 
      text: 'text-green-800',
      icon: <FiCheckCircle className="mr-1" />,
      label: 'Approuvé'
    },
    'rejeté': { 
      bg: 'bg-red-50', 
      text: 'text-red-800',
      icon: <FiXCircle className="mr-1" />,
      label: 'Rejeté'
    }
  };

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: null, label: status };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// Composant pour afficher les filtres actifs
const FiltresActifs = ({ filtres, setFiltres, setFiltresAvances, setInputRecherche }) => {
  const filtresActifs = Object.entries(filtres).filter(([, value]) => value);

  if (filtresActifs.length === 0) {
    return null;
  }

  const removeFiltre = (key) => {
    setFiltres(prev => ({ ...prev, [key]: '' }));
    if (key === 'recherche') {
      setInputRecherche('');
    } else {
      setFiltresAvances(prev => ({ ...prev, [key]: '' }));
    }
  };

  const getLabel = (key) => {
    switch (key) {
      case 'recherche': return 'Recherche';
      case 'domaine': return 'Domaine';
      case 'annee': return 'Année';
      case 'province': return 'Province';
      case 'statut': return 'Statut';
      default: return key;
    }
  }

  return (
    <div className="flex items-center flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg border">
      <span className="text-sm font-medium text-gray-700">Filtres actifs:</span>
      {filtresActifs.map(([key, value]) => (
        <span key={key} className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-[#0089CF]">
          {getLabel(key)}: {value}
          <button
            onClick={() => removeFiltre(key)}
            className="ml-2 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
          >
            <span className="sr-only">Retirer le filtre</span>
            <FiX className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  );
};

const Candidatures = () => {
  const { loading, error, customStyles, candidatureData } = useCandidatures();
  
  // États pour les filtres
  const [filtres, setFiltres] = useState({
    recherche: '',
    domaine: '',
    annee: '',
    province: '',
    statut: ''
  });
  const [filtresAvances, setFiltresAvances] = useState({
    domaine: '',
    annee: '',
    province: '',
    statut: ''
  });
  const [showFiltres, setShowFiltres] = useState(false);
  const [inputRecherche, setInputRecherche] = useState('');
  
  // Compter le nombre de filtres actifs
  const nbFiltresActifs = useMemo(() => {
    return Object.values(filtres).filter(v => v !== '').length;
  }, [filtres]);
  
  // Gestion des changements de filtres

  const appliquerRecherche = () => {
    setFiltres(prev => ({ ...prev, recherche: inputRecherche }));
  };

  const handleAdvancedFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltresAvances(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const appliquerFiltresAvances = () => {
    setFiltres(prev => ({ ...prev, ...filtresAvances }));
  };
  
  // Réinitialisation des filtres
  const reinitialiserFiltres = useCallback(() => {
    setFiltresAvances({
      domaine: '',
      annee: '',
      province: '',
      statut: ''
    });
    setFiltres(prev => ({
      ...prev,
      domaine: '',
      annee: '',
      province: '',
      statut: ''
    }));
  }, []);

  const columns = [
    {
      name: 'N° Dossier',
      selector: row => row.str_code,
      sortable: true,
      width: '120px',
      cell: row => (
        <span className="font-mono text-sm text-gray-600 pointer-events-none">{row.str_code}</span>
      )
    },
    {
      name: 'DENOMINATION',
      selector: row => row.str_designation,
      sortable: true,
      cell: row => (
        <div className="flex flex-col pointer-events-none">
          <span className="font-medium text-gray-900">{row.str_designation}</span>
          <span className="text-xs text-gray-500">{row.str_sigle}</span>
        </div>
      ),
      grow: 2
    },
    {
      name: 'ANNEE DE CREATION',
      selector: row => row.str_annee_creation,
      sortable: true,
      cell: row => (
        <span className="text-sm text-gray-600 pointer-events-none">{row.str_annee_creation}</span>
      )
    },
    {
      name: 'PROVINCE',
      selector: row => row.str_province,
      sortable: true,
      cell: row => (
        <div className="flex items-center pointer-events-none">
          
          <span className="text-sm">{row.str_province_siege_sociale || 'Non renseigné'}</span>
        </div>
      )
    },
    {
      name: 'DATE SOUMISSION',
      selector: row => row.str_date_soumission,
      sortable: true,
      cell: row => (
        <div className="text-sm text-gray-600 pointer-events-none">
          {new Date(row.createdAt).toLocaleDateString('fr-FR')}
        </div>
      ),
      width: '140px'
    },
    {
      name: 'STATUT',
      selector: row => row.str_statut,
      sortable: true,
      cell: row => <div className="pointer-events-none"><StatusBadge status={row.str_statut} /></div>,
      width: '180px'
    },
  ];

  if (loading || !candidatureData) {
    return(
      <Loader />
    )
    
  }

  return (
    <div className="p-6">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* En-tête de la page */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">Gestion des candidatures</h1>
              <div className="flex items-center space-x-3">
                <button
                  
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0089CF]"
                >
                  <FiDownload className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Exporter
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 w-full max-w-sm">
                <div className="relative w-full">
                  <label htmlFor="recherche-principale" className="sr-only">Rechercher</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="recherche"
                    id="recherche-principale"
                    value={inputRecherche}
                    onChange={(e) => setInputRecherche(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && appliquerRecherche()}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Rechercher par nom ou sigle..."
                  />
                </div>
                <button 
                  onClick={appliquerRecherche}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0089CF] hover:bg-[#0089CF] cursor-pointer focus:outline-none"
                >
                  Rechercher
                </button>
              </div>
              <button
                onClick={() => setShowFiltres(!showFiltres)}
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  nbFiltresActifs > 1 || (nbFiltresActifs === 1 && !filtres.recherche)
                    ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FiFilter className="mr-2 h-4 w-4" />
                Filtres avancés {nbFiltresActifs > 1 || (nbFiltresActifs === 1 && !filtres.recherche) ? `(${nbFiltresActifs - (filtres.recherche ? 1 : 0)})` : ''}
              </button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFiltres && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filtres avancés</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={reinitialiserFiltres}
                    className="text-sm text-[#0089CF] hover:text-blue-800"
                    disabled={!Object.values(filtres).some(Boolean)}
                  >
                    Réinitialiser
                  </button>
                  <button
                    onClick={() => setShowFiltres(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Filtre par domaine */}
                <div>
                  <label htmlFor="domaine" className="block text-sm font-medium text-gray-700 mb-1">
                    Domaine d'intervention
                  </label>
                  <div className="relative">
                    <select
                      id="domaine"
                      name="domaine"
                      value={filtresAvances.domaine}
                      onChange={handleAdvancedFiltreChange}
                      className="appearance-none block w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Tous les domaines</option>
                      {/* {domainesIntervention.map((domaine) => (
                        <option key={domaine} value={domaine}>
                          {domaine}
                        </option>
                      ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Filtre par année */}
                <div>
                  <label htmlFor="annee" className="block text-sm font-medium text-gray-700 mb-1">
                    Année de création
                  </label>
                  <div className="relative">
                    <select
                      id="annee"
                      name="annee"
                      value={filtresAvances.annee}
                      onChange={handleAdvancedFiltreChange}
                      className="appearance-none block w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Toutes les années</option>
                      {/* {anneesCreation.map((annee) => (
                        <option key={annee} value={annee}>
                          {annee}
                        </option>
                      ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Filtre par province */}
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                    Province du siège
                  </label>
                  <div className="relative">
                    <select
                      id="province"
                      name="province"
                      value={filtresAvances.province}
                      onChange={handleAdvancedFiltreChange}
                      className="appearance-none block w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Toutes les provinces</option>
                      {/* {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Filtre par statut */}
                <div>
                  <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut
                  </label>
                  <div className="relative">
                    <select
                      id="statut"
                      name="statut"
                      value={filtresAvances.statut}
                      onChange={handleAdvancedFiltreChange}
                      className="appearance-none block w-full bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Tous les statuts</option>
                      {/* {statuts.map((statut) => (
                        <option key={statut.value} value={statut.value}>
                          {statut.label}
                        </option>
                      ))} */}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-4 flex justify-end items-center pt-4">
                  <button 
                    onClick={appliquerFiltresAvances} 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0089CF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Appliquer les filtres
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Affichage des filtres actifs */}
          <FiltresActifs filtres={filtres} setFiltres={setFiltres} setFiltresAvances={setFiltresAvances} setInputRecherche={setInputRecherche} />

          {/* Tableau des candidatures */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <DataTable
              columns={columns}
              data={candidatureData}
              progressPending={loading}
              progressComponent={
                <div className="py-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Chargement des candidatures...</p>
                </div>
              }
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              noDataComponent={
                <div className="py-8 text-center text-gray-500">
                  Aucune candidature trouvée
                </div>
              }
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              onRowClicked={(row) => window.location.href = `/admin/candidatures/${row.str_id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidatures;
