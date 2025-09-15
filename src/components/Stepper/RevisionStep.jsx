import { IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getIdentificationFormData } from "../../app/reducers/identification";
import {
  getSelectedProvince,
  getSelectedProvinces,
} from "../../app/reducers/provinces";
import { getSelectedZones } from "../../app/reducers/zones";
import { getLocalitesByProvince } from "../../app/reducers/localites";
import { getAllDocuments } from "../../app/reducers/documents";
import { getAllAnswers } from "../../app/reducers/questions";

const RevisionStep = () => {
  // Récupération des données de toutes les étapes
  const formData = useSelector(getIdentificationFormData);
  const selectedProvince = useSelector(getSelectedProvince);
  const selectedProvinces = useSelector(getSelectedProvinces);
  const selectedZones = useSelector(getSelectedZones);
  const localitesByProvince = useSelector((state) => state.localites.localites);
  // Convertir l'objet localitesByProvince en tableau d'objets avec pro_id et localite
  const selectedLocalites = Object.entries(localitesByProvince).map(
    ([pro_id, localite]) => ({
      pro_id,
      loc_designation: localite,
    })
  );
  const documents = useSelector(getAllDocuments);
  const questions = useSelector(getAllAnswers);

  // Formater la date de création
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Vérifier si une étape a des données
  const hasData = (data) => {
    if (!data) return false;
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === "object") return Object.keys(data).length > 0;
    return !!data;
  };

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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
            Récapitulatif de votre inscription
          </h3>

          {/* 1. Province du siège */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                1
              </span>
              Province du siège
            </h4>
            <div className="pl-8">
              {selectedProvince ? (
                <div className="flex items-center space-x-2">
                  <span className="text-[#6a1754]">•</span>
                  <span className="text-gray-900">
                    {selectedProvince.pro_designation}
                  </span>
                </div>
              ) : (
                <p className="text-gray-500">Aucune province sélectionnée</p>
              )}
            </div>
          </div>

          {/* 2. Zones d'opération */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                2
              </span>
              Zones d'opération
            </h4>
            <div className="pl-8">
              {hasData(selectedProvinces) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedProvinces.map((province) => (
                    <div
                      key={province.pro_id}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-[#6a1754]">•</span>
                      <span className="text-gray-900">
                        {province.pro_designation}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  Aucune zone d'opération sélectionnée
                </p>
              )}
            </div>
          </div>

          {/* 3. Localités */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                3
              </span>
              Localités
            </h4>
            <div className="pl-8">
              {hasData(selectedLocalites) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {selectedLocalites.map((localite, index) => (
                    <div
                      key={localite.pro_id + "-" + index}
                      className="flex items-center space-x-2"
                    >
                      <span className="text-[#6a1754]">•</span>
                      <span className="text-gray-900">
                        {localite.loc_designation}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune localité sélectionnée</p>
              )}
            </div>
          </div>

          {/* 4. Documents */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                4
              </span>
              Documents
            </h4>
            <div className="pl-8">
              {hasData(documents) ? (
                <div className="space-y-2">
                  {Object.entries(documents).map(([docType, doc]) => {
                    if (!doc) return null;
                    const docLabels = {
                      statuts: "Statuts de l'organisation",
                      reglements: "Règlement intérieur",
                      personnalite: "Extrait de personnalité juridique",
                      organigramme: "Organigramme de l'organisation",
                      rapports: "Rapports d'activités",
                      etatsFinanciers: "États financiers",
                      pvAssemblee: "PV d'assemblée générale",
                    };

                    return (
                      <div
                        key={docType}
                        className="flex items-center space-x-2"
                      >
                        <span className="text-[#6a1754]">•</span>
                        <span className="text-gray-900">
                          {docLabels[docType] || docType}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({doc.name || "Document téléchargé"}
                          {doc.size
                            ? `, ${Math.round(doc.size / 1024)} KB`
                            : ""}
                          )
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Aucun document téléversé</p>
              )}
            </div>
          </div>

          {/* 5. Informations de l'organisation */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                5
              </span>
              Informations de l'organisation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-8">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Dénomination
                </p>
                <p className="text-gray-900">
                  {formData.denomination || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sigle</p>
                <p className="text-gray-900">
                  {formData.sigle || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Année de création
                </p>
                <p className="text-gray-900">
                  {formData.anneeCreation || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Adresse</p>
                <p className="text-gray-900">
                  {formData.adresse || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Représentant légal
                </p>
                <p className="text-gray-900">
                  {formData.nomFonction || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                <p className="text-gray-900">
                  {formData.telephone || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-gray-900">
                  {formData.email || "Non renseigné"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Site web</p>
                <p className="text-gray-900">
                  {formData.site || "Non renseigné"}
                </p>
              </div>
            </div>

            {/* Mission et activités */}
            <div className="mt-6 pl-8">
              <h5 className="text-md font-medium text-gray-900 mb-3">
                Mission et activités
              </h5>
              <div className="space-y-4 pl-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mission</p>
                  <p className="text-gray-900 whitespace-pre-line">
                    {formData.mission || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Nombre d'employés
                  </p>
                  <p className="text-gray-900">
                    {formData.nombreEmployes || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Domaines d'intervention
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.domaines && formData.domaines.length > 0 ? (
                      formData.domaines.map((domaine, index) => (
                        <span
                          key={index}
                          className="bg-[#6a1754]/10 text-[#6a1754] text-sm px-3 py-1 rounded-full"
                        >
                          {domaine}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">Aucun domaine sélectionné</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Résultats opérationnels
                  </p>
                  <p className="text-gray-900 whitespace-pre-line">
                    {formData.resultats || "Non renseigné"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Questionnaire */}
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-6 h-6 bg-[#6a1754] text-white rounded-full flex items-center justify-center mr-2">
                6
              </span>
              Réponses au questionnaire
            </h4>
            <div className="pl-8">
              {hasData(questions) ? (
                <div className="space-y-4">
                  {Object.entries(questions).map(([key, value], index) => {
                    // Mapper les clés des questions à des libellés plus lisibles
                    const questionLabels = {
                      priseEnCharge:
                        "Avez-vous déjà pris en charge les victimes des violences sexuelles liées aux conflits ou les victimes des crimes contre la paix et la sécurité de l'humanité ?",
                      occasion: "Si oui, à quelle occasion ?",
                      associationVictimes:
                        "Votre organisation constitue-t-elle une association des victimes ?",
                      infosVictimes:
                        "Disposez-vous d'informations concernant les victimes des violences sexuelles liées aux conflits ou les victimes des crimes contre la paix et la sécurité de l'humanité ?",
                      collaborationFonarev:
                        "Votre organisation est-elle prête à collaborer avec le FONAREV pour assurer la prise en charge des victimes ?",
                      compteBancaire:
                        "Votre organisation dispose-t-elle d'un compte bancaire ?",
                    };

                    // Ne pas afficher la question 'occasion' si la réponse à 'priseEnCharge' n'est pas 'oui'
                    if (
                      key === "occasion" &&
                      questions.priseEnCharge !== "oui"
                    ) {
                      return null;
                    }

                    return (
                      <div
                        key={index}
                        className="border-l-2 border-[#6a1754] pl-4"
                      >
                        <p className="font-medium text-gray-900">
                          {questionLabels[key] || key}
                        </p>
                        <p className="text-gray-700 mt-1">
                          {value || "Aucune réponse"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">Aucune réponse au questionnaire</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionStep;
