import { FiEdit2, FiTrash2 } from 'react-icons/fi';

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f8fafc',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      },
    },
    headCells: {
      style: {
        fontWeight: '600',
        color: '#334155',
        fontSize: '0.875rem',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    pagination: {
      style: {
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
    },
  };
export const UseConfiguration = () => {
    const provincesData = [
        { id: 1, nom: 'Kinshasa', code: 'KIN', dateCreation: '2023-01-01' },
        { id: 2, nom: 'Kongo Central', code: 'KOC', dateCreation: '2023-01-02' },
        { id: 3, nom: 'Nord-Kivu', code: 'NKI', dateCreation: '2023-01-03' },
        // Ajoutez d'autres provinces selon vos besoins
    ];

    // Données de démonstration pour les domaines
    const domainesData = [
        { id: 1, nom: 'Santé', description: 'Santé et bien-être', dateCreation: '2023-01-01' },
        { id: 2, nom: 'Éducation', description: 'Éducation et formation', dateCreation: '2023-01-02' },
        { id: 3, nom: 'Environnement', description: 'Protection de l\'environnement', dateCreation: '2023-01-03' },
        // Ajoutez d'autres domaines selon vos besoins
    ];

    // Colonnes pour le tableau des provinces
    const provincesColumns = [
        {
            name: 'Nom',
            selector: row => row.nom,
            sortable: true,
        },
    {
        name: 'Code',
        selector: row => row.code,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: (row) => (
        <div className="flex space-x-2">
            <button 
            className="p-1 text-[#0089CF] hover:bg-blue-50 rounded"
            onClick={() => handleEdit('province', row)}
            >
            <FiEdit2 size={16} />
            </button>
            <button 
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            onClick={() => handleDelete('province', row.id)}
            >
            <FiTrash2 size={16} />
            </button>
        </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    ];

    // Colonnes pour le tableau des domaines
    const domainesColumns = [
        {
            name: 'Nom',
            selector: row => row.nom,
            sortable: true,
        },
    {
        name: 'Description',
        selector: row => row.description,
        sortable: true,
    },
    {
        name: 'Actions',
        cell: (row) => (
        <div className="flex space-x-2">
            <button 
            className="p-1 text-[#0089CF] hover:bg-blue-50 rounded"
            onClick={() => handleEdit('domaine', row)}
            >
            <FiEdit2 size={16} />
            </button>
            <button 
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            onClick={() => handleDelete('domaine', row.id)}
            >
            <FiTrash2 size={16} />
            </button>
        </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    ];

    // Gestionnaires d'événements (à implémenter)
    const handleEdit = (type, item) => {
    console.log(`Modifier ${type}:`, item);
    // Implémentez la logique de modification ici
    };

    const handleDelete = (type, id) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ce ${type} ?`)) {
        console.log(`Supprimer ${type} avec l'ID:`, id);
        // Implémentez la logique de suppression ici
    }
    };

    const handleAdd = (type) => {
    console.log(`Ajouter un nouveau ${type}`);
    // Implémentez la logique d'ajout ici
    };

    return {
       provincesData,
       provincesColumns,
       domainesData,
       domainesColumns,
       handleAdd,
       customStyles
      };
}