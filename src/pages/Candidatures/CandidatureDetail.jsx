import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiPhone, FiMapPin, FiCalendar, FiUser, FiFileText, FiUsers, FiTarget } from 'react-icons/fi';

// Données de test pour la candidature
const mockCandidature = {
  "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
  "str_designation": "UBABANK RDC",
  "str_sigle": "UBA",
  "str_annee_creation": "2025",
  "str_adresse_siege_sociale": "avenue colonel mondjiba gombe",
  "str_province_siege_sociale": "Kivu",
  "str_nom_representant_legal": "KABASI ROMAIN",
  "str_fonction_representant": "Directeur général",
  "str_telephone": "+243819600518",
  "str_email": "kabasiromain@gmail.com",
  "str_site_web": "www.mazaya.com",
  "str_mission": "Mission non encore determinée",
  "str_nombre_employe_actif": 12,
  "str_resultat_operationel": "Beaucoup de resultat en attente",
  "str_niveau_risque": null,
  "str_statut": "soumis",
  "str_statut_verification": "soumis",
  "str_is_reset": null,
  "str_is_affected": null,
  "createdAt": "2025-09-15T18:53:24.000Z",
  "updatedAt": "2025-09-15T18:53:24.000Z",
  "Province_structures": [
    {
      "pstr_id": "54a2990c-4344-45c5-8c9e-bd73820b421d",
      "pro_id": "1a8a510a-c012-47ac-b6b7-1c042610b6e8",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "Province": {
        "pro_designation": "Nord-Kivu"
      },
      "Localite_operationnelles": [
        {
          "loc_id": "991f4747-6a4e-4c0a-97b5-73c72748945e",
          "pstr_id": "54a2990c-4344-45c5-8c9e-bd73820b421d",
          "loc_designation": "Goma"
        }
      ]
    },
    {
      "pstr_id": "e4dfa839-66de-4b85-af6d-5c2912b5875b",
      "pro_id": "13077a32-da28-4408-b4f3-8aa2ba1f9fa6",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "Province": {
        "pro_designation": "Sud-Kivu"
      },
      "Localite_operationnelles": [
        {
          "loc_id": "2b510fd0-223a-4028-8d20-45e71550fc46",
          "pstr_id": "e4dfa839-66de-4b85-af6d-5c2912b5875b",
          "loc_designation": "bunia"
        },
        {
          "loc_id": "53c0df80-3feb-45e8-a554-f50a8532d2fe",
          "pstr_id": "e4dfa839-66de-4b85-af6d-5c2912b5875b",
          "loc_designation": "Bukavu"
        }
      ]
    }
  ],
  "Domaine_structures": [
    {
      "dos_id": "22fa391f-513c-48f2-8a04-9602e5815ca2",
      "dom_id": "04c73ff9-a748-428f-94b4-36a91772c584",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "Domaine": {
        "dom_designation": "Éducation à la paix"
      }
    },
    {
      "dos_id": "e4b6f60a-285b-48ac-baf7-0c10a420d263",
      "dom_id": "6ec143fe-2a2a-4aff-b7cf-8aa38b0fdb8c",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "Domaine": {
        "dom_designation": "Lutte contre les VBG"
      }
    }
  ],
  "Documents": [
    {
      "doc_id": "4f265311-792c-4790-a6db-45ad739fabdb",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "doc_path": "C:\\Users\\pc\\Documents\\web_prod\\Ecosysteme\\Ecosysteme-back\\public\\documents\\Doc_10e061d3142.pdf",
      "doc_name": "Doc_10e061d3142.pdf",
      "doc_size": "80753",
      "doc_designation": "Règlement d'ordre intérieurs"
    },
    {
      "doc_id": "575fa902-dc55-4448-9b9f-17e3a4ad7ed1",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "doc_path": "C:\\Users\\pc\\Documents\\web_prod\\Ecosysteme\\Ecosysteme-back\\public\\documents\\Doc_d4b6745f77.pdf",
      "doc_name": "Doc_d4b6745f77.pdf",
      "doc_size": "80753",
      "doc_designation": "Statuts notariés de l'ASBL/ONG"
    },
    {
      "doc_id": "e20a2f29-d10e-41b7-b401-bc561f1fb266",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "doc_path": "C:\\Users\\pc\\Documents\\web_prod\\Ecosysteme\\Ecosysteme-back\\public\\documents\\Doc_4c0f8d6629.pdf",
      "doc_name": "Doc_4c0f8d6629.pdf",
      "doc_size": "80753",
      "doc_designation": "Organigramme"
    },
    {
      "doc_id": "eba14142-5a08-43aa-a04a-87c3239c32a1",
      "str_id": "588ac48d-9aa5-4190-80fb-02af99ab542d",
      "doc_path": "C:\\Users\\pc\\Documents\\web_prod\\Ecosysteme\\Ecosysteme-back\\public\\documents\\Doc_1436566e1d1.pdf",
      "doc_name": "Doc_1436566e1d1.pdf",
      "doc_size": "80753",
      "doc_designation": "Personnalité juridique"
    }
  ]
};

const CandidatureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidature = mockCandidature; // Utiliser les données de test

  if (!candidature) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucune candidature trouvée avec l'identifiant : {id}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => navigate('/admin/candidatures')}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    
    const statusClasses = {
      'soumis': 'bg-blue-100 text-blue-800',
      'approuve': 'bg-green-100 text-green-800',
      'rejete': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    
    const statusClass = statusClasses[status] || statusClasses['default'];
    
    return (
      <span className={`${baseClasses} ${statusClass}`}>
        {status === 'soumis' ? 'Soumis' : status}
      </span>
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/admin/candidatures')}
            className="flex cursor-pointer items-center px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Retour à la liste
          </button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{candidature.str_designation}</h1>
            <div className="flex items-center space-x-3">
              {getStatusBadge(candidature.str_statut)}
              <span className="text-sm text-gray-500">
                Soumis le {new Date(candidature.createdAt).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations générales */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiUser className="mr-3 h-5 w-5 text-[#6a1754]" />
                Informations générales
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Dénomination</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{candidature.str_designation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sigle</label>
                  <p className="mt-1 text-gray-900">{candidature.str_sigle || 'Non renseigné'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Année de création</label>
                  <p className="mt-1 text-gray-900 flex items-center">
                    <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                    {candidature.str_annee_creation}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre d'employés</label>
                  <p className="mt-1 text-gray-900 flex items-center">
                    <FiUsers className="mr-2 h-4 w-4 text-gray-400" />
                    {candidature.str_nombre_employe_actif}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact et localisation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiMapPin className="mr-3 h-5 w-5 text-[#6a1754]" />
                Contact et localisation
              </h2>
              <div className="space-y-4">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Province du siège social</label>
                    <p className="mt-1 text-gray-900">{candidature.str_province_siege_sociale}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Adresse du siège social</label>
                    <p className="mt-1 text-gray-900">{candidature.str_adresse_siege_sociale}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Téléphone</label>
                    <p className="mt-1 text-gray-900 flex items-center">
                      <FiPhone className="mr-2 h-4 w-4 text-gray-400" />
                      {candidature.str_telephone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="mt-1 text-blue-600 flex items-center">
                      <FiMail className="mr-2 h-4 w-4 text-gray-400" />
                      <a href={`mailto:${candidature.str_email}`} className="hover:underline">
                        {candidature.str_email}
                      </a>
                    </p>
                  </div>
                </div>
                {candidature.str_site_web && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Site web</label>
                    <p className="mt-1 text-blue-600">
                      <a href={`http://${candidature.str_site_web}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {candidature.str_site_web}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Mission et résultats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiTarget className="mr-3 h-5 w-5 text-[#6a1754]" />
                Mission et résultats
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Mission de l'organisation</label>
                  <p className="mt-2 text-gray-900 leading-relaxed">{candidature.str_mission}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Résultats opérationnels</label>
                  <p className="mt-2 text-gray-900 leading-relaxed">{candidature.str_resultat_operationel}</p>
                </div>
              </div>
            </div>

            {/* Zones d'intervention */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Zones d'intervention</h2>
              <div className="space-y-4">
                {candidature.Province_structures.map((province, index) => (
                  <div key={index} className="border-l-4 border-[#6a1754] pl-4">
                    <h3 className="font-semibold text-gray-900">{province.Province.pro_designation}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {province.Localite_operationnelles.map((localite, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {localite.loc_designation}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domaines d'intervention */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Domaines d'intervention</h2>
              <div className="flex flex-wrap gap-3">
                {candidature.Domaine_structures.map((domaine, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6a1754] text-white">
                    {domaine.Domaine.dom_designation}
                  </span>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FiFileText className="mr-3 h-5 w-5 text-[#6a1754]" />
                Documents joints
              </h2>
              <div className="space-y-3">
                {candidature.Documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.doc_designation}</p>
                        <p className="text-sm text-gray-500">{doc.doc_name} • {formatFileSize(parseInt(doc.doc_size))}</p>
                      </div>
                    </div>
                    <button className="text-[#6a1754] hover:text-[#5c1949] text-sm font-medium">
                      <a href={`${import.meta.env.VITE_REMOTE_URL}/documents/${doc.doc_name}`} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                              
                              <span>Aperçu</span>
                        </a>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne latérale */}
          <div className="space-y-6">
            {/* Représentant légal */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Représentant légal</h2>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#6a1754] flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {candidature.str_nom_representant_legal || 'Non renseigné'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {candidature.str_fonction_representant || 'Fonction non renseignée'}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6a1754] focus:border-transparent">
                  <option value="">Affecter à une direction</option>
                  <option value="direction1">Direction des Affaires Juridiques</option>
                  <option value="direction2">Direction des Opérations</option>
                  <option value="direction3">Direction Administrative</option>
                </select>
                
                <button className="w-full px-4 py-2 bg-[#6a1754] text-white rounded-md hover:bg-[#5c1949] font-medium transition-colors">
                  Affecter le dossier
                </button>
                
                <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium rounded-md transition-colors">
                  Télécharger le dossier complet
                </button>
              </div>
            </div>

            {/* Informations système */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations système</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-500">ID de candidature</dt>
                  <dd className="mt-1 text-gray-900 font-mono text-xs break-all">{candidature.str_id}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Date de soumission</dt>
                  <dd className="mt-1 text-gray-900">{new Date(candidature.createdAt).toLocaleDateString('fr-FR')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Dernière modification</dt>
                  <dd className="mt-1 text-gray-900">{new Date(candidature.updatedAt).toLocaleDateString('fr-FR')}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-500">Statut de vérification</dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {candidature.str_statut_verification}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatureDetail;
