// Utilitaire pour formater les données de soumission du formulaire d'inscription

// Convertir les réponses "oui"/"non" en booléens
const convertToBool = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'string') {
        return value.toLowerCase() === 'oui';
    }
    return false;
};

export const formatSubmissionData = (data) => {
    const {
        selectedProvince,
        selectedProvinces,
        localites,
        identificationData,
        questionsAnswers
    } = data;

    const payload = {
        // Structure data - Informations de base de l'organisation
        str_designation: identificationData.denomination || "",
        str_annee_creation: identificationData.anneeCreation || "",
        str_adresse_siege_sociale: identificationData.adresse || "",
        str_nom_representant_legal: identificationData.str_nom_representant_legal || "",
        str_fonction_representant: identificationData.str_fonction_representant || "",
        str_telephone: identificationData.telephone || "",
        str_email: identificationData.email || "",
        str_site_web: identificationData.site || "",
        str_mission: identificationData.mission || "",
        str_nombre_employe_actif: parseInt(identificationData.nombreEmployes) || 0,
        str_resultat_operationel: identificationData.resultats || "",

        // Questions responses - Réponses au questionnaire (booléens)
        sres_prise_en_charge: convertToBool(questionsAnswers.priseEnCharge),
        sres_prise_en_charge_description: questionsAnswers.occasion || "",
        sres_is_association_victime: convertToBool(questionsAnswers.associationVictimes),
        // sres_is_association_victime_description sera ajouté conditionnellement plus bas
        sres_infos_victime_sexuel: convertToBool(questionsAnswers.infosVictimes),
        sres_pret_a_collaborer: convertToBool(questionsAnswers.collaborationFonarev),
        sres_a_compte_bancaire: convertToBool(questionsAnswers.compteBancaire),

        // Related data - Données relationnelles
        str_province_siege_sociale: selectedProvince?.pro_designation || null,
        provinces: formatProvinces(selectedProvince, selectedProvinces),
        localites: formatLocalites(localites),
        domaines: formatDomaines(identificationData.domaines)
    };

    // Ajouter conditionnellement str_sigle si non vide
    if (identificationData.sigle && String(identificationData.sigle).trim() !== "") {
        payload.str_sigle = identificationData.sigle;
    }

    // Ajouter conditionnellement sres_is_association_victime_description si non vide
    if (questionsAnswers.associationVictimesDescription && String(questionsAnswers.associationVictimesDescription).trim() !== "") {
        payload.sres_is_association_victime_description = questionsAnswers.associationVictimesDescription;
    }

    return payload;
};

// Formater les provinces (seulement les provinces d'opération, pas le siège)
const formatProvinces = (selectedProvince, selectedProvinces) => {
    const provinceIds = [];

    // Ajouter seulement les provinces d'opération
    if (selectedProvinces && Array.isArray(selectedProvinces)) {
        selectedProvinces.forEach(province => {
            if (province.pro_id && !provinceIds.includes(province.pro_id)) {
                provinceIds.push(province.pro_id);
            }
        });
    }

    return provinceIds;
};

// Formater les localités: transformer l'objet brut { [uuid|id]: "a,b" } en
// tableau [{ pro_id: <uuid|id>, localite: ["a","b"] }]
const formatLocalites = (localites) => {
    if (!localites || typeof localites !== 'object') {
        return [];
    }

    return Object.entries(localites)
        .map(([key, rawValue]) => {
            if (!rawValue || typeof rawValue !== 'string') return null;

            const localiteArray = rawValue
                .split(/[,;\n]/)
                .map((item) => item.trim())
                .filter((item) => item !== "");

            if (localiteArray.length === 0) return null;

            return {
                pro_id: key, // garde la clé telle quelle (UUID ou ID)
                localite: localiteArray,
            };
        })
        .filter((item) => item !== null);
};

// Formater les domaines
const formatDomaines = (domaines) => {
    if (!domaines) {
        return [];
    }

    if (Array.isArray(domaines)) {
        return domaines.filter(domain => domain && domain.trim() !== "");
    }

    if (typeof domaines === 'string') {
        return domaines.trim() !== "" ? [domaines] : [];
    }

    return [];
};

// Valider les données avant soumission
export const validateSubmissionData = (data) => {
    const errors = [];

    // Vérifications obligatoires
    if (!data.str_designation) errors.push("Dénomination manquante");
    if (!data.str_annee_creation) errors.push("Année de création manquante");
    if (!data.str_adresse_siege_sociale) errors.push("Adresse du siège manquante");
    if (!data.str_nom_representant_legal) errors.push("Nom du représentant légal manquant");
    if (!data.str_fonction_representant) errors.push("Fonction du représentant légal manquante");
    if (!data.str_telephone) errors.push("Téléphone manquant");
    if (!data.str_email) errors.push("Email manquant");
    if (!data.str_mission) errors.push("Mission manquante");
    if (!data.str_nombre_employe_actif) errors.push("Nombre d'employés manquant");
    if (!data.str_resultat_operationel) errors.push("Résultats opérationnels manquants");

    // Vérifications des réponses aux questions
    
    if (data.sres_prise_en_charge == null ) errors.push("Réponse à la question sur la prise en charge manquante");
    if (data.sres_is_association_victime == null) errors.push("Réponse à la question sur l'association des victimes manquante");
    if (data.sres_infos_victime_sexuel == null) errors.push("Réponse à la question sur les informations des victimes manquante");
    if (data.sres_pret_a_collaborer == null) errors.push("Réponse à la question sur la collaboration manquante");
    if (data.sres_a_compte_bancaire = null) errors.push("Réponse à la question sur le compte bancaire manquante");

    // Vérifications des données relationnelles
    if (!data.provinces || data.provinces.length === 0) errors.push("Aucune province sélectionnée");
    const hasFormattedLocalites = Array.isArray(data.localites) && data.localites.length > 0;
    const hasRawLocalites = data.localitesByProvince && typeof data.localitesByProvince === 'object'
        ? Object.values(data.localitesByProvince).some((v) => typeof v === 'string' && v.trim() !== "")
        : false;
    if (!hasFormattedLocalites && !hasRawLocalites) errors.push("Aucune localité renseignée");
    if (!data.domaines || data.domaines.length === 0) errors.push("Aucun domaine d'intervention sélectionné");

    return {
        isValid: errors.length === 0,
        errors
    };
};