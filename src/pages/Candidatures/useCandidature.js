import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatures, getErrorCandidature, getLoadingCandidature, selectAllCandidatures } from '../../app/reducers/candidatures';

const customStyles = {
  headCells: {
    style: {
      backgroundColor: '#f9fafb',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      minHeight: '3.5rem',
      '&:not(:last-of-type)': {
        borderBottom: '1px solid #e5e7eb',
      },
      '&:hover': {
        backgroundColor: '#f8fafc',
      },
    },
  },
  pagination: {
    style: {
      borderTop: '1px solid #e5e7eb',
      paddingTop: '12px',
      paddingBottom: '12px',
    },
  },
};

const useCandidatures = () => {

  const dispatch = useDispatch();
  const candidatureData = useSelector(selectAllCandidatures);
  const loading = useSelector(getLoadingCandidature)
  const error = useSelector(getErrorCandidature);

  useEffect(()=>{
    dispatch(getCandidatures());
  },[])

  return {
    loading,
    error,
    customStyles,
    candidatureData
  };
};

export default useCandidatures;
