import Select from "react-select";
import { LuMapPin } from "react-icons/lu";
import { useState } from "react";

const ZoneStep = () => {
  const provinces = [
    { value: "Kinshasa", label: "Kinshasa" },
    { value: "Kongo Central", label: "Kongo Central" },
    { value: "Sud-Kivu", label: "Sud-Kivu" },
    { value: "Nord-Kivu", label: "Nord-Kivu" },
    { value: "Haut-Katanga", label: "Haut-Katanga" },
    { value: "Bas-Uele", label: "Bas-Uele" },
    { value: "Équateur", label: "Équateur" },
    { value: "Haut-Lomami", label: "Haut-Lomami" },
    { value: "Haut-Uele", label: "Haut-Uele" },
    { value: "Ituri", label: "Ituri" },
    { value: "Kasaï", label: "Kasaï" },
    { value: "Kasaï Central", label: "Kasaï Central" },
    { value: "Kasaï Oriental", label: "Kasaï Oriental" },
    { value: "Kwango", label: "Kwango" },
    { value: "Kwilu", label: "Kwilu" },
    { value: "Lomami", label: "Lomami" },
    { value: "Lualaba", label: "Lualaba" },
    { value: "Mai-Ndombe", label: "Mai-Ndombe" },
    { value: "Maniema", label: "Maniema" },
    { value: "Mongala", label: "Mongala" },
    { value: "Nord-Ubangi", label: "Nord-Ubangi" },
    { value: "Sankuru", label: "Sankuru" },
    { value: "Sud-Ubangi", label: "Sud-Ubangi" },
    { value: "Tanganyika", label: "Tanganyika" },
    { value: "Tshopo", label: "Tshopo" },
    { value: "Tshuapa", label: "Tshuapa" },
  ];

  const [selectedProvinces, setSelectedProvinces] = useState([]);

  const customStyles = {
    control: (provided, state) => ({
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
          Zone d'opération
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Sélectionnez les provinces dans lesquelles votre organisation opère.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3 mb-40">
          <p className="text-base font-medium text-gray-900">
            Sélectionnez la(les) province(s)
            <span className="text-[#6a1754]">*</span>
          </p>
          <Select
            options={provinces}
            styles={customStyles}
            isMulti
            value={selectedProvinces}
            onChange={setSelectedProvinces}
            placeholder="Selectionnez une ou plusieurs provinces..."
            noOptionsMessage={() => "Aucun résultat trouvé"}
            closeMenuOnSelect={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ZoneStep;
