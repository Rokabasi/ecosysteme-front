import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <FiAlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Confirmation de sortie
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">
            Voulez-vous vraiment quitter l'inscription ? Les informations déjà
            saisies seront perdues.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#6a1754] text-white rounded-md hover:bg-[#5c1949] transition-colors font-medium"
          >
            Continuer l'inscription
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors font-medium"
          >
            Abandonner l'inscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;