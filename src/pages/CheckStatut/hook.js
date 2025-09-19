import { useDispatch, useSelector } from "react-redux";
import {
  getProvinces,
  getProvincesError,
  getProvincesLoading,
  getSelectedProvince,
  setSelectedProvince,
  selectAllProvinces,
} from "../../app/reducers/provinces";
import { useEffect } from "react";

export const UseCheckStatut = () => {
  const dispatch = useDispatch();
  const provincesData = useSelector(selectAllProvinces);
  const selectedProvince = useSelector(getSelectedProvince);
  const loading = useSelector(getProvincesLoading);
  const error = useSelector(getProvincesError);

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

  return {
    provincesData,
    provinces,
    selectedProvince,
    setSelectedProvince,
    dispatch,
    loading,
    error,
    customStyles,
  };
};
