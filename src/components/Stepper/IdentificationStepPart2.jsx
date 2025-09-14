import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIdentificationFormData, updateField } from "../../app/reducers/identification";
import { selectAllDomaines, selectDomainesLoading, selectDomainesError, fetchDomaines, selectDomainesWithDetails } from "../../app/reducers/domaines";

const IdentificationStepPart2 = () => {
  const dispatch = useDispatch();
  const formData = useSelector(getIdentificationFormData);
  const domainesLabels = useSelector(selectAllDomaines);
  const domainesDetails = useSelector(selectDomainesWithDetails);
  const loading = useSelector(selectDomainesLoading);
  const error = useSelector(selectDomainesError);
  
  // Charger les domaines au montage du composant
  useEffect(() => {
    dispatch(fetchDomaines());
  }, [dispatch]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };
  
  const handleDomainToggle = (domain) => {
    const updatedDomains = formData.domaines
      ? formData.domaines.includes(domain)
        ? formData.domaines.filter(d => d !== domain)
        : [...formData.domaines, domain]
      : [domain];
    
    dispatch(updateField({ field: 'domaines', value: updatedDomains }));
  };
  const selectedDomains = formData.domaines ? [...formData.domaines] : [];
  
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
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Domaines d'intervention <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-wrap gap-2 items-center border border-[#0089CF] rounded-lg p-3">
            {domainesLabels.map((domain, index) => (
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
                <div className="relative group">
                  <span className="text-sm font-medium text-gray-900">
                    {domain}
                  </span>
                  {domainesDetails[index]?.dom_description && (
                    <div className="absolute z-10 hidden group-hover:block w-64 p-2 mt-1 text-xs text-gray-600 bg-white border border-gray-200 rounded shadow-lg">
                      {domainesDetails[index].dom_description}
                    </div>
                  )}
                </div>
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
            name="resultats"
            id="resultats"
            value={formData.resultats || ''}
            onChange={handleChange}
            placeholder="Décrivez vos réalisations en 150 mots maximum..."
          />
        </div>
      </form>
    </div>
  );
};

export default IdentificationStepPart2;
