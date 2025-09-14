import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { LuMapPin } from "react-icons/lu";
import {
  getProvinces,
  getProvincesError,
  getProvincesLoading,
  selectAllProvinces,
  getSelectedProvince,
  setSelectedProvince,
} from "../../app/reducers/provinces";

const ProvinceStep = () => {
  const dispatch = useDispatch();
  const provincesData = useSelector(selectAllProvinces);
  const loading = useSelector(getProvincesLoading);
  const error = useSelector(getProvincesError);
  const selectedProvince = useSelector(getSelectedProvince); // récupère la sélection

  useEffect(() => {
    dispatch(getProvinces());
  }, [dispatch]);

  const provinces = provincesData.map((province) => ({
    value: province.pro_id,
    label: province.pro_designation,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      borderColor: "#0089CF",
      border: "1px solid #0089CF",
      boxShadow: "none",
      padding: "4px",
      "&:hover": {
        borderColor: "#0089CF",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#0089CF"
        : state.isFocused
        ? "rgba(0, 137, 207, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      padding: "10px",
      ":active": {
        backgroundColor: "rgba(0, 137, 207, 0.2)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "12px",
      overflow: "hidden",
    }),
  };

  if (loading) return <p>Chargement des provinces...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <LuMapPin className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Province du siège
        </h2>
      </div>

      <div className="space-y-6 mb-40">
        <div className="space-y-3">
          <p className="text-base font-medium text-gray-900">
            Choisissez la province dans laquelle se situe votre siège
            <span className="text-[#6a1754]"> *</span>
          </p>
          <Select
            options={provinces}
            styles={customStyles}
            placeholder="Selectionnez votre province..."
            noOptionsMessage={() => "Aucun résultat trouvé"}
            value={
              selectedProvince
                ? {
                    value: selectedProvince.pro_id,
                    label: selectedProvince.pro_designation,
                  }
                : null
            }
            onChange={(option) => {
              if (option) {
                const province = provincesData.find(
                  (p) => p.pro_id === option.value
                );
                dispatch(setSelectedProvince(province));
              } else {
                // L'utilisateur a effacé la sélection
                dispatch(setSelectedProvince(null));
              }
            }}
            isClearable
          />
        </div>
      </div>
    </div>
  );
};

export default ProvinceStep;
