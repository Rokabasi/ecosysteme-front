import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuditDossiers, getDossiers, getErrorDossier, getFinanceDossiers, getJuridiqueDossiers, getLoadingDossier, selectAllDossiers } from '../../app/reducers/dossiers';
import { getSessionUser } from '../../config/auth';

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

const useDossiers = () => {

  const dispatch = useDispatch();
  const candidatureData = useSelector(selectAllDossiers);
  const loading = useSelector(getLoadingDossier)
  const error = useSelector(getErrorDossier);
  const user = getSessionUser();

    useEffect(()=>{
      if(user.direction === 'AUDIT' &&  user.profil === 'Auditeur'){        
        dispatch(getAuditDossiers());
      }else if(user.direction === 'JURIDIQUE' &&  user.profil === 'Juriste'){
        dispatch(getJuridiqueDossiers());
      }else if(user.direction === 'FINANCE' &&  user.profil === 'Financier'){
        dispatch(getFinanceDossiers());
      } else dispatch(getAuditDossiers());
    },[])

  return {
    loading,
    error,
    customStyles,
    candidatureData
  };
};

export default useDossiers;
