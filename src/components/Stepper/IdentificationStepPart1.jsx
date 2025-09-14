import { IoDocumentTextOutline } from "react-icons/io5";

const IdentificationStepPart1 = () => {
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
          Veuillez remplir les informations de base de votre ONG ou ASBL.
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
            placeholder="Nom de l'ONG ou ASBL"
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Sigle
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              type="text"
              name="sigle"
              id="sigle"
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
              min="1900"
              max={new Date().getFullYear()}
              placeholder="2022"
            />
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
            placeholder="Ex : 23, rue de la paix, Gombe"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Nom complet du représentant légal
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="noms"
            id="noms"
            placeholder="Ex : Jean Dupont"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
           Fonction du représentant légal
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="text"
            name="fonction"
            id="fonction"
            placeholder="Ex : Directeur Général"
          />
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
              placeholder="Ex : +243 999 999 999"
            />
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
              placeholder="Ex : ong@exemple.com"
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Site web
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="url"
            name="site"
            id="site"
            placeholder="Ex : www.ongexemple.cd"
          />
        </div>
      </form>
    </div>
  );
};

export default IdentificationStepPart1;
