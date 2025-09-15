import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllDocuments, getAllDocuments } from "../../app/reducers/documents";
import { clearProvinces, getSelectedProvince, getSelectedProvinces } from "../../app/reducers/provinces";
import { clearZones, getSelectedZones } from "../../app/reducers/zones";
import { clearLocalites, getAllLocalites } from "../../app/reducers/localites";
import { clearAnswers, getAllAnswers } from "../../app/reducers/questions";
import { clearFormData, getIdentificationFormData } from "../../app/reducers/identification";
import { validateStep } from "../../utils/validation";
import { formatSubmissionData, validateSubmissionData } from "../../utils/dataFormatter";

export const UseRegisterConfig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  
  // Sélecteurs pour vérifier si des données ont été saisies
  const selectedProvince = useSelector(getSelectedProvince);
  const selectedProvinces = useSelector(getSelectedProvinces);
  const selectedZones = useSelector(getSelectedZones);
  const localites = useSelector(getAllLocalites);
  const documents = useSelector(getAllDocuments);
  const identificationData = useSelector(getIdentificationFormData);
  const questionsAnswers = useSelector(getAllAnswers);

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
    // Valider l'étape courante avant de passer à la suivante
    const currentState = {
      selectedProvince,
      selectedProvinces,
      selectedZones,
      localites,
      documents,
      identificationData,
      questionsAnswers,
      formData
    };

    const validation = validateStep(currentStep, currentSubStep, currentState);
    
    if (!validation.isValid) {
      setValidationErrors(validation.fieldErrors);
      return; // Empêcher la navigation si la validation échoue
    }

    // Effacer les erreurs si la validation réussit
    setValidationErrors({});

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
    // Préparer les données pour le formatage
    const rawData = {
      selectedProvince,
      selectedProvinces,
      localites,
      identificationData,
      questionsAnswers
    };

    // Formater les données selon la structure demandée
    const submissionData = formatSubmissionData(rawData);
    
    // Valider les données avant soumission
    const validation = validateSubmissionData(submissionData);
    
    if (!validation.isValid) {
      console.error("Erreurs de validation:", validation.errors);
      alert("Erreur: " + validation.errors.join(", "));
      return;
    }

    console.log("Données structurées pour soumission:", submissionData);
    
    // Ici vous pouvez ajouter la logique pour envoyer les données au serveur
    // Par exemple:
    // try {
    //   const response = await fetch('/api/submit-registration', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(submissionData),
    //   });
    //   
    //   if (response.ok) {
    //     alert("Formulaire soumis avec succès !");
    //     resetForm();
    //   } else {
    //     alert("Erreur lors de la soumission du formulaire");
    //   }
    // } catch (error) {
    //   console.error('Erreur:', error);
    //   alert("Erreur lors de la soumission du formulaire");
    // }
    
    alert("Formulaire soumis avec succès !");
  };

  // Fonction pour vérifier si le formulaire contient des données
  const hasFormData = () => {
    // Vérifier les provinces
    const hasProvinceData = selectedProvince !== null || selectedProvinces.length > 0;
    
    // Vérifier les zones
    const hasZoneData = selectedZones.length > 0;
    
    // Vérifier les localités
    const hasLocaliteData = Object.keys(localites).length > 0 && 
      Object.values(localites).some(value => value && value.trim() !== "");
    
    // Vérifier les documents
    const hasDocumentData = Object.values(documents).some(doc => doc !== null);
    
    // Vérifier les données d'identification
    const hasIdentificationData = Object.values(identificationData).some(value => 
      value && value.toString().trim() !== ""
    );
    
    // Vérifier les réponses aux questions
    const hasQuestionData = Object.values(questionsAnswers).some(answer => 
      answer && answer.toString().trim() !== ""
    );
    
    // Vérifier si on a avancé dans les étapes
    const hasStepProgress = currentStep > 1 || (currentStep === 1 && currentSubStep > 1);
    
    // Vérifier les données locales du hook
    const hasLocalFormData = Object.keys(formData).length > 0;

    return (
      hasProvinceData ||
      hasZoneData ||
      hasLocaliteData ||
      hasDocumentData ||
      hasIdentificationData ||
      hasQuestionData ||
      hasStepProgress ||
      hasLocalFormData
    );
  };

  // Fonction pour gérer le clic sur "Retour à l'accueil"
  const handleBackToHome = () => {
    if (hasFormData()) {
      setShowConfirmModal(true);
    } else {
      resetForm();
      return true; // Permet la navigation
    }
    return false; // Empêche la navigation
  };

  // Fonction pour confirmer l'abandon
  const confirmAbandon = () => {
    setShowConfirmModal(false);
    resetForm();
    return true; // Permet la navigation
  };

  // Fonction pour continuer l'inscription
  const continueRegistration = () => {
    setShowConfirmModal(false);
  };

  const resetForm = () => {
    // Réinitialiser l'état local
    setCurrentStep(1);
    setCurrentSubStep(1);
    setFormData({});
    setValidationErrors({});

    // Réinitialiser les états Redux
    dispatch(clearAllDocuments());
    dispatch(clearProvinces());
    dispatch(clearZones());
    dispatch(clearLocalites());
    dispatch(clearAnswers());
    dispatch(clearFormData());
  };

  // Fonction pour effacer l'erreur d'un champ spécifique quand il est modifié
  const clearFieldError = (fieldName) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
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
    showConfirmModal,
    handleBackToHome,
    confirmAbandon,
    continueRegistration,
    hasFormData,
    validationErrors,
    setValidationErrors,
    clearFieldError,
    // Données pour la validation finale et la soumission
    selectedProvince,
    selectedProvinces,
    selectedZones,
    localites,
    documents,
    identificationData,
    questionsAnswers,
  };
};
