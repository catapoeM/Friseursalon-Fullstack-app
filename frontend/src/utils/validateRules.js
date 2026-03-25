// This is a function to adapt the form rules to the logic from the AdminEditStylist -> Bio
// without using form 'react-hook-form'; See -> AdminLoginPage
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

// This is a function to adapt the form rules to the logic from the StylistActionDialog -> Bio
// without using form 'react-hook-form'; See -> AdminLoginPage
const validateInputFieldBio = (value, rules) => {
    if (!rules) {
        return "";
    }

    // required
    if (rules.required) {
        const message = 
            typeof rules.required === "string"
                ? rules.required
                : "This field is required"
        
        if (!value) {
            return message
        }
    }
        // minLength
    if (rules.minLength) {
        if (value.length < rules.minLength.value) {
            return rules.minLength.message
        }
    }

    // maxLength
    if (rules.maxLength) {
        if (value.length > rules.maxLength.value) {
            return rules.maxLength.message
        }
    }

    return "";
}

export {validateField, validateInputFieldBio}