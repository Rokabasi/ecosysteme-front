import { IoDocument } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

const DocumentStep = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <IoDocument className="w-8 h-8 text-[#6a1754]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Documents administratifs
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Veuillez joindre vos documents administratifs requis.
        </p>
      </div>
      <div className="max-w-2xl mx-auto space-y-4 mb-40">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <p className="font-medium">
              Statuts notariés de l'ASBL/ONG
              <span className="text-[#6a1754]"> *</span>
            </p>
          </div>
          <label
            htmlFor="file"
            className="flex items-center text-[#6a1754] border border-[#6a1754] px-4 py-1 rounded-lg cursor-pointer hover:bg-[#6a1754] hover:text-white"
          >
            <FiUpload className="w-4 h-4 mr-2" />
            Joindre
          </label>
          <input type="file" name="file" id="file" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default DocumentStep;
