import Select from "react-select";
import { LuMapPin } from "react-icons/lu";

const ProvinceStep = () => {
  const provinces = [
    { value: "Kinshasa", label: "Kinshasa" },
    { value: "Kongo Central", label: "Kongo Central" },
    { value: "Haut-Katanga", label: "Haut-Katanga" },
    { value: "Kasaï Oriental", label: "Kasaï Oriental" },
  ];

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
          />
        </div>
      </div>
    </div>
  );
};

export default ProvinceStep;
