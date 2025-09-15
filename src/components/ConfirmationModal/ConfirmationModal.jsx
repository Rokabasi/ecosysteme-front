import { useState } from "react";
import { FiX } from "react-icons/fi";
import { IoCheckmarkCircle, IoAlertCircle, IoHelpCircle } from "react-icons/io5";

// ConfirmationModal polyvalent respectant la charte (#6a1754, #0089CF)
// Props:
// - isOpen: bool
// - type: 'confirm' | 'question'
// - title: string
// - message: string
// - confirmText: string
// - cancelText: string
// - onConfirm: async function (peut lancer la requête)
// - onCancel: function
// - onClose: function
// Affichage:
// - Clic sur "confirmer": bouton en chargement; si succès -> modal succès; si erreur -> modal erreur
// - Clic sur "annuler": le modal se ferme simplement
const ConfirmationModal = ({
  isOpen,
  type = "confirm",
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir continuer ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // 'success' | 'error' | null

  if (!isOpen && result === null) return null;

  const closeAll = () => {
    setLoading(false);
    setResult(null);
    onClose && onClose();
  };

  const handleCancel = () => {
    if (loading) return; // éviter l'annulation pendant le chargement
    onCancel && onCancel();
    closeAll();
  };

  const handleConfirm = async () => {
    if (loading) return;
    try {
      setLoading(true);
      if (onConfirm) {
        await onConfirm(); // laisse le parent exécuter la requête
      }
      setResult("success");
    } catch (e) {
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  const HeaderIcon = () => {
    if (result === "success") return <IoCheckmarkCircle className="w-7 h-7 text-green-600" />;
    if (result === "error") return <IoAlertCircle className="w-7 h-7 text-red-600" />;
    if (type === "question") return <IoHelpCircle className="w-7 h-7 text-[#0089CF]" />;
    return <IoAlertCircle className="w-7 h-7 text-[#6a1754]" />; // confirmation
  };

  const headerTitle =
    result === "success"
      ? "Succès"
      : result === "error"
      ? "Échec"
      : title;

  const headerMessage =
    result === "success"
      ? "L'opération a été réalisée avec succès."
      : result === "error"
      ? "Une erreur est survenue lors du traitement."
      : message;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <HeaderIcon />
            <h3 className="text-lg font-semibold text-gray-900">{headerTitle}</h3>
          </div>
          <button
            onClick={closeAll}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{headerMessage}</p>
        </div>

        {/* Actions */}
        {result === null ? (
          <div className="flex flex-col sm:flex-row gap-3 p-6 pt-0">
           
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-red-600 font-normal text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-60"
            >
              {cancelText}
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
              {confirmText}
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-3 p-6 pt-0">
            <button
              onClick={closeAll}
              className={`px-4 py-2 rounded-md font-medium text-white ${
                result === "success" ? "bg-[#0089CF] hover:bg-[#0077b4]" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;