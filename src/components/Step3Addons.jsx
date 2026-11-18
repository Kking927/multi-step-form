import React from 'react';
import './Step3Addons.css';

function Step3Addons({ formData, setFormData }) {
    const addonsList = [
        {
            id: 'onlineService',
            name: 'Online service',
            description: 'Access to multiplayer games',
            monthlyPrice: 1,
            yearlyPrice: 10,
        },
        {
            id: 'largerStorage',
            name: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            monthlyPrice: 2,
            yearlyPrice: 20,
        },
        {
            id: 'customizableProfile',
            name: 'Customizable profile',
            description: 'Custom theme on your profile',
            monthlyPrice: 2,
            yearlyPrice: 20,
        },
    ];

    const handleToggleAddon = (addonName) => {
        const currentAddons = formData.addons || [];
        let updatedAddons;

        if (currentAddons.includes(addonName)) {
            updatedAddons = currentAddons.filter((item) => item !== addonName);
        } else {
            updatedAddons = [...currentAddons, addonName];
        }

        setFormData({ ...formData, addons: updatedAddons });
    };

    return (
        <div className="form__step">
            <header className="form__header">
                <h1 className="form__title">Pick add-ons</h1>
                <p className="form__description">Add-ons help enhance your gaming experience.</p>
            </header>

            {/* Add-ons Cards Container */}
            <div className="addons__list">
                {addonsList.map((addon) => {
                    const isSelected = (formData.addons || []).includes(addon.name);
                    const price = formData.billing === 'monthly' ? `+$${addon.monthlyPrice}/mo` : `+$${addon.yearlyPrice}/yr`;

                    return (
                        <div
                            key={addon.id}
                            className={`addon__card ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleToggleAddon(addon.name)}
                        >
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => { }} // Handled by card click
                                className="addon__checkbox"
                            />
                            <div className="addon__info">
                                <span className="addon__name">{addon.name}</span>
                                <span className="addon__desc">{addon.description}</span>
                            </div>
                            <span className="addon__price">{price}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Step3Addons;