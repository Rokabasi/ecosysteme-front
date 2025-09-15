import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIdentificationFormData, updateField } from "../../app/reducers/identification";
import { selectDomainesLoading, selectDomainesError, fetchDomaines, selectDomainesWithDetails } from "../../app/reducers/domaines";
import FieldError from "../FieldError/FieldError";

const IdentificationStepPart2 = ({ validationErrors = {}, clearFieldError }) => {
  const dispatch = useDispatch();
  const formData = useSelector(getIdentificationFormData);
  const domainesDetails = useSelector(selectDomainesWithDetails);
  const loading = useSelector(selectDomainesLoading);
  const error = useSelector(selectDomainesError);
  
  // Charger les domaines au montage du composant
  useEffect(() => {
    dispatch(fetchDomaines());
  }, [dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation du nombre de mots pour mission et resultats
    if (name === 'mission') {
      const words = value.trim() === '' ? [] : value.trim().split(/\s+/);
      if (words.length > 100) return; // Bloquer si plus de 100 mots
    }
    
    if (name === 'resultats') {
      const words = value.trim() === '' ? [] : value.trim().split(/\s+/);
      if (words.length > 150) return; // Bloquer si plus de 150 mots
    }
    
    // Effacer l'erreur dès que l'utilisateur modifie le champ
    if (clearFieldError) {
      clearFieldError(name);
    }
    dispatch(updateField({ field: name, value }));
  };
  
  // Fonction pour compter les mots
  const getWordCount = (text) => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const handleDomainToggle = (domainId) => {
    if (clearFieldError) {
      clearFieldError('domaines');
    }
    
    const currentDomains = formData.domaines || [];
    const updatedDomains = currentDomains.includes(domainId)
      ? currentDomains.filter(id => id !== domainId)
      : [...currentDomains, domainId];
      
    dispatch(updateField({ field: 'domaines', value: updatedDomains }));
  };

  const selectedDomains = formData.domaines || [];
  
  if (loading) return <div>Chargement des domaines d'intervention...</div>;
  if (error) return <div className="text-red-500">Erreur lors du chargement des domaines: {error}</div>;
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
            value={formData.mission || ''}
            onChange={handleChange}
          ></textarea>
          <div className="text-sm text-gray-500 text-right">
            {getWordCount(formData.mission || '')}/100 mots
          </div>
          <FieldError error={validationErrors.mission} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Nombre d'employés actifs
            <span className="text-[#6a1754]"> *</span>
          </p>
          <input
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            type="number"
            name="nombreEmployes"
            id="nombreEmployes"
            value={formData.nombreEmployes || ''}
            onChange={handleChange}
            placeholder="Ex : 10"
          />
          <FieldError error={validationErrors.nombreEmployes} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Domaines d'intervention <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-wrap gap-2 items-center border border-[#0089CF] rounded-lg p-3">
            {domainesDetails.map((domain) => (
              <div
                key={domain.dom_id}
                className="flex items-center space-x-1 p-2 transition-colors cursor-pointer"
                onClick={() => handleDomainToggle(domain.dom_id)}
              >
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain.dom_id)}
                  readOnly
                  className="w-4 h-4 text-[#0089CF] border-[#0089CF] rounded pointer-events-none"
                />
                <span className="text-sm font-medium text-gray-900">
                  {domain.dom_designation}
                </span>
              </div>
            ))}
          </div>
          <FieldError error={validationErrors.domaines} />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Résultats Opérationnels dans les Domaines d'intervention
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
            name="resultats"
            id="resultats"
            value={formData.resultats || ''}
            onChange={handleChange}
            placeholder="Décrivez vos réalisations en 150 mots maximum..."
          />
          <div className="text-sm text-gray-500 text-right">
            {getWordCount(formData.resultats || '')}/150 mots
          </div>
          <FieldError error={validationErrors.resultats} />
        </div>
      </form>
    </div>
  );
};

export default IdentificationStepPart2;
