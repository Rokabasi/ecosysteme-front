import { LuMapPin } from "react-icons/lu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProvinces,
  getSelectedProvinces,
  selectAllProvinces,
  toggleSelectedProvince,
} from "../../app/reducers/provinces";
import FieldError from "../FieldError/FieldError";

const ZoneStep = ({ validationErrors = {}, clearFieldError }) => {
  const dispatch = useDispatch();
  const provincesData = useSelector(selectAllProvinces);  
  const selectedProvinces = useSelector(getSelectedProvinces);  

  useEffect(() => {
    if (provincesData.length === 0) {
      dispatch(getProvinces());
    }
  }, [dispatch, provincesData.length]);

  const handleProvinceToggle = (province) => {
    // Effacer l'erreur dès que l'utilisateur modifie le champ
    if (clearFieldError) {
      clearFieldError('selectedProvinces');
    }
    dispatch(toggleSelectedProvince(province));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colonne des provinces */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sélectionnez les provinces dans lesquelles votre organisation opère
            <span className="text-[#6a1754]"> *</span>
          </h3>

          <div className="max-h-96 overflow-y-scroll border border-[#0089CF] rounded-lg p-4 space-y-2">
            {provincesData.map((province) => {
              const isSelected = selectedProvinces.some(
                (p) => p.pro_id === province.pro_id
              );
              return (
                <div
                  key={province.pro_id}
                  className={`flex items-center space-x-3 p-3 border border-[#0089CF] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                    isSelected ? "bg-[#0089CF]/20" : ""
                  }`}
                  onClick={() => handleProvinceToggle(province)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4 text-[#0089CF] border-[#0089CF] rounded cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {province.pro_designation}
                  </span>
                </div>
              );
            })}
          </div>
          <FieldError error={validationErrors.selectedProvinces} />
        </div>

        {/* Colonne des provinces sélectionnées */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            Provinces sélectionnées ({selectedProvinces.length})
          </h3>

          <div className="h-96 overflow-y-scroll border border-[#0089CF] rounded-lg p-4 mt-12">
            {selectedProvinces.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <LuMapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Aucune province sélectionnée</p>
                  <p className="text-sm">
                    Sélectionnez les provinces dans la colonne de gauche
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedProvinces.map((province, index) => (
                  <div
                    key={province.pro_id}
                    className="flex items-center justify-between p-3 bg-[#0089CF]/10 border border-[#0089CF] rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#0089CF] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {province.pro_designation}
                      </span>
                    </div>
                    <button
                      onClick={() => handleProvinceToggle(province)}
                      className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoneStep;
