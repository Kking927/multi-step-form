import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Track the current step (starts at 1)
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Track error messages for each field
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Validation function for Step 1
  const validateStep1 = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', phone: '' };

    // 1. Name check: Must not be empty, have at least two words, and start with capital letters
    if (!formData.name.trim()) {
      newErrors.name = 'This field is required';
      isValid = false;
    } else {
      const words = formData.name.trim().split(' ');
      
      if (words.length < 2) {
        newErrors.name = 'Please enter your first and last name';
        isValid = false;
      } else {
        // Check if every word starts with an uppercase letter
        const allCapitalized = words.every(word => /^[A-Z]/.test(word));
        if (!allCapitalized) {
          newErrors.name = 'First and last names must be capitalized';
          isValid = false;
        }
      }
    }

    // 2. Email check: Basic email format check using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // 3. Phone check: Must contain numbers / valid phone characters
    const phoneRegex = /^[\+]?[\d\s-]{7,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'This field is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handlers to move forward and backward
  const handleNext = (e) => {
    e.preventDefault();

    // Validate Step 1 before allowing transition
    if (currentStep === 1) {
      if (!validateStep1()) {
        return; // Stop here if validation fails!
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="app">

      {/* Sidebar / Step Navigation */}
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

          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="form__step">
              <header className="form__header">
                <h1 className="form__title">Personal info</h1>
                <p className="form__description">Please provide your name, email address, and phone number.</p>
              </header>

              <div className="form__group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form__label" htmlFor="name">Name</label>
                  {errors.name && <span style={{ color: 'var(--red-500)', fontSize: '0.8125rem', fontWeight: 'bold' }}>{errors.name}</span>}
                </div>
                <input
                  className="form__input"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Stephen King"
                />
              </div>

              <div className="form__group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form__label" htmlFor="email">Email Address</label>
                  {errors.email && <span style={{ color: 'var(--red-500)', fontSize: '0.8125rem', fontWeight: 'bold' }}>{errors.email}</span>}
                </div>
                <input
                  className="form__input"
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. stephenking@lorem.com"
                />
              </div>

              <div className="form__group">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="form__label" htmlFor="phone">Phone Number</label>
                  {errors.phone && <span style={{ color: 'var(--red-500)', fontSize: '0.8125rem', fontWeight: 'bold' }}>{errors.phone}</span>}
                </div>
                <input
                  className="form__input"
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 234 567 890"
                />
              </div>
            </div>
          )}

          {/* Step 2 Placeholder */}
          {currentStep === 2 && (
            <div className="form__step">
              <header className="form__header">
                <h1 className="form__title">Select your plan</h1>
                <p className="form__description">You have options for monthly or yearly billing.</p>
              </header>
              <p style={{ color: 'var(--grey-500)' }}>Step 2 content goes here...</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <nav className="form__nav">
            <button
              type="button"
              className="form__btn form__btn--back"
              onClick={handleBack}
              style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
            >
              Go Back
            </button>
            <button type="submit" className="form__btn form__btn--next">
              {currentStep === 4 ? 'Confirm' : 'Next Step'}
            </button>
          </nav>

        </form>
      </section>

    </main>
  );
}

export default App;