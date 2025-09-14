import { useState } from "react";
import { SlQuestion } from "react-icons/sl";
const QuestionStep = () => {
  const [priseEnCharge, setPriseEnCharge] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto bg-[#0089CF]/20 rounded-full flex items-center justify-center mb-4">
          <SlQuestion className="w-8 h-8 text-[#0089CF]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Questionnaire</h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          Répondez aux questions suivantes concernant votre organisation.
        </p>
      </div>
      <div className="space-y-6">
        {/* Question 1 */}
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Avez-vous déjà pris en charge les victimes des violences sexuelles
            liées aux conflits ou les victimes des crimes contre la paix et la
            sécurité de l’humanité ?<span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="priseEnCharge"
                value="oui"
                checked={priseEnCharge === "oui"}
                onChange={(e) => setPriseEnCharge(e.target.value)}
                className="peer"
              />
              Oui
            </label>
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="priseEnCharge"
                value="non"
                checked={priseEnCharge === "non"}
                onChange={(e) => setPriseEnCharge(e.target.value)}
                className="peer"
              />
              Non
            </label>
          </div>

          {priseEnCharge === "oui" && (
            <div className="flex justify-between mt-3">
              <p className="text-base font-medium text-gray-900">
                Si oui, à quelle occasion ?
                <span className="text-[#6a1754]"> *</span>
              </p>
              <textarea
                className="rounded-sm p-2 border border-[#6a1754] outline-0 w-2/3"
                name="occasion"
              ></textarea>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Votre organisation constitue-t-elle une association des victimes ?
            <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="associationVictimes"
                value="oui"
                className="peer"
              />
              Oui
            </label>
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="associationVictimes"
                value="non"
                className="peer"
              />
              Non
            </label>
          </div>
        </div>

        {/* Question 3 */}
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Disposez-vous d’informations concernant les victimes des violences
            sexuelles liées aux conflits ou les victimes des crimes contre la
            paix et la sécurité de l’humanité ?
            <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="infosVictimes"
                value="oui"
                className="peer"
              />
              Oui
            </label>
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="infosVictimes"
                value="non"
                className="peer"
              />
              Non
            </label>
          </div>
        </div>

        {/* Question 4 */}
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Votre organisation est-elle prête à collaborer avec le FONAREV pour
            assurer la prise en charge des victimes ?
            <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="collaborationFonarev"
                value="oui"
                className="peer"
              />
              Oui
            </label>
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="collaborationFonarev"
                value="non"
                className="peer"
              />
              Non
            </label>
          </div>
        </div>

        {/* Question 5 */}
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-900">
            Votre organisation dispose-t-elle d’un compte bancaire ?
            <span className="text-[#6a1754]"> *</span>
          </p>
          <div className="flex flex-col gap-1">
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="compteBancaire"
                value="oui"
                className="peer"
              />
              Oui
            </label>
            <label className="flex items-center cursor-pointer gap-1">
              <input
                type="radio"
                name="compteBancaire"
                value="non"
                className="peer"
              />
              Non
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionStep;
