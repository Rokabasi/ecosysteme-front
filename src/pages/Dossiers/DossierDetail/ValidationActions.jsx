import React, { useState } from 'react';
import ValidationModal from '../../../components/ValidationModal/ValidationModal';
import { validatedDossier, rejetedDossier, getDossierDetails } from '../../../app/reducers/dossiers';
import { getSessionUser } from '../../../config/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingCandidature } from '../../../app/reducers/candidatures';

const ValidationActions = ({ dossier }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingCandidature);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationType, setValidationType] = useState('');

  const handleValidation = () => {
    setValidationType('validation');
    setShowValidationModal(true);
  };

  const handleRejection = () => {
    setValidationType('rejection');
    setShowRejectionModal(true);
  };

  const handleValidationConfirm = async (comment) => {
    const userData = getSessionUser();
    const validationData = {
      str_id: dossier.str_id,
      commentaire: comment,
      user: userData
    };
    await dispatch(validatedDossier(validationData)).unwrap();
    dispatch(getDossierDetails(dossier.str_id));
  };

  const handleRejectionConfirm = async (comment) => {
    const userData = getSessionUser();
    const rejectionData = {
      str_id: dossier.str_id,
      commentaire: comment,
      user: userData
    };
    await dispatch(rejetedDossier(rejectionData)).unwrap();
    dispatch(getDossierDetails(dossier.str_id));
  };

  const handleValidationModalClose = () => {
    setShowValidationModal(false);
    setShowSuccessModal(true);
  };

  const handleRejectionModalClose = () => {
    setShowRejectionModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    dispatch(getDossierDetails(dossier.str_id));
  };

  if (dossier.str_statut !== 'soumis') {
    return null;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions de Validation</h2>
        <div className="space-y-3">
          <button 
            onClick={handleValidation}
            className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-green-600 text-white hover:bg-green-700"
          >
            Valider
          </button>
          
          <button 
            onClick={handleRejection}
            className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-red-600 text-white hover:bg-red-700"
          >
            Rejeter
          </button>
        </div>
      </div>

      <ValidationModal
        isOpen={showValidationModal}
        type="validation"
        onConfirm={handleValidationConfirm}
        onCancel={() => setShowValidationModal(false)}
        onSuccessClose={handleValidationModalClose}
        loading={loading}
      />

      <ValidationModal
        isOpen={showRejectionModal}
        type="rejection"
        onConfirm={handleRejectionConfirm}
        onCancel={() => setShowRejectionModal(false)}
        onSuccessClose={handleRejectionModalClose}
        loading={loading}
      />

      <ValidationModal
        isOpen={showSuccessModal}
        type={validationType}
        onConfirm={() => {}}
        onCancel={handleSuccessModalClose}
        onSuccessClose={handleSuccessModalClose}
        loading={false}
        showSuccessOnly={true}
      />
    </>
  );
};

export default ValidationActions;
