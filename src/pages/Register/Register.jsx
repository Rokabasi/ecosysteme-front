import React from "react";
import { Link } from "react-router-dom";
import { UseRegisterConfig } from "./hook";
import ProvinceStep from "../../components/Stepper/ProvinceStep";
import ZoneStep from "../../components/Stepper/ZoneStep";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const { currentStep, nextStep, prevStep, steps } = UseRegisterConfig();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div></div>;

      case 2:
        return <div></div>;

      case 3:
        return <div></div>;

      case 4:
        const documents = [
          {
            key: "statuts",
            label: "Statuts notariés de l'ASBL/ONG",
            required: true,
          },
          {
            key: "reglements",
            label: "Règlements d'ordre intérieurs",
            required: true,
          },
          {
            key: "personnaliteJuridique",
            label: "Personnalité juridique",
            required: true,
          },
          { key: "organigramme", label: "Organigramme", required: false },
          {
            key: "rapportsActivite",
            label: "Rapports d'activité ou narratifs de 3 dernières années",
            required: true,
          },
          {
            key: "etatsFinanciers",
            label: "États financiers de 3 dernières années",
            required: true,
          },
          {
            key: "pvAssemblee",
            label: "Dernier PV d'Assemblée Générale/Conseil d'Administration",
            required: false,
          },
        ];

        return <div></div>;

      case 5:
        return <div></div>;

      case 6:
        const questions = [
          {
            key: "priseEnChargeVictimes",
            question:
              "Avez-vous déjà pris en charge les victimes des violences sexuelles liées aux conflits ou les victimes des crimes contre la paix et la sécurité de l'humanité ?",
            hasFollowUp: true,
            followUpKey: "occasionPriseEnCharge",
          },
          {
            key: "associationVictimes",
            question:
              "Votre organisation constitue-t-elle une association des victimes ?",
          },
          {
            key: "informationsVictimes",
            question:
              "Disposez-vous d'informations concernant les victimes des violences sexuelles liées aux conflits ou les victimes des crimes contre la paix et la sécurité de l'humanité ?",
          },
          {
            key: "collaborationFonarev",
            question:
              "Votre organisation est-elle prête à collaborer avec le FONAREV pour assurer la prise en charge des victimes des violences sexuelles liées aux conflits ou les victimes des crimes contre la paix et la sécurité de l'humanité ?",
          },
          {
            key: "compteBancaire",
            question:
              "Votre organisation dispose-t-elle d'un compte bancaire ?",
          },
        ];

        return <div></div>;

      case 7:
        return <div></div>;

      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-start bg-[#0f172a] gap-1 w-[280px] h-screen px-5 pt-20">
        {steps.map((step, index) => (
          <div className="flex gap-2" key={index}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={
                  step.isActive
                    ? `flex items-center justify-center bg-[#6a1754] w-8 h-8 rounded-full text-white`
                    : `flex items-center justify-center bg-transparent border border-gray-600 w-8 h-8 rounded-full text-gray-600`
                }
              >
                {step.id}
              </div>
              {index !== steps.length - 1 && (
                <div className="bg-gray-600  h-14 w-[2px]"></div>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={
                  step.isActive
                    ? `font-semibold text-gray-200`
                    : `font-semibold text-gray-600`
                }
              >
                {step.title}
              </div>
              <div
                className={
                  step.isActive
                    ? `text-gray-400 text-sm mt-1`
                    : `text-gray-600 text-sm mt-1`
                }
              >
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white">
        <div className="border-b border-gray-200 bg-white px-8 py-4">
          <Link
            to="/"
            className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="p-8 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#6a1754] mb-2">
                Étape {currentStep} : {steps[currentStep - 1].title}
              </h1>
            </div>

            {/* Step Content */}
            <div className="mb-12">
              {currentStep === 1 && <ProvinceStep />}
              {currentStep === 2 && <ZoneStep />}
              {currentStep > 2 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-gray-400">
                      {currentStep}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {steps[currentStep - 1].title}
                  </h3>
                  <p className="text-gray-600">
                    Contenu de cette étape à implémenter
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                className="flex justify-center py-3 px-4 w-32 border-2 border-[#6a1754] rounded-md shadow-sm text-sm font-medium text-[#6a1754] bg-transparent  hover:bg-[#6a1754] hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#913376]"
              >
                ← Précédent
              </button>

              <button
                onClick={nextStep}
                className="flex justify-center py-3 px-4 w-32 border-2 border-[#6a1754]  rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5c1949] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#913376]"
              >
                Suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
