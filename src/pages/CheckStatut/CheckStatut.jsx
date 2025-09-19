import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { axios } from "../../config/axios";

const CheckStatut = () => {
  const [designation, setDesignation] = useState("");
  const [province, setProvince] = useState("");
  const [annee, setAnnee] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!designation.trim() || !province.trim() || !annee) return;

    setIsLoading(true);
    setError("");
    setStatus(null);

    try {
      const response = await axios.get("/register", {
        params: {
          str_designation: designation,
          str_province_siege_sociale: province,
          str_annee_creation: annee,
        },
      });

      if (response.data) {
        setStatus(response.data);
        setDesignation("");
        setProvince("");
        setAnnee("");
      } else {
        setError("Aucune structure trouvée avec ces critères");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
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
          <div
            className={`mt-4 p-3 border border-green-200 rounded-lg ${config.color}`}
          >
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
      <div>
        <Link
          to="/"
          className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300"
        >
          ← Retour à l'accueil
        </Link>
      </div>

      <div>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#6a1754]">
              {status ? "Statut de votre demande" : "Vérifier le statut"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {status
                ? "Retrouvez ci-dessous l’avancement de votre demande."
                : "Entrez les informations de votre structure pour suivre l'état de votre demande"}
            </p>
          </div>

          {!status && (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md space-y-4">
                <div>
                  <label htmlFor="designation" className="sr-only">
                    Désignation de l'ONG/ASBL
                  </label>
                  <div className="relative">
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      required
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="focus:ring-[#0089CF] focus:border-[#0089CF] block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                      placeholder="Entrez la désignation de votre ONG/ASBL"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="province" className="sr-only">
                    Province du siège social
                  </label>
                  <div className="relative">
                    <input
                      id="province"
                      name="province"
                      type="text"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="focus:ring-[#0089CF] focus:border-[#0089CF] block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                      placeholder="Entrez la province de votre siège social"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="anneeCreation" className="sr-only">
                    Année de création de l'ONG/ASBL
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="anneeCreation"
                      id="anneeCreation"
                      min="1900"
                      max={new Date().getFullYear()}
                      required
                      value={annee}
                      onChange={(e) => setAnnee(e.target.value)}
                      className="focus:ring-[#0089CF] focus:border-[#0089CF] block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400"
                      placeholder="Entrez l'année de création de votre ONG/ASBL"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5a1446] active:bg-[#6a1754] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Recherche en cours...
                    </>
                  ) : (
                    <>
                      <FiSearch className="mr-2 h-4 w-4" />
                      Vérifier le statut
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Affichage des erreurs */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <FiXCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Affichage du statut */}
          {status && getStatusDetails()}
        </div>
      </div>
    </div>
  );
};

export default CheckStatut;
