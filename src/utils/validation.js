// Utilitaires de validation pour le formulaire d'inscription

export const validateStep = (stepNumber, subStep, state) => {
  switch (stepNumber) {
    case 1:
      return validateProvinceStep(state);
    case 2:
      return validateZoneStep(state);
    case 3:
      return validateLocaliteStep(state);
    case 4:
      return validateDocumentStep(state);
    case 5:
      if (subStep === 1) {
        return validateIdentificationStep1(state);
      } else if (subStep === 2) {
        return validateIdentificationStep2(state);
      }
      return { isValid: true, errors: {}, fieldErrors: {} };
    case 6:
      return validateQuestionStep(state);
    case 7:
      return { isValid: true, errors: {}, fieldErrors: {} }; // Étape de révision, pas de validation
    default:
      return { isValid: true, errors: {}, fieldErrors: {} };
  }
};

// Validation de champ individuel
export const validateField = (fieldName, value, stepNumber, subStep) => {
  switch (stepNumber) {
    case 1:
      if (fieldName === 'selectedProvince') {
        return !value ? "Veuillez sélectionner la province du siège" : null;
      }
      break;
    case 2:
      if (fieldName === 'selectedProvinces') {
        return (!value || value.length === 0) ? "Veuillez sélectionner au moins une province d'opération" : null;
      }
      break;
    case 3:
      // Pour les localités, la validation se fait par province
      return null;
    case 5:
      return validateIdentificationField(fieldName, value, subStep);
    case 6:
      return validateQuestionField(fieldName, value);
  }
  return null;
};

// Validation des champs d'identification
const validateIdentificationField = (fieldName, value, subStep) => {
  const requiredFieldsStep1 = ['denomination', 'anneeCreation', 'adresse', 'nomFonction', 'telephone', 'email'];
  const requiredFieldsStep2 = ['mission', 'nombreEmployes', 'domaines', 'resultats'];
  
  if (subStep === 1 && requiredFieldsStep1.includes(fieldName)) {
    if (!value || value.toString().trim() === "") {
      const fieldNames = {
        denomination: 'Dénomination',
        anneeCreation: 'Année de création',
        adresse: 'Adresse du siège social',
        nomFonction: 'Nom complet du représentant légal',
        telephone: 'Téléphone',
        email: 'Email'
      };
      return `Le champ "${fieldNames[fieldName]}" est obligatoire`;
    }
    
    // Validation spécifique pour l'email
    if (fieldName === 'email' && value && value.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "L'adresse email n'est pas valide";
      }
    }
  }
  
  if (subStep === 2 && requiredFieldsStep2.includes(fieldName)) {
    if (!value || value.toString().trim() === "") {
      const fieldNames = {
        mission: 'Mission de l\'organisation',
        nombreEmployes: 'Nombre d\'employés actifs',
        domaines: 'Domaines d\'intervention',
        resultats: 'Résultats opérationnels'
      };
      return `Le champ "${fieldNames[fieldName]}" est obligatoire`;
    }
  }
  
  return null;
};

// Validation des champs de questions
const validateQuestionField = (fieldName, value) => {
  const requiredQuestions = ['priseEnCharge', 'associationVictimes', 'infosVictimes', 'collaborationFonarev', 'compteBancaire'];
  
  if (requiredQuestions.includes(fieldName)) {
    if (!value || value.toString().trim() === "") {
      const questionNames = {
        priseEnCharge: 'Cette question',
        associationVictimes: 'Cette question',
        infosVictimes: 'Cette question',
        collaborationFonarev: 'Cette question',
        compteBancaire: 'Cette question'
      };
      return `${questionNames[fieldName]} est obligatoire`;
    }
  }
  
  return null;
};

