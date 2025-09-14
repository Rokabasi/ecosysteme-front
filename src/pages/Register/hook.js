import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { clearAllDocuments } from "../../app/reducers/documents";
import { clearProvinces } from "../../app/reducers/provinces";
import { clearZones } from "../../app/reducers/zones";
import { clearLocalites } from "../../app/reducers/localites";
import { clearAnswers } from "../../app/reducers/questions";

export const UseRegisterConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [formData, setFormData] = useState({});

  const steps = [
    {
      id: 1,
      title: "Province du siège",
      description: "Sélectionnez votre province",
      hasSubSteps: false,
    },
    {
      id: 2,
      title: "Zones d'opération",
      description: "Provinces d'intervention",
      hasSubSteps: false,
    },
    {
      id: 3,
      title: "Localités",
      description: "Villes et villages",
      hasSubSteps: false,
    },
    {
      id: 4,
      title: "Documents",
      description: "Pièces administratives",
      hasSubSteps: false,
    },
    {
      id: 5,
      title: "Identification",
      description: "Informations organisation",
      hasSubSteps: true,
      subSteps: [
        { id: 1, title: "Informations de base" },
        { id: 2, title: "Mission et activités" },
      ],
    },
    {
      id: 6,
      title: "Questionnaire",
      description: "Questions spécifiques",
      hasSubSteps: false,
    },
    {
      id: 7,
      title: "Révision",
      description: "Vérification finale",
      hasSubSteps: false,
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
    const currentStepData = steps[currentStep - 1];

    if (currentStepData.hasSubSteps) {
      // Si l'étape courante a des sous-étapes
      if (currentSubStep < currentStepData.subSteps.length) {
        // Passer à la sous-étape suivante
        setCurrentSubStep(currentSubStep + 1);
      } else {
        // Passer à l'étape suivante et réinitialiser la sous-étape
        if (currentStep < steps.length) {
          setCurrentStep(currentStep + 1);
          setCurrentSubStep(1);
        }
      }
    } else {
      // Si l'étape courante n'a pas de sous-étapes
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    const currentStepData = steps[currentStep - 1];

    if (currentStepData.hasSubSteps) {
      // Si l'étape courante a des sous-étapes
      if (currentSubStep > 1) {
        // Revenir à la sous-étape précédente
        setCurrentSubStep(currentSubStep - 1);
      } else {
        // Revenir à l'étape précédente
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
          const prevStepData = steps[currentStep - 2];
          if (prevStepData.hasSubSteps) {
            setCurrentSubStep(prevStepData.subSteps.length);
          } else {
            setCurrentSubStep(1);
          }
        }
      }
    } else {
      // Si l'étape courante n'a pas de sous-étapes
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
        const prevStepData = steps[currentStep - 2];
        if (prevStepData.hasSubSteps) {
          setCurrentSubStep(prevStepData.subSteps.length);
        } else {
          setCurrentSubStep(1);
        }
      }
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

  const dispatch = useDispatch();

  const resetForm = () => {
    // Réinitialiser l'état local
    setCurrentStep(1);
    setCurrentSubStep(1);
    setFormData({});
    
    // Réinitialiser les états Redux
    dispatch(clearAllDocuments());
    dispatch(clearProvinces());
    dispatch(clearZones());
    dispatch(clearLocalites());
    dispatch(clearAnswers());
  };

  return {
    currentStep,
    currentSubStep,
    nextStep,
    prevStep,
    steps: stepsWithState,
    formData,
    updateFormData,
    submitForm,
    resetForm,
  };
};
