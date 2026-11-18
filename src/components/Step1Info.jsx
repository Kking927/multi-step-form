import React from 'react';
import './Step1Info.css';

function Step1Info({ formData, errors, handleChange, getEmailSuggestions }) {
    return (
        <div className="form__step">
            <header className="form__header">
                <h1 className="form__title">Personal info</h1>
                <p className="form__description">Please provide your name, email address, and phone number.</p>
            </header>

            {/* Name Input */}
            <div className="form__group">
                <div className="form__label-group">
                    <label className="form__label" htmlFor="name">Name</label>
                    {errors.name && <span className="form__error">{errors.name}</span>}
                </div>
                <input
                    className="form__input"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Stephen King"
                />
            </div>

            {/* Email Input */}
            <div className="form__group">
                <div className="form__label-group">
                    <label className="form__label" htmlFor="email">Email Address</label>
                    {errors.email && <span className="form__error">{errors.email}</span>}
                </div>
                <input
                    className="form__input"
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    list="email-suggestions"
                    placeholder="e.g. stephenking@lorem.com"
                />
                <datalist id="email-suggestions">
                    {getEmailSuggestions().map((suggestion, index) => (
                        <option key={index} value={suggestion} />
                    ))}
                </datalist>
            </div>

            {/* Phone Input */}
            <div className="form__group">
                <div className="form__label-group">
                    <label className="form__label" htmlFor="phone">Phone Number</label>
                    {errors.phone && <span className="form__error">{errors.phone}</span>}
                </div>
                <input
                    className="form__input"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 123-456-7890"
                    maxLength="12"
                />
            </div>
        </div>
    );
}

export default Step1Info;