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
      borderColor: "#6a1754",
      border: "2px solid #6a1754",
      boxShadow: "none",
      padding: "4px",
      "&:hover": {
        borderColor: "#6a1754",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6a1754"
        : state.isFocused
        ? "rgba(106, 23, 84, 0.1)"
        : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      padding: "10px",
      ":active": {
        backgroundColor: "rgba(106, 23, 84, 0.2)",
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
        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <LuMapPin className="w-8 h-8 text-[#6a1754]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Province du siège
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Choisissez sur cette liste la province dans laquelle se situe le siège
          de votre organisation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-base font-medium text-gray-900">
            Sélectionnez votre province
            <span className="text-[#6a1754]"> *</span>
          </p>
          <Select
            options={provinces}
            styles={customStyles}
            placeholder="Selectionnez votre province..."
            noOptionsMessage={() => "Aucun résultat trouvé"}
          />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Information importante
          </h4>
          <p className="text-blue-800 text-sm">
            La province du siège déterminera la juridiction principale de votre
            organisation. Assurez-vous de sélectionner la province où se trouve
            votre siège social officiel.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProvinceStep;
