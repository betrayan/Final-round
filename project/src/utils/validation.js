/**
 * Form Validation Utilities
 */

export const validators = {
    required: (value) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return 'This field is required';
        }
        return null;
    },

    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            return 'Please enter a valid email address';
        }
        return null;
    },

    minLength: (min) => (value) => {
        if (value && value.length < min) {
            return `Must be at least ${min} characters`;
        }
        return null;
    },

    maxLength: (max) => (value) => {
        if (value && value.length > max) {
            return `Must be no more than ${max} characters`;
        }
        return null;
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
        if (value && !regex.test(value)) {
            return message;
        }
        return null;
    },

    number: (value) => {
        if (value && isNaN(value)) {
            return 'Must be a number';
        }
        return null;
    },

    min: (min) => (value) => {
        if (value && Number(value) < min) {
            return `Must be at least ${min}`;
        }
        return null;
    },

    max: (max) => (value) => {
        if (value && Number(value) > max) {
            return `Must be no more than ${max}`;
        }
        return null;
    },

    url: (value) => {
        try {
            if (value) new URL(value);
            return null;
        } catch {
            return 'Please enter a valid URL';
        }
    },

    phone: (value) => {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (value && !phoneRegex.test(value)) {
            return 'Please enter a valid phone number';
        }
        return null;
    },

    match: (otherFieldValue, fieldName = 'field') => (value) => {
        if (value !== otherFieldValue) {
            return `Must match ${fieldName}`;
        }
        return null;
    }
};

/**
 * Validate a single field with multiple validators
 * @param {*} value - Field value
 * @param {Array} validatorFns - Array of validator functions
 * @returns {string|null} Error message or null
 */
export const validateField = (value, validatorFns = []) => {
    for (const validator of validatorFns) {
        const error = validator(value);
        if (error) {
            return error;
        }
    }
    return null;
};

/**
 * Validate entire form object
 * @param {Object} formData - Form data object
 * @param {Object} validationRules - Validation rules object
 * @returns {Object} Errors object
 */
export const validateForm = (formData, validationRules) => {
    const errors = {};

    Object.keys(validationRules).forEach(fieldName => {
        const fieldValue = formData[fieldName];
        const fieldValidators = validationRules[fieldName];
        const error = validateField(fieldValue, fieldValidators);

        if (error) {
            errors[fieldName] = error;
        }
    });

    return errors;
};

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object
 * @returns {boolean}
 */
export const hasErrors = (errors) => {
    return Object.keys(errors).length > 0;
};
