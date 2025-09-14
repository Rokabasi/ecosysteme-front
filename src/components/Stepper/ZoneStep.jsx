import { LuMapPin } from "react-icons/lu";
import { useState } from "react";

const ZoneStep = () => {
  const provinces = [
    "Kinshasa",
    "Kongo Central",
    "Sud-Kivu",
    "Nord-Kivu",
    "Haut-Katanga",
    "Bas-Uele",
    "Équateur",
    "Haut-Lomami",
    "Haut-Uele",
    "Ituri",
    "Kasaï",
    "Kasaï Central",
    "Kasaï Oriental",
    "Kwango",
    "Kwilu",
    "Lomami",
    "Lualaba",
    "Mai-Ndombe",
    "Maniema",
    "Mongala",
    "Nord-Ubangi",
    "Sankuru",
    "Sud-Ubangi",
    "Tanganyika",
    "Tshopo",
    "Tshuapa",
  ];

  const [selectedProvinces, setSelectedProvinces] = useState([]);

  const handleProvinceToggle = (province) => {
    setSelectedProvinces((prev) =>
      prev.includes(province)
        ? prev.filter((p) => p !== province)
        : [...prev, province]
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <LuMapPin className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Zone d'opération
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Sélectionnez les provinces dans lesquelles votre organisation opère.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section de sélection des provinces */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sélectionnez la(les) province(s)
            <span className="text-[#6a1754]"> *</span>
          </h3>

          <div className="max-h-96 overflow-y-scroll border border-[#0089CF] rounded-lg p-4 space-y-2">
            {provinces.map((province) => (
              <div
                key={province}
                className="flex items-center space-x-3 p-3 border border-[#0089CF] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleProvinceToggle(province)}
              >
                <input
                  type="checkbox"
                  checked={selectedProvinces.includes(province)}
                  onChange={() => handleProvinceToggle(province)}
                  className="w-4 h-4 text-[#0089CF] border-[#0089CF] rounded focus:ring-[#0089CF] focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-900">
                  {province}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section d'affichage des provinces sélectionnées */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Provinces sélectionnées ({selectedProvinces.length})
          </h3>

          <div className="h-96 overflow-y-scroll border border-[#0089CF] rounded-lg p-4">
            {selectedProvinces.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <LuMapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Aucune province sélectionnée</p>
                  <p className="text-sm">
                    Sélectionnez des provinces dans la colonne de gauche
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedProvinces.map((province, index) => (
                  <div
                    key={province}
                    className="flex items-center justify-between p-3 bg-[#0089CF]/10 border border-[#0089CF] rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-[#0089CF] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {province}
                      </span>
                    </div>
                    <button
                      onClick={() => handleProvinceToggle(province)}
                      className="text-red-500 hover:text-red-700 transition-colors"
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
