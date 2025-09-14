import { useState } from "react";
import { Link } from "react-router-dom";
import { UseRegisterConfig } from "./hook";
import ProvinceStep from "../../components/Stepper/ProvinceStep";
import ZoneStep from "../../components/Stepper/ZoneStep";
import LocaliteStep from "../../components/Stepper/LocaliteStep";
import DocumentStep from "../../components/Stepper/DocumentStep";
import IdentificationStep from "../../components/Stepper/IdentificationStep";
import QuestionStep from "../../components/Stepper/QuestionStep";
import RevisionStep from "../../components/Stepper/RevisionStep";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const {
    currentStep,
    nextStep,
    prevStep,
    steps,
    formData,
    updateFormData,
    submitForm,
  } = UseRegisterConfig();

  return (
    <div className="flex">
      <div className="flex flex-col items-start bg-[#0f172a] gap-1 w-[280px] h-screen px-5 pt-20 sticky top-0">
        {steps.map((step, index) => (
          <div className="flex gap-2" key={index}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={
                  step.isActive
                    ? `flex items-center justify-center bg-[#6a1754] w-8 h-8 rounded-full text-white`
                    : step.isCompleted
                    ? `flex items-center justify-center bg-[#6a1754] w-8 h-8 rounded-full text-white`
                    : `flex items-center justify-center bg-transparent border border-gray-600 w-8 h-8 rounded-full text-gray-600`
                }
              >
                {step.isCompleted ? "✓" : step.id}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={
                    step.isCompleted
                      ? `bg-[#6a1754] h-14 w-[2px]`
                      : `bg-gray-600  h-14 w-[2px]`
                  }
                ></div>
              )}
            </div>
            <div className="flex flex-col">
              <div
                className={
                  step.isActive
                    ? `font-semibold text-gray-200`
                    : step.isCompleted
                    ? `font-semibold text-gray-200`
                    : `font-semibold text-gray-600`
                }
              >
                {step.title}
              </div>
              <div
                className={
                  step.isActive
                    ? `text-gray-400 text-sm mt-1`
                    : step.isCompleted
                    ? `text-gray-400 text-sm mt-1`
                    : `text-gray-600 text-sm mt-1`
                }
              >
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-white ">
        <div className="border-b border-gray-200 bg-white px-8 py-4">
          <Link
            to="/"
            className="text-sm font-medium text-[#6a1754] hover:text-[#0089CF] transition-colors duration-300"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="p-8 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#6a1754] mb-2">
                Étape {currentStep} : {steps[currentStep - 1].title}
              </h1>
            </div>

            {/* Step Content */}
            <div className="mb-12">
              {currentStep === 1 && <ProvinceStep />}
              {currentStep === 2 && <ZoneStep />}
              {currentStep === 3 && <LocaliteStep />}
              {currentStep === 4 && <DocumentStep />}
              {currentStep === 5 && <IdentificationStep />}
              {currentStep === 6 && <QuestionStep />}
              {currentStep === 7 && <RevisionStep formData={formData} />}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex justify-center py-3 px-4 w-32 border-2 border-[#6a1754] rounded-md shadow-sm text-sm font-medium text-[#6a1754] bg-transparent  hover:bg-[#6a1754] hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#913376]"
              >
                ← Précédent
              </button>

              {currentStep === 7 ? (
                <button
                  onClick={submitForm}
                  className="flex justify-center items-end py-3 px-4 w-40 border-2 border-[#0089CF] rounded-md shadow-sm text-sm font-medium text-white bg-[#0089CF] hover:bg-[#117bb1] transition-colors duration-300 cursor-pointer"
                >
                  Soumettre
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentStep === steps.length}
                  className="flex justify-center items-end py-3 px-4 w-32 border-2 border-[#6a1754]  rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5c1949] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#913376]"
                >
                  Suivant →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
