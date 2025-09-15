import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatureDetails, selectCandidatureDetails } from '../../../app/reducers/candidatures';
import { useParams } from 'react-router';

const useCandidatures = () => {

  const dispatch = useDispatch();
  const candidature = useSelector(selectCandidatureDetails);
  const { id }= useParams();

  useEffect(()=>{
    dispatch(getCandidatureDetails(id));
  },[])

  return {
    candidature
  };
};

export default useCandidatures;
