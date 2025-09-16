import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCandidatureDetails, getErrorCandidature, getLoadingCandidature, selectCandidatureDetails, affectationCandidature } from '../../../app/reducers/candidatures';
import { useParams } from 'react-router';
import { getSessionUser } from '../../../config/auth';

const useCandidatures = () => {
  const [selectedDirection, setSelectedDirection] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const candidature = useSelector(selectCandidatureDetails);
  const loading = useSelector(getLoadingCandidature)
  const error = useSelector(getErrorCandidature);
  const { id }= useParams();

  useEffect(()=>{
    dispatch(getCandidatureDetails(id));
  },[])

  const handleAffectation = async () => {
    try {
      setIsSubmitting(true);
      
      // Récupérer les données utilisateur depuis sessionStorage
      const userData = getSessionUser();
      
      const affectationData = {
        str_id: candidature.str_id,
        direction: selectedDirection,
        user: userData
      };

      const result = await dispatch(affectationCandidature(affectationData)).unwrap();
      
    } catch (error) {
      // L'erreur sera gérée par le modal de confirmation
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    // Navigation vers la liste des candidatures après fermeture du modal de succès
    navigate('/admin/candidatures');
  };

  return {
    candidature,
    error,
    loading,
    selectedDirection,
    setSelectedDirection,
    showConfirmModal,
    setShowConfirmModal,
    isSubmitting,
    handleAffectation,
    handleSuccessModalClose
  };
};

export default useCandidatures;
