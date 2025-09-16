import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getDossierDetails, getErrorDossier, getLoadingDossier, selectDossierDetails } from '../../../app/reducers/dossiers';

const useCandidatures = () => {
  const [selectedDirection, setSelectedDirection] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dossier = useSelector(selectDossierDetails);
  const loading = useSelector(getLoadingDossier)
  const error = useSelector(getErrorDossier);
  const { id }= useParams();

  useEffect(()=>{
    dispatch(getDossierDetails(id));
  },[])

  const handleModalClose = () => {
    setShowConfirmModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return {
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
    dispatch,
    navigate
  };
};

export default useCandidatures;
