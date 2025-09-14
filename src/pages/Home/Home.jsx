import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl w-full mx-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#6a1754] mb-4">
            Bienvenue sur eCosystème
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Le portail de gestion des Organisations Non Gouvernementales (ONG)
            et Associations Sans But Lucratif (ASBL) partenaires du FONAREV.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {/* Register Card */}
          <Link
            to="/register"
            className="group bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#6a1754] bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all duration-300">
              <FaPlus className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              S'enregistrer
            </h3>
            <p className="text-gray-500 mb-6">
              Enregistrez votre organisation pour commencer le processus de
              partenariat
            </p>
            <div className="mt-auto w-full">
              <div className="h-1 w-16 bg-[#0089CF] mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
          </Link>

          {/* Check Status Card */}
          <Link
            to="/check-status"
            className="group bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#0089CF] bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all duration-300">
              <FaSearch className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Vérifier le statut
            </h3>
            <p className="text-gray-500 mb-6">
              Vérifiez l'état d'avancement de votre demande de partenariat
            </p>
            <div className="mt-auto w-full">
              <div className="h-1 w-16 bg-[#6a1754] mx-auto rounded-full group-hover:w-24 transition-all duration-300"></div>
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-md text-gray-500">
            L'inscription est ouverte pour les provinces de Kinshasa, Kongo
            Central, Sud-Kivu, Nord-Kivu et Haut-Katanga.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