// Validation Étape 1: Province du siège
const validateProvinceStep = (state) => {
  const fieldErrors = {};
  
  if (!state.selectedProvince) {
    fieldErrors.selectedProvince = "Veuillez sélectionner la province du siège";
  }
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 2: Zones d'opération
const validateZoneStep = (state) => {
  const fieldErrors = {};
  
  if (!state.selectedProvinces || state.selectedProvinces.length === 0) {
    fieldErrors.selectedProvinces = "Veuillez sélectionner au moins une province d'opération";
  }
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 3: Localités
const validateLocaliteStep = (state) => {
  const fieldErrors = {};
  
  if (state.selectedProvinces && state.selectedProvinces.length > 0) {
    state.selectedProvinces.forEach(province => {
      const localite = state.localites[province.pro_id];
      if (!localite || localite.trim() === "") {
        fieldErrors[`localite_${province.pro_id}`] = `Veuillez renseigner les localités pour ${province.pro_designation}`;
      }
    });
  }
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 4: Documents
const validateDocumentStep = (state) => {
  const fieldErrors = {};
  const requiredDocuments = [
    { key: 'statuts', name: 'Statuts' },
    { key: 'reglements', name: 'Règlements intérieurs' },
    { key: 'personnalite', name: 'Personnalité juridique' }
  ];
  
  requiredDocuments.forEach(doc => {
    if (!state.documents[doc.key]) {
      fieldErrors[doc.key] = `Le document "${doc.name}" est obligatoire`;
    }
  });
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 5.1: Identification partie 1
const validateIdentificationStep1 = (state) => {
  const fieldErrors = {};
  const requiredFields = [
    { key: 'denomination', name: 'Dénomination' },
    { key: 'anneeCreation', name: 'Année de création' },
    { key: 'adresse', name: 'Adresse du siège social' },
    { key: 'nomFonction', name: 'Nom complet du représentant légal' },
    { key: 'telephone', name: 'Téléphone' },
    { key: 'email', name: 'Email' }
  ];
  
  requiredFields.forEach(field => {
    const value = state.identificationData[field.key];
    if (!value || value.toString().trim() === "") {
      fieldErrors[field.key] = `Le champ "${field.name}" est obligatoire`;
    }
  });
  
  // Validation email
  const email = state.identificationData.email;
  if (email && email.trim() !== "" && !fieldErrors.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      fieldErrors.email = "L'adresse email n'est pas valide";
    }
  }
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 5.2: Identification partie 2
const validateIdentificationStep2 = (state) => {
  const fieldErrors = {};
  const requiredFields = [
    { key: 'mission', name: 'Mission de l\'organisation' },
    { key: 'nombreEmployes', name: 'Nombre d\'employés actifs' },
    { key: 'domaines', name: 'Domaines d\'intervention' },
    { key: 'resultats', name: 'Résultats opérationnels' }
  ];
  
  requiredFields.forEach(field => {
    const value = state.identificationData[field.key];
    if (!value || value.toString().trim() === "") {
      fieldErrors[field.key] = `Le champ "${field.name}" est obligatoire`;
    }
  });
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};

// Validation Étape 6: Questionnaire
const validateQuestionStep = (state) => {
  const fieldErrors = {};
  const requiredQuestions = [
    { key: 'priseEnCharge', name: 'Prise en charge des victimes' },
    { key: 'associationVictimes', name: 'Association des victimes' },
    { key: 'infosVictimes', name: 'Informations sur les victimes' },
    { key: 'collaborationFonarev', name: 'Collaboration avec le FONAREV' },
    { key: 'compteBancaire', name: 'Compte bancaire' }
  ];
  
  requiredQuestions.forEach(question => {
    const answer = state.questionsAnswers[question.key];
    if (!answer || answer.toString().trim() === "") {
      fieldErrors[question.key] = `Cette question est obligatoire`;
    }
  });
  
  // Validation conditionnelle pour "occasion"
  if (state.questionsAnswers.priseEnCharge === "oui") {
    const occasion = state.questionsAnswers.occasion;
    if (!occasion || occasion.trim() === "") {
      fieldErrors.occasion = "Veuillez préciser à quelle occasion vous avez pris en charge les victimes";
    }
  }
  
  return {
    isValid: Object.keys(fieldErrors).length === 0,
    errors: {},
    fieldErrors
  };
};