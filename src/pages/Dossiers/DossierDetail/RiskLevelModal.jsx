import React, { useState, useEffect } from 'react';
import { FiX, FiUploadCloud, FiFile, FiTrash2 } from 'react-icons/fi';

const RiskLevelModal = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  onSuccessClose,
  loading
}) => {
  const [riskLevel, setRiskLevel] = useState('');
  const [files, setFiles] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setRiskLevel('');
      setFiles([]);
      setShowResult(null);
      setShowConfirmation(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setShowConfirmation(false);
    try {
      await onConfirm(riskLevel, files);
      setShowResult('success');
    } catch (error) {
      setShowResult('error');
    }
  };

  const handleInitialConfirm = () => {
    setShowConfirmation(true);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    if (showResult === 'success') {
      onSuccessClose();
    } else {
      onCancel();
    }
  };

  // Validation: au moins un niveau de risque et un fichier
  const isFormValid = riskLevel && files.length > 0;

  if (showResult === 'success') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-green-600">Succès</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700">Le niveau de risque a été ajouté avec succès.</p>
          </div>
          <div className="flex justify-end p-6 pt-0">
            <button onClick={handleClose} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult === 'error') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-red-600">Erreur</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-gray-700">Une erreur s'est produite lors de l'ajout du niveau de risque.</p>
          </div>
          <div className="flex justify-end p-6 pt-0">
            <button onClick={handleClose} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              Êtes-vous sûr de vouloir ajouter le niveau de risque <strong>"{riskLevel}"</strong> avec {files.length} document(s) ?
            </p>
            <p className="text-sm text-gray-500">
              Cette action ne peut pas être annulée.
            </p>
          </div>
          <div className="flex justify-end gap-3 p-6 pt-0 border-t border-gray-200">
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Ajouter Niveau de Risque</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Niveau de Risque <span className="text-red-500">*</span>
            </label>
            <select
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a1754] focus:border-transparent"
            >
              <option value="">Sélectionnez un niveau de risque</option>
              <option value="Faible">Faible</option>
              <option value="Modéré">Modéré</option>
              <option value="Élevé">Élevé</option>
              <option value="Très Élevé">Très Élevé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documents de Due Diligence
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-[#6a1754] transition-colors">
              <div className="space-y-1 text-center">
                <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#6a1754] hover:text-[#5c1949] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#6a1754]">
                    <span>Téléchargez des fichiers</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="pl-1">ou glissez-déposez</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG jusqu'à 10MB chacun</p>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Fichiers sélectionnés ({files.length}):</h4>
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

        <div className="flex justify-end gap-3 p-6 pt-0 border-t border-gray-200">
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
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskLevelModal;
