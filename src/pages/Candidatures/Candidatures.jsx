import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { 
  FiEye, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiX, 
  FiChevronDown, 
  FiChevronRight,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiXCircle
} from 'react-icons/fi';
import useCandidatures from './useCandidature';

// Composant Badge personnalisé pour les statuts
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'soumis': { 
      bg: 'bg-blue-50', 
      text: 'text-blue-800', 
      icon: <FiClock className="mr-1" />,
      label: 'En attente'
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

// Composant de chargement personnalisé
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
    ))}
  </div>
);

// Composant d'erreur personnalisé
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <FiAlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">
          {message}
        </p>
        <div className="mt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Données pour les filtres
const anneesCreation = Array.from({length: 15}, (_, i) => (2010 + i).toString());
const provinces = ['Kinshasa', 'Kongo Central', 'Kwango', 'Kwilu', 'Mai-Ndombe', 'Kasaï', 'Kasaï Central', 'Kasaï Oriental', 'Lomami', 'Sankuru', 'Maniema', 'Sud-Kivu', 'Nord-Kivu', 'Ituri', 'Haut-Uele', 'Tshopo', 'Bas-Uele', 'Nord-Ubangi', 'Mongala', 'Sud-Ubangi', 'Équateur', 'Tshuapa'];
const statuts = [
  { value: 'soumis', label: 'En attente' },
  { value: 'en_cours', label: 'En cours de traitement' },
  { value: 'approuvé', label: 'Approuvé' },
  { value: 'rejeté', label: 'Rejeté' }
];
const domainesIntervention = ['Santé', 'Éducation', 'Environnement', 'Droits humains', 'Développement rural', 'Eau et assainissement', 'Sécurité alimentaire', 'Autre'];

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
        <span key={key} className="inline-flex items-center py-1 pl-3 pr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
  const { candidatures, loading, error, customStyles, updateCandidatureStatus } = useCandidatures();
  const navigate = useNavigate();
  
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
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [inputRecherche, setInputRecherche] = useState('');
  
  // Compter le nombre de filtres actifs
  const nbFiltresActifs = useMemo(() => {
    return Object.values(filtres).filter(v => v !== '').length;
  }, [filtres]);
  
  // Gestion des changements de filtres
  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres(prev => ({ ...prev, [name]: value }));
  };

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
  
  // Mise à jour du statut d'une candidature
  const handleStatusChange = (id, newStatus) => {
    updateCandidatureStatus(id, newStatus);
  };
  
  // Filtrer les candidatures en fonction des filtres
  const candidaturesFiltrees = useMemo(() => {
    return candidatures.filter(candidature => {
      // Filtre par recherche (nom ou sigle)
      const matchesSearch = !filtres.recherche || 
        (candidature.str_nom && candidature.str_nom.toLowerCase().includes(filtres.recherche.toLowerCase())) ||
        (candidature.str_sigle && candidature.str_sigle.toLowerCase().includes(filtres.recherche.toLowerCase()));
      
      // Filtre par domaine d'intervention
      const matchesDomaine = !filtres.domaine || 
        (candidature.str_domaine_intervention && 
         candidature.str_domaine_intervention.toLowerCase().includes(filtres.domaine.toLowerCase()));
      
      // Filtre par année de création
      const matchesAnnee = !filtres.annee || 
        (candidature.str_annee_creation && candidature.str_annee_creation === filtres.annee);
      
      // Filtre par province
      const matchesProvince = !filtres.province || 
        (candidature.str_province && candidature.str_province === filtres.province);
      
      // Filtre par statut
      const matchesStatut = !filtres.statut || 
        (candidature.str_statut && candidature.str_statut.toLowerCase() === filtres.statut.toLowerCase());
      
      return matchesSearch && matchesDomaine && matchesAnnee && matchesProvince && matchesStatut;
    });
  }, [candidatures, filtres]);
  
  // Gestion de la sélection des lignes
  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);
  
  // Actions contextuelles pour les lignes sélectionnées
  const contextActions = useCallback(selectedData => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">{selectedData.selectedCount} sélectionné(s)</span>
      <button
        onClick={() => {
          selectedData.selectedRows.forEach(row => 
            updateCandidatureStatus(row.str_id, 'approuvé')
          );
          setToggleCleared(!toggleCleared);
        }}
        className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
      >
        Approuver
      </button>
      <button
        onClick={() => {
          selectedData.selectedRows.forEach(row => 
            updateCandidatureStatus(row.str_id, 'rejeté')
          );
          setToggleCleared(!toggleCleared);
        }}
        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
      >
        Rejeter
      </button>
    </div>
  ), [toggleCleared, updateCandidatureStatus]);
  
  // Fonction pour exporter en Excel
  const exporterExcel = () => {
    // Créer un fichier Excel avec les données filtrées
    const dataToExport = candidaturesFiltrees.map(cand => ({
      'ID': cand.str_id,
      'Code': cand.str_code,
      'Nom': cand.str_nom,
      'Sigle': cand.str_sigle,
      'Statut': cand.str_statut_label || cand.str_statut,
      'Année de création': cand.str_annee_creation,
      'Domaine d\'intervention': cand.str_domaine_intervention,
      'Province': cand.str_province,
      'Adresse': cand.str_adresse_siege_sociale,
      'Téléphone': cand.str_telephone,
      'Email': cand.str_email,
      'Représentant légal': cand.str_representant_legal,
      'Date de soumission': cand.str_date_soumission
    }));
    
    // Créer un fichier CSV (pour l'instant, on simule juste le téléchargement)
    const headers = Object.keys(dataToExport[0] || {});
    let csvContent = headers.join(';') + '\n';
    
    dataToExport.forEach(row => {
      const values = headers.map(header => {
        const value = row[header] || '';
        return `"${value}"`; // Mettre entre guillemets pour gérer les virgules
      });
      csvContent += values.join(';') + '\n';
    });
    
    // Créer un blob et déclencher le téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `candidatures_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.str_id,
      sortable: true,
      width: '120px',
      cell: row => (
        <span className="font-mono text-sm text-gray-600">{row.str_id}</span>
      )
    },
    {
      name: 'NOM',
      selector: row => row.str_nom,
      sortable: true,
      cell: row => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{row.str_nom}</span>
          <span className="text-xs text-gray-500">{row.str_sigle}</span>
        </div>
      ),
      grow: 2
    },
    {
      name: 'STATUT',
      selector: row => row.str_statut,
      sortable: true,
      cell: row => <StatusBadge status={row.str_statut} />,
      width: '180px'
    },
    {
      name: 'DOMAINE',
      selector: row => row.str_domaine_intervention,
      sortable: true,
      cell: row => (
        <span className="text-sm text-gray-600">{row.str_domaine_intervention}</span>
      )
    },
    {
      name: 'LOCALISATION',
      selector: row => row.str_province,
      sortable: true,
      cell: row => (
        <div className="flex items-center">
          <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{row.str_province}</span>
        </div>
      )
    },
    {
      name: 'DATE SOUMISSION',
      selector: row => row.str_date_soumission,
      sortable: true,
      cell: row => (
        <div className="text-sm text-gray-600">
          {new Date(row.str_date_soumission).toLocaleDateString('fr-FR')}
        </div>
      ),
      width: '140px'
    },
    {
      name: 'ACTIONS',
      cell: row => (
        <div className="flex space-x-2">
          <Link 
            to={`/admin/candidatures/${row.str_id}`}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full"
            title="Voir les détails"
          >
            <FiEye className="h-4 w-4" />
          </Link>
          <div className="relative inline-block text-left group">
            <button 
              type="button" 
              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <FiChevronDown className="h-4 w-4" />
            </button>
            <div className="hidden group-hover:block absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(row.str_id, 'en_cours');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                >
                  <FiRefreshCw className="mr-2 h-4 w-4" />
                  Marquer en cours
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(row.str_id, 'approuvé');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                >
                  <FiCheckCircle className="mr-2 h-4 w-4" />
                  Approuver
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(row.str_id, 'rejeté');
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                >
                  <FiXCircle className="mr-2 h-4 w-4" />
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
      width: '100px',
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];


  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur de chargement</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Une erreur est survenue lors du chargement des candidatures : {error}</p>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => window.location.reload()}
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                  onClick={exporterExcel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                    className="text-sm text-blue-600 hover:text-blue-800"
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
                      {domainesIntervention.map((domaine) => (
                        <option key={domaine} value={domaine}>
                          {domaine}
                        </option>
                      ))}
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
                      {anneesCreation.map((annee) => (
                        <option key={annee} value={annee}>
                          {annee}
                        </option>
                      ))}
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
                      {provinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
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
                      {statuts.map((statut) => (
                        <option key={statut.value} value={statut.value}>
                          {statut.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <FiChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 lg:col-span-4 flex justify-end items-center pt-4">
                  <button 
                    onClick={appliquerFiltresAvances} 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              data={candidaturesFiltrees}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidatures;
