import React, { useState } from 'react';
import ProjectCreationModal from './ProjectCreationModal';
import ValidationModal from '../../../components/ValidationModal/ValidationModal';
import { useDispatch, useSelector } from 'react-redux';
import { getDossierDetails } from '../../../app/reducers/dossiers';
import { getSessionUser } from '../../../config/auth';
import { getLoadingCandidature } from '../../../app/reducers/candidatures';
import { sendProjet } from '../../../app/reducers/projet';

const ProjectCreationActions = ({ dossier }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingCandidature);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [requestResult, setRequestResult] = useState(null);
  
  const handleProjectConfirm = async (projectData, files) => {
    setLocalLoading(true);
    try {
      const userData = getSessionUser();
      const formData = new FormData();

      // Append each field individually to FormData
      
      files.forEach((file, index) => {
        formData.append(`contracts`, file);
      });
      
      formData.append('projetData', JSON.stringify(projectData));
      formData.append('str_id', dossier.str_id);

      formData.append('user', JSON.stringify(userData));
      // TODO: Implement createProject action in dossiers reducer
      // await dispatch(createProject(formData)).unwrap();
      
      dispatch(sendProjet(formData));
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Erreur lors de la création du projet:', error);
      setShowErrorModal(true);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleProjectModalClose = () => {
    setShowProjectModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setRequestResult(null);
    dispatch(getDossierDetails(dossier.str_id));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions Juridiques</h2>
        <div className="space-y-3">
          <button 
            onClick={() => setShowProjectModal(true)}
            className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-[#6a1754] text-white hover:bg-[#5c1949]"
          >
            Créer un Projet
          </button>
        </div>
      </div>

      <ProjectCreationModal
        isOpen={showProjectModal}
        onConfirm={handleProjectConfirm}
        onCancel={() => setShowProjectModal(false)}
        onSuccessClose={handleProjectModalClose}
        loading={localLoading}
      />

      <ValidationModal
        isOpen={showSuccessModal}
        type="success"
        message="Le projet a été créé avec succès"
        onConfirm={() => {}}
        onCancel={handleSuccessModalClose}
        onSuccessClose={handleSuccessModalClose}
        loading={false}
        showSuccessOnly={true}
      />
    </>
  );
};

export default ProjectCreationActions;
