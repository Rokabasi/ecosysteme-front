import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdentificationFormData,
  updateField,
} from "../../app/reducers/identification";
import FieldError from "../FieldError/FieldError";

const IdentificationStepPart1 = ({ validationErrors = {}, clearFieldError }) => {
  const dispatch = useDispatch();
  const formData = useSelector(getIdentificationFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation spéciale pour l'année de création
    // if (name === 'anneeCreation') {
    //   // Vérifier que c'est un nombre de 4 chiffres et <= année courante
    //   const currentYear = new Date().getFullYear();
    //   const yearValue = parseInt(value);
      
    //   if (value && (value.length !== 4 || yearValue > currentYear || yearValue < 1000)) {
    //     return; // Ne pas mettre à jour si la validation échoue
    //   }
    // }
    
    // Effacer l'erreur dès que l'utilisateur modifie le champ
    if (clearFieldError) {
      clearFieldError(name);
    }
    dispatch(updateField({ field: name, value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <IoDocumentTextOutline className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Fiche d'identification
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Veuillez remplir les informations d’identification de votre ONG ou ASBL.
        </p>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Dénomination
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="denomination"
            id="denomination"
            value={formData.denomination || ""}
            onChange={handleChange}
            placeholder="Nom de l'ONG ou ASBL"
          />
          <FieldError error={validationErrors.denomination} />
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">Sigle</p>
            <input
              className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              type="text"
              name="sigle"
              id="sigle"
              value={formData.sigle || ""}
              onChange={handleChange}
              placeholder="Sigle de l'ONG ou ASBL"
            />
          </div>
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Année de création
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              type="number"
              name="anneeCreation"
              id="anneeCreation"
              value={formData.anneeCreation || ""}
              onChange={handleChange}
              //min="1900"
              //max={new Date().getFullYear()}
              placeholder="2022"
            />
            <FieldError error={validationErrors.anneeCreation} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Adresse du siège sociale
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="adresse"
            id="adresse"
            value={formData.adresse || ""}
            onChange={handleChange}
            placeholder="Ex : 23, rue de la paix, Gombe"
          />
          <FieldError error={validationErrors.adresse} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Nom complet du représentant légal
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="str_nom_representant_legal"
            id="str_nom_representant_legal"
            value={formData.str_nom_representant_legal || ""}
            onChange={handleChange}
            placeholder="Ex : Jean Dupont"
          />
          <FieldError error={validationErrors.str_nom_representant_legal} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Fonction du représentant légal
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="str_fonction_representant"
            id="str_fonction_representant"
            value={formData.str_fonction_representant || ""}
            onChange={handleChange}
            placeholder="Ex : Directeur Général"
          />
          <FieldError error={validationErrors.str_fonction_representant} />
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Téléphone
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              type="tel"
              name="telephone"
              id="telephone"
              value={formData.telephone || ""}
              onChange={handleChange}
              placeholder="Ex : +243 999 999 999"
            />
            <FieldError error={validationErrors.telephone} />
          </div>
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Email
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              type="email"
              name="email"
              id="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Ex : ong@exemple.com"
            />
            <FieldError error={validationErrors.email} />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">Site web</p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="url"
            name="site"
            id="site"
            value={formData.site || ""}
            onChange={handleChange}
            placeholder="Ex : www.ongexemple.cd"
          />
        </div>
      </form>
    </div>
  );
};

export default IdentificationStepPart1;
