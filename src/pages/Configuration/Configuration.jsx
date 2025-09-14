import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import {  FiPlus } from 'react-icons/fi';
import { UseConfiguration } from './hook';

// Données de démonstration pour les provinces


const Configuration = () => {

  const { provincesData, domainesData, provincesColumns, domainesColumns, handleAdd, customStyles } = UseConfiguration();

  const [activeTab, setActiveTab] = useState('provinces');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Configuration</h1>
        <p className="text-gray-600">Gérez les paramètres de l'application</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* En-tête des onglets */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('provinces')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'provinces'
                  ? 'border-b-2 border-[#0089CF] text-[#0089CF]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Provinces
            </button>
            <button
              onClick={() => setActiveTab('domaines')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'domaines'
                  ? 'border-b-2 border-[#0089CF] text-[#0089CF]'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Domaines d'intervention
            </button>
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {/* Bouton d'ajout */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => handleAdd(activeTab === 'provinces' ? 'province' : 'domaine')}
              className="cursor-pointer flex items-center px-4 py-2 bg-[#0089CF] text-white rounded-md  transition-colors"
            >
              <FiPlus className="mr-2" />
              Ajouter {activeTab === 'provinces' ? 'une province' : 'un domaine'}
            </button>
          </div>

          {/* Tableau des provinces */}
          {activeTab === 'provinces' && (
            <DataTable
              columns={provincesColumns}
              data={provincesData}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
              highlightOnHover
              customStyles={customStyles}
              noDataComponent={
                <div className="py-8 text-center text-gray-500">
                  Aucune province trouvée
                </div>
              }
            />
          )}

          {/* Tableau des domaines */}
          {activeTab === 'domaines' && (
            <DataTable
              columns={domainesColumns}
              data={domainesData}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
              highlightOnHover
              customStyles={customStyles}
              noDataComponent={
                <div className="py-8 text-center text-gray-500">
                  Aucun domaine trouvé
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
