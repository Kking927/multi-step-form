import React, { useState } from 'react';
import { formatName, formatPhoneNumber, getEmailSuggestions, validateStep1 } from './utils';
import Step1Info from './components/Step1Info';
import Step2Plan from './components/Step2Plan';
import Step3Addons from './components/Step3Addons';
import Step4Summary from './components/Step4Summary';
import ThankYou from './components/ThankYou';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Global Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Arcade',
    billing: 'monthly',
    addons: [],
  });

  // Track error messages for Step 1
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Input change handler with auto-formatting using imported utils
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'name') {
      formattedValue = formatName(value);
    } else if (name === 'phone') {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  // Navigation handlers
  const handleNext = (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      const { isValid, newErrors } = validateStep1(formData);
      setErrors(newErrors);
      if (!isValid) return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      setIsSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="app">
      <div className="app__container">
        <aside className="app__sidebar">
          <ol className="sidebar__list">
            <li className={`sidebar__item ${currentStep === 1 ? 'sidebar__item--active' : ''}`}>
              <span className="sidebar__number">1</span>
              <div className="sidebar__content">
                <span className="sidebar__step-label">Step 1</span>
                <span className="sidebar__text">Your info</span>
              </div>
            </li>

            <li className={`sidebar__item ${currentStep === 2 ? 'sidebar__item--active' : ''}`}>
              <span className="sidebar__number">2</span>
              <div className="sidebar__content">
                <span className="sidebar__step-label">Step 2</span>
                <span className="sidebar__text">Select plan</span>
              </div>
            </li>

            <li className={`sidebar__item ${currentStep === 3 ? 'sidebar__item--active' : ''}`}>
              <span className="sidebar__number">3</span>
              <div className="sidebar__content">
                <span className="sidebar__step-label">Step 3</span>
                <span className="sidebar__text">Add-ons</span>
              </div>
            </li>

            <li className={`sidebar__item ${currentStep === 4 ? 'sidebar__item--active' : ''}`}>
              <span className="sidebar__number">4</span>
              <div className="sidebar__content">
                <span className="sidebar__step-label">Step 4</span>
                <span className="sidebar__text">Summary</span>
              </div>
            </li>
          </ol>
        </aside>

        {/* Main Form Content Card */}
        <section className="app__content">
          <form className="app__form" onSubmit={handleNext}>
            {isSubmitted ? (
              <ThankYou />
            ) : (
              <>
                {currentStep === 1 && (
                  <Step1Info
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    getEmailSuggestions={() => getEmailSuggestions(formData.email)}
                  />
                )}

                {currentStep === 2 && (
                  <Step2Plan formData={formData} setFormData={setFormData} />
                )}

                {currentStep === 3 && (
                  <Step3Addons formData={formData} setFormData={setFormData} />
                )}

                {currentStep === 4 && (
                  <Step4Summary formData={formData} setCurrentStep={setCurrentStep} />
                )}
              </>
            )}

            {/* Navigation Footer moved INSIDE the form */}
            {!isSubmitted && (
              <nav className="form__nav">
                <button
                  type="button"
                  className="form__btn form__btn--back"
                  onClick={handleBack}
                  style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="form__btn form__btn--next"
                >
                  {currentStep === 4 ? 'Confirm' : 'Next Step'}
                </button>
              </nav>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

export default App;