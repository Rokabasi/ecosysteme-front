import { LuMapPin } from "react-icons/lu";

const LocaliteStep = () => {
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
          en RDC.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between space-y-3 mb-40">
          <p className="text-base font-medium text-gray-900">
            Province
            <span className="text-[#6a1754]"> *</span>
          </p>
          <textarea
            className="rounded-sm p-2 border border-[#0089CF] outline-0 w-[calc(100%-6rem)]"
            type="text"
            name="province"
            id="province"
            placeholder="Saisissez les noms des villes, les localités ou les villages ici en les séparant par des virgules."
          />
        </div>
      </div>
    </div>
  );
};

export default LocaliteStep;
