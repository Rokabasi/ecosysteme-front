import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FiEye, FiArrowLeft } from 'react-icons/fi';
import useCandidatures from './useCandidature';

const Candidatures = () => {
  const { candidatures, loading, error,customStyles } = useCandidatures();
  const navigate = useNavigate();

  const columns = [
    {
      name: 'ID',
      selector: row => row.str_code,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Nom',
      selector: row => row.str_nom,
      sortable: true,
    },
    {
      name: 'Sigle',
      selector: row => row.str_sigle,
      sortable: true,
    },
    {
      name: 'Année de création',
      selector: row => row.str_annee_creation,
      sortable: true,
    },
    {
      name: 'Adresse du siege sociale',
      selector: row => row.str_adresse_siege_sociale,
      sortable: true,
    },
    {
      name: 'Statut',
      selector: row => row.str_statut,
      sortable: true,
      cell: row => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.str_statut === 'Approuvé' ? 'bg-green-100 text-green-800' :
          row.str_statut === 'Rejeté' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.str_statut}
        </span>
      ),
    },
    {
      name: 'Actions',
      button: true,
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin/candidatures/${row.str_id}`)}
          className="text-blue-600 hover:text-blue-900"
          title="Voir les détails"
        >
          <FiEye className="w-5 h-5" />
        </button>
      ),
    },
  ];


  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Une erreur est survenue lors du chargement des candidatures: {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Liste des Candidatures</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={candidatures}
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
  );
};

export default Candidatures;
