import React from 'react';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiFileText, FiUsers, FiTarget, FiInfo } from 'react-icons/fi';
import useCandidatures from './hook';
import Loader from '../../../components/Loader/Loader';
import AffectationModal from '../../../components/AffectationModal/AffectationModal';

const DossierDetail = () => {
  const {
    dossier,
    error,
    loading,
    selectedDirection,
    setSelectedDirection,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessModal,
    setShowSuccessModal,
    handleModalClose,
    handleSuccessModalClose,
    navigate
  } = useCandidatures();

  const handleModalCloseWithNavigation = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalCloseWithNavigation = () => {
    setShowSuccessModal(false);
    navigate('/admin/dossiers');
  };
  
   // Utiliser les données de test

  if (error) {
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
                Aucun dossier trouvée avec l'identifiant
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

    if (loading || !dossier) {
    return(
      <Loader />
    ) 
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const statusClasses = {
      'soumis': 'bg-blue-100 text-blue-800',
      'approuve': 'bg-green-100 text-green-800',
      'rejete': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    
    const statusClass = statusClasses[status] || statusClasses['default'];
    
    return (
      <span className={`${baseClasses} ${statusClass}`}>
        {status === 'soumis' ? 'Soumis' : status}
      </span>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/admin/dossiers')}
            className="flex cursor-pointer items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{dossier.str_designation}</h1>
            <div className="flex items-center space-x-3">
              {getStatusBadge(dossier.str_statut)}
              <span className="text-sm text-gray-500">
                Soumis le {new Date(dossier.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiUser className="mr-3 h-5 w-5 text-[#6a1754]" />
                Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Dénomination</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{dossier.str_designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sigle</label>
                  <p className="mt-1 text-gray-900">{dossier.str_sigle || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Année de création</label>
                  <p className="mt-1 text-gray-900 flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    {dossier.str_annee_creation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre d'employés</label>
                  <p className="mt-1 text-gray-900 flex items-center">
                    <FiUsers className="mr-2 h-4 w-4 text-gray-400" />
                    {dossier.str_nombre_employe_actif}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact et localisation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiMapPin className="mr-3 h-5 w-5 text-[#6a1754]" />
                Contact et localisation
              </h2>
              <div className="space-y-4">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Province du siège social</label>
                    <p className="mt-1 text-gray-900">{dossier.str_province_siege_sociale}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Adresse du siège social</label>
                    <p className="mt-1 text-gray-900">{dossier.str_adresse_siege_sociale}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p className="mt-1 text-gray-900 flex items-center">
                      <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                      {dossier.str_telephone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-blue-600 flex items-center">
                      <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                      <a href={`mailto:${dossier.str_email}`} className="hover:underline">
                        {dossier.str_email}
                      </a>
                    </p>
                  </div>
                </div>
                {dossier.str_site_web && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Site web</label>
                    <p className="mt-1 text-blue-600">
                      <a href={`http://${dossier.str_site_web}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {dossier.str_site_web}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mission et résultats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiTarget className="mr-3 h-5 w-5 text-[#6a1754]" />
                Mission et résultats
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Mission de l'organisation</label>
                  <p className="mt-2 text-gray-900 leading-relaxed">{dossier.str_mission}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Résultats opérationnels</label>
                  <p className="mt-2 text-gray-900 leading-relaxed">{dossier.str_resultat_operationel}</p>
                </div>
              </div>
            </div>

            {/* Zones d'intervention */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Zones d'intervention</h2>
              <div className="space-y-4">
                {dossier.Province_structures.map((province, index) => (
                  <div key={index} className="border-l-4 border-[#6a1754] pl-4">
                    <h3 className="font-semibold text-gray-900">{province.Province.pro_designation}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {province.Localite_operationnelles.map((localite, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {localite.loc_designation}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domaines d'intervention */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Domaines d'intervention</h2>
              <div className="flex flex-wrap gap-3">
                {dossier.Domaine_structures.map((domaine, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a1754] text-white">
                    {domaine.Domaine.dom_designation}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiFileText className="mr-3 h-5 w-5 text-[#6a1754]" />
                Documents joints
              </h2>
              <div className="space-y-3">
                {dossier.Documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.doc_designation}</p>
                        <p className="text-sm text-gray-500">{doc.doc_name} • {formatFileSize(parseInt(doc.doc_size))}</p>
                      </div>
                    </div>
                    <button className="text-[#6a1754] hover:text-[#5c1949] text-sm font-medium">
                      <a href={`${import.meta.env.VITE_REMOTE_URL}/documents/${doc.doc_name}`} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                              
                              <span>Aperçu</span>
                        </a>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Représentant légal */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Représentant légal</h2>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#6a1754] flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {dossier.str_nom_representant_legal || 'Non renseigné'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {dossier.str_fonction_representant || 'Fonction non renseignée'}
                  </p>
                </div>
              </div>
            </div>

                        {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button 
                  className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-green-600 text-white hover:bg-green-700"
                >
                  Valider
                </button>
                
                <button 
                  className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700"
                >
                  Rejeter
                </button>
              </div>
            </div>

            {/* Renseignements de la structure */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FiInfo className="mr-2 h-5 w-5 text-[#6a1754]" />
                Renseignements de la structure
              </h2>
              {dossier.Structure_renseignements && dossier.Structure_renseignements.length > 0 && (
                <div className="space-y-4">
                  {dossier.Structure_renseignements.map((renseignement, index) => (
                    <div key={index} className="space-y-3">
                      {/* Prise en charge */}
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${renseignement.sres_prise_en_charge ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Prise en charge de victimes</p>
                          <p className="text-sm text-gray-600">
                            {renseignement.sres_prise_en_charge ? 'Oui' : 'Non'}
                            {renseignement.sres_prise_en_charge_description && (
                              <span className="ml-2 text-[#6a1754]">({renseignement.sres_prise_en_charge_description})</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Association de victimes */}
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${renseignement.sres_is_association_victime ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Association de victimes</p>
                          <p className="text-sm text-gray-600">
                            {renseignement.sres_is_association_victime ? 'Oui' : 'Non'}
                            {renseignement.sres_is_association_victime_description && (
                              <span className="ml-2 text-[#6a1754]">({renseignement.sres_is_association_victime_description})</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Informations sur victimes de violences sexuelles */}
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${renseignement.sres_infos_victime_sexuel ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Informations sur victimes de violences sexuelles</p>
                          <p className="text-sm text-gray-600">
                            {renseignement.sres_infos_victime_sexuel ? 'Oui' : 'Non'}
                          </p>
                        </div>
                      </div>

                      {/* Prêt à collaborer */}
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${renseignement.sres_pret_a_collaborer ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Prêt à collaborer</p>
                          <p className="text-sm text-gray-600">
                            {renseignement.sres_pret_a_collaborer ? 'Oui' : 'Non'}
                          </p>
                        </div>
                      </div>

                      {/* Compte bancaire */}
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${renseignement.sres_a_compte_bancaire ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Dispose d'un compte bancaire</p>
                          <p className="text-sm text-gray-600">
                            {renseignement.sres_a_compte_bancaire ? 'Oui' : 'Non'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Affectations */}
            {dossier.Affectations && dossier.Affectations.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Affectations</h2>
                <div className="space-y-3">
                  {dossier.Affectations.map((affectation, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Direction : {affectation.aff_direction}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(affectation.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Traitements */}
            {dossier.Traitements && dossier.Traitements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Traitements</h2>
                <div className="space-y-3">
                  {dossier.Traitements.map((traitement, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          traitement.tr_statut === 'valide' ? 'bg-green-100 text-green-800' :
                          traitement.tr_statut === 'rejete' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {traitement.tr_statut}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(traitement.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Par : {traitement.tr_usr_nom} </p>
                      {traitement.tr_commentaire && (
                        <p className="text-sm text-gray-600 mt-1">Commentaire : {traitement.tr_commentaire}</p>
                      )}
                      {traitement.tr_action && (
                        <p className="text-sm text-gray-600 mt-1">Action : {traitement.tr_action}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* Actions */}
          </div>
        </div>
      </div>

      {/* Modal de confirmation d'affectation */}
      <AffectationModal
        isOpen={showConfirmModal}
        direction={selectedDirection}
        //onConfirm={handleAffectation}
        onCancel={handleModalClose}
        onSuccessClose={handleModalCloseWithNavigation}
        loading={loading}
      />

      {/* Modal de succès */}
      <AffectationModal
        isOpen={showSuccessModal}
        direction={selectedDirection}
        onConfirm={() => {}}
        onCancel={handleSuccessModalClose}
        onSuccessClose={handleSuccessModalCloseWithNavigation}
        loading={false}
        showSuccessOnly={true}
      />
    </div>
  );
};

export default DossierDetail;
