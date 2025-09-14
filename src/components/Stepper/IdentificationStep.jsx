import { IoDocumentTextOutline } from "react-icons/io5";

const IdentificationStep = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <IoDocumentTextOutline className="w-8 h-8 text-[#6a1754]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Fiche d'identification
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Veuillez remplir la fiche d'identification de votre ONG ou ASBL.
        </p>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Dénomination
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            type="text"
            name="denomination"
            id="denomination"
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Sigle
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="text"
              name="sigle"
              id="sigle"
            />
          </div>
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Année de création
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="number"
              name="anneeCreation"
              id="anneeCreation"
              min="1900"
              max={new Date().getFullYear()}
              placeholder="Année"
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Adresse du siège sociale
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            type="text"
            name="adresse"
            id="adresse"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Nom et fonction du représentant légal
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            type="text"
            name="NomFonction"
            id="NomFonction"
          />
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Téléphone
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="tel"
              name="telephone"
              id="telephone"
            />
          </div>
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Email
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="email"
              name="email"
              id="email"
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Site web
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            type="url"
            name="site"
            id="site"
            placeholder="Ex : www.fonarev.cd"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Mission de L’organisation
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            name="denomination"
            id="denomination"
            placeholder="Décrivez la mission de votre organisation en 100 mots maximum..."
          ></textarea>
        </div>
        <div className="flex gap-4">
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Nombre d’employés actifs
              <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="number"
              name="employer"
              id="employer"
              placeholder="Ex : 10"
            />
          </div>
          <div className="space-y-1 w-1/2">
            <p className="text-base font-medium text-gray-900">
              Domaines d’intervention <span className="text-[#6a1754]"> *</span>
            </p>
            <input
              className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
              type="text"
              name="domaine"
              id="domaine"
              placeholder="Ex : Droits humains"
            />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Résultats Opérationnels dans les Domaines d’intervention
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#6a1754] outline-0 w-full"
            type="text"
            name="resultat"
            id="resultat"
            placeholder="Décrivez vos réalisations en 150 mots maximum..."
          />
        </div>
      </form>
    </div>
  );
};

export default IdentificationStep;
