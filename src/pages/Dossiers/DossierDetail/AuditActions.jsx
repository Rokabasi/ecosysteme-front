import React, { useState } from 'react';
import RiskLevelModal from './RiskLevelModal';
import { niveauRisqueDossier, getDossierDetails } from '../../../app/reducers/dossiers';
import { getSessionUser } from '../../../config/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getLoadingCandidature } from '../../../app/reducers/candidatures';

const AuditActions = ({ dossier }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingCandidature);
  const [showRiskModal, setShowRiskModal] = useState(false);

  const handleRiskConfirm = async (riskLevel, files) => {
    const userData = getSessionUser();
    const formData = new FormData();

    // Append each field individually to FormData
    formData.append('str_id', dossier.str_id);
    formData.append('risque', riskLevel);
    formData.append('user', JSON.stringify(userData));
    
    files.forEach((file, index) => {
      formData.append(`documentsduediligence`, file);
    });

    await dispatch(niveauRisqueDossier(formData)).unwrap();
    await dispatch(getDossierDetails(dossier.str_id));
  };

  const handleRiskModalClose = () => {
    setShowRiskModal(false);
    dispatch(getDossierDetails(dossier.str_id));
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions d'Audit</h2>
        <div className="space-y-3">
          <button 
            onClick={() => setShowRiskModal(true)}
            className="w-full px-4 py-2 rounded-md font-medium transition-colors cursor-pointer bg-[#6a1754] text-white hover:bg-[#5c1949]"
          >
            Ajouter Niveau de Risque
          </button>
        </div>
      </div>

      <RiskLevelModal
        isOpen={showRiskModal}
        onConfirm={handleRiskConfirm}
        onCancel={() => setShowRiskModal(false)}
        onSuccessClose={handleRiskModalClose}
        loading={loading}
      />
    </>
  );
};

export default AuditActions;
