import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidatures, selectAllCandidatures } from '../../app/reducers/candidatures';

// Données de test plus complètes
const generateMockData = () => {
  const domaines = [
    'Environnement', 
    'Développement rural', 
    'Santé', 
    'Éducation', 
    'Droits humains',
    'Eau et assainissement',
    'Sécurité alimentaire'
  ];
  
  const provinces = [
    'Kinshasa', 
    'Kongo Central', 
    'Kwango', 
    'Kwilu', 
    'Mai-Ndombe', 
    'Kasaï', 
    'Kasaï Central',
    'Kasaï Oriental',
    'Lomami',
    'Sankuru',
    'Maniema',
    'Sud-Kivu',
    'Nord-Kivu',
    'Ituri',
    'Haut-Uele',
    'Tshopo',
    'Bas-Uele',
    'Nord-Ubangi',
    'Mongala',
    'Sud-Ubangi',
    'Équateur',
    'Tshuapa'
  ];
  
  const statuts = ['soumis', 'en_cours', 'approuvé', 'rejeté'];
  const statutLabels = {
    'soumis': 'En attente',
    'en_cours': 'En cours de traitement',
    'approuvé': 'Approuvé',
    'rejeté': 'Rejeté'
  };
  
  const data = [];
  const nomsOng = [
    'Action pour le Développement Durable',
    'Aide et Espoir',
    'Solidarité Internationale',
    'Mains Unies',
    'Ensemble pour Demain',
    'Espoir et Vie',
    'Nouvel Horizon',
    'Avenir Meilleur',
    'Coeur Solidaire',
    'Tous Ensemble'
  ];
  
  for (let i = 1; i <= 50; i++) {
    const domaineIndex = Math.floor(Math.random() * domaines.length);
    const provinceIndex = Math.floor(Math.random() * provinces.length);
    const statut = statuts[Math.floor(Math.random() * statuts.length)];
    const nomOng = nomsOng[Math.floor(Math.random() * nomsOng.length)];
    const sigle = nomOng.split(' ').map(word => word[0]).join('').toUpperCase();
    
    data.push({
      str_id: `CAND-${String(i).padStart(3, '0')}`,
      str_code: i,
      str_nom: nomOng,
      str_statut: statut,
      str_statut_label: statutLabels[statut],
      str_sigle: sigle,
      str_annee_creation: String(2015 + Math.floor(Math.random() * 9)),
      str_adresse_siege_sociale: `${Math.floor(Math.random() * 100) + 1} Avenue des ONGs, ${provinces[provinceIndex]}`,
      str_telephone: `+243 8${String(Math.floor(Math.random() * 9000000) + 1000000)}`,
      str_email: `contact@${nomOng.toLowerCase().replace(/\s+/g, '')}.org`,
      str_domaine_intervention: domaines[domaineIndex],
      str_representant_legal: `Représentant ${i}`,
      str_date_soumission: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      str_province: provinces[provinceIndex]
    });
  }
  
  return data;
};

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simuler le chargement des données
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        // Simulation d'un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Génération des données de test
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des candidatures:', err);
        setError('Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchCandidatures();
  }, []);

console.log(candidatureData);

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
