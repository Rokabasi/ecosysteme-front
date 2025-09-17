import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getDossierDetails, getErrorDossier, getLoadingDossier, selectDossierDetails } from '../../../app/reducers/dossiers';

const useCandidatures = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dossier = useSelector(selectDossierDetails);
  const loading = useSelector(getLoadingDossier)
  const error = useSelector(getErrorDossier);
  const { id }= useParams();

  useEffect(()=>{
    dispatch(getDossierDetails(id));
  },[])

  return {
    dossier,
    error,
    loading,
    navigate
  };
};

export default useCandidatures;
