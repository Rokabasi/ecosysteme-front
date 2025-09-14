import { useState, useEffect } from 'react';

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#f9fafb',
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
      },
    },
    rows: {
      style: {
        minHeight: '3.5rem',
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #e5e7eb',
        },
      },
    },
  };

const useCandidatures = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simuler le chargement des données
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        // Simulation de données
        const mockData = [
          {
            str_id: 'CAND-001',
            str_code: 1,
            str_nom: 'ONG Développement Durable',
            str_statut: 'soumis',
            str_sigle: 'ODD',
            str_annee_creation: '2015',
            str_adresse_siege_sociale: '123 Avenue de la Paix, Kinshasa',
            str_telephone: '+243 81 234 5678',
            str_email: 'contact@ongdd.cd',
            str_domaine_intervention: 'Environnement, Développement rural',
            str_representant_legal: 'Jean KABILA',
            str_date_soumission: '2025-09-10'
          },
          // Ajoutez plus de données de test ici
        ];
        
        setCandidatures(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

  const getCandidatureById = (id) => {
    return candidatures.find(cand => cand.str_id === id);
  };


  return {
    candidatures,
    loading,
    error,
    getCandidatureById,
    customStyles
  };
};

export default useCandidatures;
