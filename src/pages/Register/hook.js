import { useState, useMemo } from "react";

export const UseRegisterConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    {
      id: 1,
      title: "Province du siège",
      description: "Sélectionnez votre province",
    },
    {
      id: 2,
      title: "Zones d'opération",
      description: "Provinces d'intervention",
    },
    {
      id: 3,
      title: "Localités",
      description: "Villes et villages",
    },
    {
      id: 4,
      title: "Documents",
      description: "Pièces administratives",
    },
    {
      id: 5,
      title: "Identification",
      description: "Informations organisation",
    },
    {
      id: 6,
      title: "Questionnaire",
      description: "Questions spécifiques",
    },
    {
      id: 7,
      title: "Révision",
      description: "Vérification finale",
    },
  ];

  // Calculer l'état des étapes en fonction de l'étape courante
  const stepsWithState = useMemo(() => {
    return steps.map((step, index) => ({
      ...step,
      isActive: index + 1 === currentStep,
      isCompleted: index + 1 < currentStep,
    }));
  }, [currentStep]);

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

  const updateFormData = (stepData) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const submitForm = () => {
    console.log("Données du formulaire:", formData);
    // Ici vous pouvez ajouter la logique pour envoyer les données au serveur
    alert("Formulaire soumis avec succès !");
  };

  return {
    currentStep,
    nextStep,
    prevStep,
    steps: stepsWithState,
    formData,
    updateFormData,
    submitForm,
  };
};
