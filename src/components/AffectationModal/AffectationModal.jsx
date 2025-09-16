import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const AffectationModal = ({ 
  isOpen, 
  direction, 
  onConfirm, 
  onCancel, 
  onSuccessClose,
  loading,
  showSuccessOnly = false
}) => {
  const [showResult, setShowResult] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (showSuccessOnly) {
        setShowResult('success');
      } else {
        setShowResult(null);
      }
      setErrorMessage('');
    }
  }, [isOpen, showSuccessOnly]);

  // Watch for loading state changes to show success
  useEffect(() => {
    if (!loading && isOpen && showResult === 'loading') {
      // Si on n'est plus en loading et qu'on était en état loading, c'est un succès
      setShowResult('success');
    }
  }, [loading, isOpen, showResult]);
  
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await onConfirm();
      // Fermer le modal immédiatement après la requête
      onSuccessClose();
    } catch (error) {
      setShowResult('error');
      setErrorMessage(error?.message || 'Une erreur est survenue lors de l\'affectation.');
    }
  };

  const handleCancel = () => {
    if (loading) return;
    onCancel();
  };

  const handleClose = () => {
    if (showResult === 'success') {
      onSuccessClose();
    } else {
      onCancel();
    }
  };

  // Contenu selon l'état
  const getContent = () => {
    if (showResult === 'success') {
      return {
        title: 'Succès',
        message: 'L\'affectation a été réalisée avec succès.',
        icon: <FiCheck className="w-8 h-8 text-green-600" />,
        buttonText: 'OK',
        buttonClass: 'bg-green-600 hover:bg-green-700'
      };
    }
    
    if (showResult === 'error') {
      return {
        title: 'Erreur',
        message: errorMessage,
        icon: <FiAlertCircle className="w-8 h-8 text-red-600" />,
        buttonText: 'OK',
        buttonClass: 'bg-red-600 hover:bg-red-700'
      };
    }

    if (showResult === 'loading') {
      return {
        title: 'Affectation en cours...',
        message: 'Veuillez patienter pendant l\'affectation du dossier.',
        icon: <div className="w-8 h-8 border-4 border-[#6a1754] border-t-transparent rounded-full animate-spin" />,
        buttonText: null,
        buttonClass: null
      };
    }

    return {
      title: 'Confirmation d\'affectation',
      message: `Êtes-vous sûr de vouloir affecter ce dossier de candidature à la direction "${direction}" ?`,
      icon: <FiAlertCircle className="w-8 h-8 text-[#6a1754]" />,
      buttonText: null,
      buttonClass: null
    };
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {content.icon}
            <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{content.message}</p>
        </div>

        {/* Actions */}
        {showResult === 'success' || showResult === 'error' ? (
          <div className="flex justify-end gap-3 p-6 pt-0">
            <button
              onClick={handleClose}
              className={`px-4 py-2 rounded-md font-medium text-white ${content.buttonClass}`}
            >
              {content.buttonText}
            </button>
          </div>
        ) : showResult === 'loading' ? (
          <div className="p-6 pt-0">
            {/* Pas de boutons pendant le loading */}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-red-600 font-normal text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-normal cursor-pointer transition-colors bg-[#6a1754] hover:bg-[#5c1949]"
            >
              Oui
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AffectationModal;
