import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';

const ValidationModal = ({ 
  isOpen, 
  type, // 'validation' | 'rejection'
  onConfirm, 
  onCancel, 
  onSuccessClose,
  loading,
  showSuccessOnly = false,
  showConfirmationOnly = false
}) => {
  const [comment, setComment] = useState('');
  const [showResult, setShowResult] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (showSuccessOnly) {
        setShowResult('success');
      } else if (showConfirmationOnly) {
        setShowResult('confirmation');
      } else {
        setShowResult(null);
        setComment('');
      }
      setErrorMessage('');
    }
  }, [isOpen, showSuccessOnly, showConfirmationOnly]);
  
  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (showResult === 'confirmation') {
      try {
        await onConfirm(comment);
        onSuccessClose();
      } catch (error) {
        setShowResult('error');
        setErrorMessage(error?.message || `Une erreur est survenue lors de la ${type === 'validation' ? 'validation' : 'rejection'}.`);
      }
    } else {
      setShowResult('confirmation');
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
        message: `Le dossier a été ${type === 'validation' ? 'validé' : 'rejeté'} avec succès.`,
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

    if (showResult === 'confirmation') {
      return {
        title: `Confirmation de ${type === 'validation' ? 'validation' : 'rejet'}`,
        message: `Êtes-vous sûr de vouloir ${type === 'validation' ? 'valider' : 'rejeter'} ce dossier ?`,
        icon: <FiAlertCircle className="w-8 h-8 text-[#6a1754]" />,
        buttonText: null,
        buttonClass: null
      };
    }

    return {
      title: `${type === 'validation' ? 'Validation' : 'Rejet'} du dossier`,
      message: `Veuillez ajouter un commentaire pour ${type === 'validation' ? 'valider' : 'rejeter'} ce dossier.`,
      icon: type === 'validation' ? 
        <FiCheck className="w-8 h-8 text-green-600" /> : 
        <FiAlertCircle className="w-8 h-8 text-red-600" />,
      buttonText: null,
      buttonClass: null
    };
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
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
          <p className="text-gray-700 leading-relaxed mb-4">{content.message}</p>
          
          {/* Comment field - only show in initial state */}
          {!showResult && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Commentaire {'(obligatoire)'}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#6a1754] focus:border-transparent resize-none"
                placeholder={`Ajoutez un commentaire pour ${type === 'validation' ? 'la validation' : 'le rejet'}...`}
                required={type === 'rejection'}
              />
            </div>
          )}
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
        ) : showResult === 'confirmation' ? (
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-red-600 font-normal text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-60"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-normal cursor-pointer transition-colors ${
                loading
                  ? "bg-[#6a1754]/70 cursor-not-allowed"
                  : "bg-[#6a1754] hover:bg-[#5c1949]"
              }`}
            >
              {loading && (
                <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Confirmer
            </button>
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
              disabled={type === 'rejection' && !comment.trim()}
              className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-normal cursor-pointer transition-colors ${
                type === 'rejection' && !comment.trim()
                  ? 'bg-gray-300 cursor-not-allowed'
                  : type === 'validation'
                  ? 'bg-[#6a1754] hover:bg-[#5c1949]'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {type === 'validation' ? 'Valider' : 'Rejeter'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationModal;
