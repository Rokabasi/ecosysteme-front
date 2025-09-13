import { useState } from "react";

export const UseRegisterConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Province du siège",
      description: "Sélectionnez votre province",
      isActive: true,
    },
    {
      id: 2,
      title: "Zones d'opération",
      description: "Provinces d'intervention",
      isActive: false,
    },
    {
      id: 3,
      title: "Localités",
      description: "Villes et villages",
      isActive: false,
    },
    {
      id: 4,
      title: "Documents",
      description: "Pièces administratives",
      isActive: false,
    },
    {
      id: 5,
      title: "Identification",
      description: "Informations organisation",
      isActive: false,
    },
    {
      id: 6,
      title: "Questionnaire",
      description: "Questions spécifiques",
      isActive: false,
    },
    {
      id: 7,
      title: "Révision",
      description: "Vérification finale",
      isActive: false,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    steps,
  };
};
