import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { axios } from "../../config/axios";
import { UseCheckStatut } from "./hook";
import Select from "react-select";

const CheckStatut = () => {
  const [designation, setDesignation] = useState("");
  const [annee, setAnnee] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    provincesData,
    provinces,
    selectedProvince,
    setSelectedProvince,
    dispatch,
    loading,
    customStyles,
  } = UseCheckStatut();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!designation.trim() || !selectedProvince || !annee) return;

    setIsLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await axios.get("/register", {
        params: {
          str_designation: designation,
          str_province_siege_sociale: selectedProvince?.pro_designation,
          str_annee_creation: annee,
        },
      });
      console.log({
        str_designation: designation,
        str_province_siege_sociale: selectedProvince?.pro_designation,
        str_annee_creation: annee,
      });

      if (response.data) {
        setStatus(response.data);
        setDesignation("");
        setAnnee("");
        setSelectedProvince(null);
        dispatch(setSelectedProvince(null));
      } else {
        setError("Aucune structure trouvée avec ces critères");
      }
    } catch (err) {
      console.error("Erreur lors de la recherche:", err);
      setError("Structure introuvable ou erreur serveur");
      setStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDetails = () => {
    if (!status) return null;

    const statusConfig = {
      accepté: {
        icon: <FiCheckCircle className="h-6 w-6 text-green-500" />,
        color: "bg-green-100 text-green-800",
        label: "Accepté",
        message:
          "Félicitations ! Votre structure a été acceptée dans l'écosystème FONAREV.",
      },
      soumis: {
        icon: <FiClock className="h-6 w-6 text-blue-500" />,
        color: "bg-blue-100 text-blue-800",
        label: "Soumis",
        message: "Votre demande a été soumise et est en attente de traitement.",
      },
      rejeté: {
        icon: <FiXCircle className="h-6 w-6 text-red-800" />,
        color: "bg-red-100 text-red-800",
        label: "Rejeté",
        message:
          "Votre demande a été rejetée. Veuillez contacter le support pour plus d'informations.",
      },
    };

    const config =
      statusConfig[status.str_statut_verification] || statusConfig["soumis"];

    return (
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="space-y-3">
          {/* Header avec icône et nom */}
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${config.color}`}
            >
              {config.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {status.str_designation}
              {status.str_sigle && (
                <span className="text-gray-500 ml-1">({status.str_sigle})</span>
              )}
            </h3>
          </div>

          {/* Informations principales */}
          <div className="space-y-2">
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600">Statut:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.color}`}
              >
                {config.label}
              </span>
            </div>
            {status.str_niveau_risque && (
              <div className="flex items-center justify-between py-1">
                <span className="text-gray-600">Niveau de risque:</span>
                <span className="text-gray-900 font-medium">
                  {status.str_niveau_risque}
                </span>
              </div>
            )}
          </div>

          {/* Message */}
          <div className={`mt-4 p-3 border rounded-lg ${config.color}`}>
            <p className="text-sm">{config.message}</p>
          </div>

          {/* Dates */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center text-gray-500 text-sm">
              <span>
                Créé:{" "}
                {new Date(status.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span>
                Mis à jour:{" "}
                {new Date(status.updatedAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col gap-12 max-w-[480px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300"
      >
        ← Retour à l'accueil
      </Link>

      <div className="max-w-md w-full space-y-8 mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#6a1754]">
            {status ? "Statut de votre demande" : "Vérifier le statut"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {status
              ? "Retrouvez ci-dessous l’avancement de votre demande."
              : "Entrez les informations de votre structure pour suivre l'état de votre demande."}
          </p>
        </div>

        {!status && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md space-y-4">
              <input
                type="text"
                placeholder="Entrez la désignation de votre ONG/ASBL"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="block w-full px-4 py-3 border border-[#0089CF] rounded-md shadow-sm placeholder-gray-400 outline-0"
                required
              />

              <Select
                options={provinces}
                styles={customStyles}
                placeholder="Selectionnez votre province..."
                noOptionsMessage={() => "Aucune province trouvée"}
                value={
                  selectedProvince
                    ? {
                        value: selectedProvince.pro_id,
                        label: selectedProvince.pro_designation,
                      }
                    : null
                }
                onChange={(option) => {
                  if (option) {
                    const province = provincesData.find(
                      (p) => p.pro_id === option.value
                    );
                    dispatch(setSelectedProvince(province));
                  } else {
                    dispatch(setSelectedProvince(null));
                  }
                }}
                isClearable
              />

              <input
                type="number"
                placeholder="Entrez l'année de création de votre ONG/ASBL"
                min="1900"
                max={new Date().getFullYear()}
                value={annee}
                onChange={(e) => setAnnee(e.target.value)}
                className="block w-full px-4 py-3 border border-[#0089CF] rounded-md shadow-sm placeholder-gray-400 outline-0"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5a1446] active:bg-[#6a1754] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                "Recherche en cours..."
              ) : (
                <>
                  <FiSearch className="mr-2 h-4 w-4" /> Vérifier le statut
                </>
              )}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
            <FiXCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {status && getStatusDetails()}
      </div>
    </div>
  );
};

export default CheckStatut;
