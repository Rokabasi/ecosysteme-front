import { useSelector, useDispatch } from "react-redux";
import { LuMapPin } from "react-icons/lu";
import { getSelectedProvinces } from "../../app/reducers/provinces";
import { getAllLocalites, updateLocalites } from "../../app/reducers/localites";

const LocaliteStep = () => {
  const dispatch = useDispatch();
  const selectedProvinces = useSelector(getSelectedProvinces);
  const localites = useSelector(getAllLocalites);

  const handleLocalitesChange = (provinceId, value) => {
    dispatch(updateLocalites({ provinceId, value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <LuMapPin className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Localités d'opération
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Renseignez les localités, villes ou villages dans lesquels vous opérez
          en RDC pour chaque province sélectionnée.
        </p>
      </div>

      <div className="space-y-6 mb-40">
        {selectedProvinces.map((province) => (
          <div
            key={province.pro_id}
            className="flex flex-col md:flex-row items-start gap-2 mb-4"
          >
            <p className="text-base font-medium text-gray-900 w-full md:w-36">
              {province.pro_designation}{" "}
              <span className="text-[#6a1754]">*</span>
            </p>
            <textarea
              className="flex-1 rounded-sm p-2 border border-[#0089CF] outline-0 w-full"
              placeholder={`Saisissez les localités pour ${province.pro_designation}, séparées par des virgules`}
              value={localites[province.pro_id] || ""}
              onChange={(e) =>
                handleLocalitesChange(province.pro_id, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocaliteStep;
