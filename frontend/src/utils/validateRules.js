const validateField = (value, rules) => {
    
    if (!rules) return null;

    if (rules.required && !value) {
        return rules.required;
    }

    if (rules.minLength && value.length < rules.minLength.value) {
        return rules.minLength.message;
    }

    if (rules.min && Number(value) < rules.min.value) {
        return rules.min.message;
    }

    return null;
};

export {validateField}