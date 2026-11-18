import React from 'react';
import './Step2Plan.css';

import arcadeIcon from '../assets/images/icon-arcade.svg';
import advancedIcon from '../assets/images/icon-advanced.svg';
import proIcon from '../assets/images/icon-pro.svg';

function Step2Plan({ formData, setFormData }) {
    const plans = [
        {
            id: 'Arcade',
            name: 'Arcade',
            monthlyPrice: 9,
            yearlyPrice: 90,
            icon: arcadeIcon,
        },
        {
            id: 'Advanced',
            name: 'Advanced',
            monthlyPrice: 12,
            yearlyPrice: 120,
            icon: advancedIcon,
        },
        {
            id: 'Pro',
            name: 'Pro',
            monthlyPrice: 15,
            yearlyPrice: 150,
            icon: proIcon,
        },
    ];

    return (
        <div className="form__step">
            <header className="form__header">
                <h1 className="form__title">Select your plan</h1>
                <p className="form__description">You have the option of monthly or yearly billing.</p>
            </header>

            {/* Plan Cards Container */}
            <div className="plan__grid">
                {plans.map((p) => {
                    const isSelected = formData.plan === p.name;
                    const price = formData.billing === 'monthly' ? `$${p.monthlyPrice}/mo` : `$${p.yearlyPrice}/yr`;

                    return (
                        <div
                            key={p.id}
                            onClick={() => setFormData({ ...formData, plan: p.name })}
                            className={`plan__card ${isSelected ? 'selected' : ''}`}
                        >
                            <img
                                src={p.icon}
                                alt={`${p.name} icon`}
                                className="plan__icon"
                            />

                            <div className="plan__name">{p.name}</div>
                            <div className="plan__price">{price}</div>
                            {formData.billing === 'yearly' && (
                                <div className="plan__freebie">2 months free</div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Billing Toggle (Monthly / Yearly) */}
            <div className="billing__container">
                <span className={`billing__label ${formData.billing === 'monthly' ? 'billing__label--active' : ''}`}>
                    Monthly
                </span>

                <label className="switch">
                    <input
                        type="checkbox"
                        checked={formData.billing === 'yearly'}
                        onChange={(e) => setFormData({ ...formData, billing: e.target.checked ? 'yearly' : 'monthly' })}
                    />
                    <span className="slider"></span>
                </label>

                <span className={`billing__label ${formData.billing === 'yearly' ? 'billing__label--active' : ''}`}>
                    Yearly
                </span>
            </div>
        </div>
    );
}

export default Step2Plan;