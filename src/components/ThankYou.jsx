import React from 'react';
import thankYouIcon from '../assets/images/icon-thank-you.svg';
import './ThankYou.css';

function ThankYou() {
    return (
        <div className="step__container thank-you__container">
            <img src={thankYouIcon} alt="Thank you checkmark" className="thank-you__icon" />

            <h2 className="step__title thank-you__title">Thank you!</h2>

            <p className="step__subtitle thank-you__message">
                Thanks for confirming your subscription! We hope you have fun using our
                platform. If you ever need support, please feel free to email us at
                support@loremgaming.com.
            </p>
        </div>
    );
}

export default ThankYou;