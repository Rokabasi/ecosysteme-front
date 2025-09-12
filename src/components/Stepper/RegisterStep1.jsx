import Select from "react-select";

const RegisterStep1 = () => {
  const options = [
    { value: "Kinshasa", label: "Kinshasa" },
    { value: "Kongo Central", label: "Kongo Central" },
    { value: "Haut-Katanga", label: "Haut-Katanga" },
    { value: "Kasaï Oriental", label: "Kasaï Oriental" },
  ];

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
    <div className="flex flex-col gap-4 px-4 mt-20">
      <h2 className="text-2xl text-[#6a1754] font-semibold mb-20">Étape 1 : Province du siège</h2>
      <p className="text-lg">
        Choisissez sur cette liste la province dans laquelle se situe le siège
        de votre organisation.
      </p>
      <Select options={options} styles={customStyles} />
    </div>
  );
};

export default RegisterStep1;
