import { IoDocumentTextOutline } from "react-icons/io5";
import { useState } from "react";

const IdentificationStepPart2 = () => {
  const domains = [
    "Droits humains",
    "Éducation",
    "Santé",
    "Environnement",
    "Développement communautaire",
    "Agriculture",
    "Microfinance",
    "Protection de l'enfance",
    "Égalité des genres",
    "Gouvernance",
    "Paix et sécurité",
    "Eau et assainissement",
    "Énergie",
    "Technologie et innovation",
    "Culture et patrimoine",
    "Sport et loisirs",
    "Autre",
  ];

  const [selectedDomains, setSelectedDomains] = useState([]);

  const handleDomainToggle = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
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
          Complétez les informations détaillées de votre organisation.
        </p>
      </div>
      <form className="space-y-6">
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Mission de L'organisation
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            name="mission"
            id="mission"
            placeholder="Décrivez la mission de votre organisation en 100 mots maximum..."
          ></textarea>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Nombre d'employés actifs
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="number"
            name="employer"
            id="employer"
            placeholder="Ex : 10"
          />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Domaines d'intervention <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-wrap gap-2 items-center border border-[#0089CF] rounded-lg p-3">
            {domains.map((domain) => (
              <div
                key={domain}
                className="flex items-center space-x-1 p-2 transition-colors cursor-pointer"
                onClick={() => handleDomainToggle(domain)}
              >
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => {}}
                  className="w-4 h-4 text-[#0089CF] border-[#0089CF] rounded pointer-events-none"
                />
                <span className="text-sm font-medium text-gray-900">
                  {domain}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Résultats Opérationnels dans les Domaines d'intervention
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
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

export default IdentificationStepPart2;
