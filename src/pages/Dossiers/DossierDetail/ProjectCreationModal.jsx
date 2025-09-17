import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud, FiFile, FiTrash2 } from 'react-icons/fi';

const ProjectCreationModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  onSuccessClose,
  loading
}) => {
  const [projectData, setProjectData] = useState({
    pro_code: '',
    pro_intitule: '',
    pro_zone: '',
    pro_date_debut: '',
    pro_date_fin: '',
    pro_cout: '',
    pro_resultat: ''
  });
  const [files, setFiles] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setProjectData({
        pro_code: '',
        pro_intitule: '',
        pro_zone: '',
        pro_date_debut: '',
        pro_date_fin: '',
        pro_cout: '',
        pro_resultat: ''
      });
      setFiles([]);
      setShowConfirmation(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setShowConfirmation(false);
    await onConfirm(projectData, files);
    onSuccessClose();
  };

  const handleInitialConfirm = () => {
    setShowConfirmation(true);
  };

  const handleInputChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Validation: tous les champs obligatoires et au moins un fichier
  const isFormValid = projectData.pro_code.trim() && 
                     projectData.pro_intitule.trim() && 
                     projectData.pro_zone.trim() && 
                     projectData.pro_date_debut && 
                     projectData.pro_date_fin && 
                     projectData.pro_cout.trim() && 
                     projectData.pro_resultat.trim() && 
                     files.length > 0;

  // Modal de confirmation
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Confirmation</h3>
            <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-gray-600">
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Êtes-vous sûr de vouloir créer le projet <strong>"{projectData.pro_intitule}"</strong> avec {files.length} contrat(s) ?
            </p>
            <div className="bg-gray-50 p-3 rounded-md mb-4">
              <p className="text-sm text-gray-700"><strong>Code:</strong> {projectData.pro_code}</p>
              <p className="text-sm text-gray-700"><strong>Zone:</strong> {projectData.pro_zone}</p>
              <p className="text-sm text-gray-700"><strong>Coût:</strong> {projectData.pro_cout}</p>
            </div>
            <p className="text-sm text-gray-500">
              Cette action ne peut pas être annulée.
            </p>
          </div>
          <div className="flex justify-end gap-3 p-6 pt-6 border-t border-gray-200">
            <button 
              onClick={() => setShowConfirmation(false)} 
              className="px-4 py-2 border border-gray-300 font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-medium cursor-pointer transition-colors ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#6a1754] hover:bg-[#5c1949]'
              }`}
            >
              {loading && (
                <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Créer un Projet</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code Projet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectData.pro_code}
                onChange={(e) => handleInputChange('pro_code', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
                placeholder="Ex: PRJ-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intitulé du Projet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectData.pro_intitule}
                onChange={(e) => handleInputChange('pro_intitule', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
                placeholder="Nom du projet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone d'Intervention <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectData.pro_zone}
                onChange={(e) => handleInputChange('pro_zone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
                placeholder="Zone géographique"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coût du Projet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectData.pro_cout}
                onChange={(e) => handleInputChange('pro_cout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
                placeholder="Ex: 50000 USD"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Début <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={projectData.pro_date_debut}
                onChange={(e) => handleInputChange('pro_date_debut', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de Fin <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={projectData.pro_date_fin}
                onChange={(e) => handleInputChange('pro_date_fin', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Résultat Attendu <span className="text-red-500">*</span>
            </label>
            <textarea
              value={projectData.pro_resultat}
              onChange={(e) => handleInputChange('pro_resultat', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent resize-none"
              placeholder="Décrivez les résultats attendus du projet..."
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contrats <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#6a1754] transition-colors">
              <div className="space-y-1 text-center">
                <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="contract-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#6a1754] hover:text-[#5c1949] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6a1754]">
                    <span>Téléchargez des contrats</span>
                    <input 
                      id="contract-upload" 
                      name="contract-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="pl-1">ou glissez-déposez</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX jusqu'à 10MB chacun</p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Contrats sélectionnés ({files.length}):</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center space-x-3">
                      <FiFile className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 border border-gray-300 font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleInitialConfirm}
            disabled={!isFormValid || loading}
            className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-medium cursor-pointer transition-colors ${
              !isFormValid || loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#6a1754] hover:bg-[#5c1949]'
            }`}
          >
            {loading && (
              <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Créer le Projet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreationModal;
