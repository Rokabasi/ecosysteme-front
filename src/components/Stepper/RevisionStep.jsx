import { IoCheckmarkCircle } from "react-icons/io5";

const RevisionStep = ({ formData }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
          <IoCheckmarkCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Révision et validation
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Veuillez vérifier toutes les informations saisies avant de finaliser
          votre inscription.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Résumé de votre inscription
          </h3>

          <div className="space-y-4">
            <div className="border-l-4 border-[#6a1754] pl-4">
              <h4 className="font-medium text-gray-900">
                Informations générales
              </h4>
              <p className="text-sm text-gray-600">
                Votre organisation sera enregistrée avec les informations que
                vous avez fournies.
              </p>
            </div>

            <div className="border-l-4 border-[#6a1754] pl-4">
              <h4 className="font-medium text-gray-900">Zone d'opération</h4>
              <p className="text-sm text-gray-600">
                Votre organisation opérera dans les provinces sélectionnées.
              </p>
            </div>

            <div className="border-l-4 border-[#6a1754] pl-4">
              <h4 className="font-medium text-gray-900">Documents</h4>
              <p className="text-sm text-gray-600">
                Les documents administratifs seront traités après validation.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Prochaines étapes</h4>
          <p className="text-blue-800 text-sm">
            Après validation de votre inscription, vous recevrez un email de
            confirmation et votre dossier sera transmis pour validation
            administrative. Vous pourrez suivre l'état de votre demande dans la
            section "Vérifier le statut".
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="confirmation"
            className="rounded border-gray-300 text-[#6a1754] focus:ring-[#6a1754]"
          />
          <label htmlFor="confirmation" className="text-sm text-gray-700">
            Je confirme que toutes les informations fournies sont exactes et
            complètes
            <span className="text-[#6a1754]"> *</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RevisionStep;
