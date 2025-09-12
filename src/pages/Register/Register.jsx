import React from "react";
import { Link } from "react-router-dom";
import { UseRegisterConfig } from "./hook";
import RegisterStep1 from "../../components/Stepper/RegisterStep1";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const { currentStep, nextStep, prevStep, steps, provinces } =
    UseRegisterConfig();

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
    <div className="flex gap-6">
      <div className="flex flex-col items-start justify-center bg-[#0f172a] gap-1 w-[280px] h-screen px-5">
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
      <div className="w-full">
        {currentStep === 1 && <RegisterStep1 />}
        {/* {currentStep === 2 && <RegisterStep2 />}
        {currentStep === 3 && <RegisterStep3 />}
        {currentStep === 4 && <RegisterStep4 />}
        {currentStep === 5 && <RegisterStep5 />}
        {currentStep === 6 && <RegisterStep6 />}
        {currentStep === 7 && <RegisterStep7 />} */}
        <div>
          <button>Précédent</button>
          <button>Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
