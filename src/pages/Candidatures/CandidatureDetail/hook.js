import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatureDetails, getErrorCandidature, getLoadingCandidature, selectCandidatureDetails } from '../../../app/reducers/candidatures';
import { useParams } from 'react-router';

const useCandidatures = () => {

  const dispatch = useDispatch();
  const candidature = useSelector(selectCandidatureDetails);
  const loading = useSelector(getLoadingCandidature)
  const error = useSelector(getErrorCandidature);
  const { id }= useParams();

  useEffect(()=>{
    dispatch(getCandidatureDetails(id));
  },[])

  return {
    candidature,
    error,
    loading
  };
};

export default useCandidatures;
