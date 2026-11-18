import React from 'react';
import './Step4Summary.css';

function Step4Summary({ formData, setCurrentStep }) {
    const planPrices = {
        Arcade: { monthly: 9, yearly: 90 },
        Advanced: { monthly: 12, yearly: 120 },
        Pro: { monthly: 15, yearly: 150 },
    };

    // Match these keys to the exact names passed from Step 3
    const addonPrices = {
        'Online service': { monthly: 1, yearly: 10 },
        'Larger storage': { monthly: 2, yearly: 20 },
        'Customizable profile': { monthly: 2, yearly: 20 },
    };

    const isYearly = formData.billing === 'yearly';
    const currentPlanPrice = planPrices[formData.plan]?.[formData.billing] || 0;

    const addonsTotal = formData.addons.reduce((total, addonName) => {
        return total + (addonPrices[addonName]?.[formData.billing] || 0);
    }, 0);

    const grandTotal = currentPlanPrice + addonsTotal;
    const billingPeriodLabel = isYearly ? 'yr' : 'mo';
    const billingTextLong = isYearly ? '(Yearly)' : '(Monthly)';

    return (
        <div className="step__container">
            <div className="step__header">
                <h2 className="step__title">Finishing up</h2>
                <p className="step__subtitle">Double-check everything looks OK before confirming.</p>
            </div>

            <div className="summary__card">
                <div className="summary__plan-row">
                    <div>
                        <span className="summary__plan-name">
                            {formData.plan} {billingTextLong}
                        </span>
                        <button
                            type="button"
                            className="summary__change-btn"
                            onClick={() => setCurrentStep(2)}
                        >
                            Change
                        </button>
                    </div>
                    <span className="summary__plan-price">
                        ${currentPlanPrice}/{billingPeriodLabel}
                    </span>
                </div>

                {formData.addons.length > 0 && <hr className="summary__divider" />}

                <div className="summary__addons-list">
                    {formData.addons.map((addonName) => {
                        const addon = addonPrices[addonName];
                        if (!addon) return null;
                        return (
                            <div key={addonName} className="summary__addon-row">
                                <span className="summary__addon-name">{addonName}</span>
                                <span className="summary__addon-price">
                                    +${addon[formData.billing]}/{billingPeriodLabel}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="summary__total-row">
                <span className="summary__total-label">
                    Total (per {isYearly ? 'year' : 'month'})
                </span>
                <span className="summary__total-price">
                    +${grandTotal}/{billingPeriodLabel}
                </span>
            </div>
        </div>
    );
}

export default Step4Summary;