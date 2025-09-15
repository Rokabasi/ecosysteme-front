import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseRegisterConfig } from "./hook";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { validateStep } from "../../utils/validation";
import ProvinceStep from "../../components/Stepper/ProvinceStep";
import ZoneStep from "../../components/Stepper/ZoneStep";
import LocaliteStep from "../../components/Stepper/LocaliteStep";
import DocumentStep from "../../components/Stepper/DocumentStep";
import IdentificationStepPart1 from "../../components/Stepper/IdentificationStepPart1";
import IdentificationStepPart2 from "../../components/Stepper/IdentificationStepPart2";
import QuestionStep from "../../components/Stepper/QuestionStep";
import RevisionStep from "../../components/Stepper/RevisionStep";

const Register = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const {
    currentStep,
    currentSubStep,
    nextStep,
    prevStep,
    steps,
    formData,
    updateFormData,
    submitForm,
    resetForm,
    showConfirmModal,
    handleBackToHome,
    confirmAbandon,
    continueRegistration,
    validationErrors,
    clearFieldError,
    // Données pour la validation finale
    selectedProvince,
    selectedProvinces,
    selectedZones,
    localites,
    documents,
    identificationData,
    questionsAnswers,
  } = UseRegisterConfig();

  // Gérer le clic sur le lien "Retour à l'accueil"
  const handleBackClick = (e) => {
    e.preventDefault();
    const canNavigate = handleBackToHome();
    if (canNavigate) {
      navigate("/");
    }
  };

  // Gérer la confirmation d'abandon
  const handleConfirmAbandon = () => {
    confirmAbandon();
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-start bg-[#0f172a] gap-1 w-[280px] h-screen px-5 pt-10 sticky top-0">
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
          <button
            onClick={handleBackClick}
            className="text-sm font-medium text-gray-600 hover:text-[#0089CF] transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            ← Retour à l'accueil
          </button>
        </div>

        <div className="p-8 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-[#0089CF] mb-2">
                Etape {currentStep} : {steps[currentStep - 1].title}
                {steps[currentStep - 1].hasSubSteps && (
                  <span className="text-lg text-gray-600 ml-2">
                    -{" "}
                    {steps[currentStep - 1].subSteps[currentSubStep - 1].title}
                  </span>
                )}
              </h1>
            </div>

            {/* Step Content */}
            <div className="mb-12">
              {currentStep === 1 && <ProvinceStep validationErrors={validationErrors} clearFieldError={clearFieldError} />}
              {currentStep === 2 && <ZoneStep validationErrors={validationErrors} clearFieldError={clearFieldError} />}
              {currentStep === 3 && <LocaliteStep validationErrors={validationErrors} clearFieldError={clearFieldError} />}
              {currentStep === 4 && <DocumentStep validationErrors={validationErrors} clearFieldError={clearFieldError} />}
              {currentStep === 5 && currentSubStep === 1 && (
                <IdentificationStepPart1 validationErrors={validationErrors} clearFieldError={clearFieldError} />
              )}
              {currentStep === 5 && currentSubStep === 2 && (
                <IdentificationStepPart2 validationErrors={validationErrors} clearFieldError={clearFieldError} />
              )}
              {currentStep === 6 && <QuestionStep validationErrors={validationErrors} clearFieldError={clearFieldError} />}
              {currentStep === 7 && <RevisionStep formData={formData} />}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 && currentSubStep === 1}
                className="flex justify-center py-2 px-2 w-32 border-2 border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-600 bg-transparent  hover:bg-gray-400 hover:text-white transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#0089CF]"
              >
                ← Précédent
              </button>

              {currentStep === 7 ? (
                <button
                  onClick={() => {
                    // Validation finale avant soumission
                    const allStepsValid = [1, 2, 3, 4, 5, 6].every(step => {
                      const currentState = {
                        selectedProvince,
                        selectedProvinces,
                        selectedZones,
                        localites,
                        documents,
                        identificationData,
                        questionsAnswers,
                        formData
                      };
                      
                      if (step === 5) {
                        // Valider les deux sous-étapes de l'identification
                        const validation1 = validateStep(5, 1, currentState);
                        const validation2 = validateStep(5, 2, currentState);
                        return validation1.isValid && validation2.isValid;
                      } else {
                        const validation = validateStep(step, 1, currentState);
                        return validation.isValid;
                      }
                    });
                    
                    if (allStepsValid) {
                      submitForm();
                    } else {
                      alert("Veuillez vérifier que tous les champs obligatoires sont remplis dans toutes les étapes.");
                    }
                  }}
                  className="flex justify-center items-end py-2 px-2 w-40 border-2 border-[#0089CF] rounded-md shadow-sm text-sm font-medium text-white bg-[#0089CF] hover:bg-[#117bb1] transition-colors duration-300 cursor-pointer"
                >
                  Soumettre
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentStep === steps.length}
                  className="flex justify-center items-end py-2 px-2 w-32 border-2 border-[#6a1754]  rounded-md shadow-sm text-sm font-medium text-white bg-[#6a1754] hover:bg-[#5c1949] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer active:bg-[#913376]"
                >
                  Suivant →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmation */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={continueRegistration}
        onConfirm={continueRegistration}
        onCancel={handleConfirmAbandon}
      />
    </div>
  );
};

export default Register;
