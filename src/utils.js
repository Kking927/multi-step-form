const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'icloud.com', 'hotmail.com'];

// Auto-capitalize first letter of each word
export const formatName = (value) => {
    return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Format phone number into xxx-xxx-xxxx
export const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
        return numbers;
    } else if (numbers.length <= 6) {
        return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
};

// Dynamic email domain suggestions
export const getEmailSuggestions = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return [];
    const prefix = email.slice(0, atIndex + 1);
    const typedDomain = email.slice(atIndex + 1).toLowerCase();

    return emailDomains
        .filter(domain => domain.startsWith(typedDomain))
        .map(domain => prefix + domain);
};

// Validation function for Step 1
export const validateStep1 = (formData) => {
    let isValid = true;
    let newErrors = { name: '', email: '', phone: '' };

    if (!formData.name.trim()) {
        newErrors.name = 'This field is required';
        isValid = false;
    } else if (formData.name.trim().split(' ').length < 2) {
        newErrors.name = 'Please enter your first and last name';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        newErrors.email = 'This field is required';
        isValid = false;
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
    }

    if (!formData.phone.trim()) {
        newErrors.phone = 'This field is required';
        isValid = false;
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }

    return { isValid, newErrors };
};