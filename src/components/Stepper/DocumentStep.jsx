import { IoDocument } from "react-icons/io5";
import { FiUpload, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllDocuments,
  setDocument,
  removeDocument,
} from "../../app/reducers/documents";
import FieldError from "../FieldError/FieldError";

const DocumentStep = ({ validationErrors = {} }) => {
  const dispatch = useDispatch();
  const documents = useSelector(getAllDocuments);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (documentType, event) => {
    const file = event.target.files[0];
    if (file) {
      // Extraire seulement les informations sérialisables du fichier
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
      };
      dispatch(setDocument({ documentType, file: fileInfo }));
    }
  };

  const handleRemoveFile = (documentType) => {
    dispatch(removeDocument({ documentType }));
  };

  const DocumentItem = ({ documentType, title, isRequired = false }) => {
    const fileInfo = documents[documentType];
    const hasError = validationErrors[documentType];

    return (
      <div className={`flex flex-col p-4 border rounded-lg ${hasError ? 'border-red-300' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-medium">
              {title}
              {isRequired && <span className="text-[#6a1754]"> *</span>}
            </p>
          </div>
          <label
            htmlFor={`file-${documentType}`}
            className="flex items-center text-[#6a1754] border border-[#6a1754] px-4 py-1 rounded-lg cursor-pointer hover:bg-[#6a1754] hover:text-white transition-colors"
          >
            <FiUpload className="w-4 h-4 mr-2" />
            {fileInfo ? "Remplacer" : "Joindre"}
          </label>
          <input
            type="file"
            id={`file-${documentType}`}
            className="hidden"
            onChange={(e) => handleFileChange(documentType, e)}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>

        {fileInfo && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileInfo.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(fileInfo.size)}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFile(documentType)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                title="Supprimer le fichier"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        <FieldError error={validationErrors[documentType]} />
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <IoDocument className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Documents administratifs
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Veuillez joindre vos documents administratifs requis.
        </p>
      </div>
      <div className="max-w-2xl mx-auto space-y-4 mb-40">
        <DocumentItem
          documentType="statuts"
          title="Statuts notariés de l'ASBL/ONG"
          isRequired={true}
        />
        <DocumentItem
          documentType="reglements"
          title="Règlements d'ordre intérieurs"
          isRequired={true}
        />
        <DocumentItem
          documentType="personnalite"
          title="Personnalité juridique"
          isRequired={true}
        />
        <DocumentItem
          documentType="organigramme"
          title="Organigramme"
          isRequired={false}
        />
        <DocumentItem
          documentType="rapports"
          title="Rapports d'activité ou narratifs de 3 dernières années"
          isRequired={true}
        />
        <DocumentItem
          documentType="etatsFinanciers"
          title="États financiers de 3 dernières années"
          isRequired={true}
        />
        <DocumentItem
          documentType="pvAssemblee"
          title="Dernier PV d'Assemblée Générale/Conseil d'Administration"
          isRequired={false}
        />
      </div>
    </div>
  );
};

export default DocumentStep;
