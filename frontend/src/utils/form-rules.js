import { duration } from "@mui/material";

export const loginRules = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 Characters'
        },
        maxLength: {
            value: 50,
            message: 'Password can be maximum of 50 Characters'
        }
    }
}

export const registerRules = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Invalid email format'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 Characters'
        },
        maxLength: {
            value: 50,
            message: 'Password can be maximum of 50 Characters'
        }
    },
    adminSecret: {
        required: 'Admin secret key is required',
            minLength: {
            value: 12,
            message: 'Secret key must be at least 12 characters'
        }
    }
}

export const createStylistRules = {
    name: {
        required: 'Full Name is required',
        minLength: {
            value: 2,
            message: 'Full Name must be at least 2 Characters'
        },
        maxLength: {
            value: 50,
            message: 'Full name can be maximum of 50 Characters'
        }
    },
    bio: {
        required: 'Bio is required',
        minLength: {
            value: 10,
            message: 'Bio must be at least 10 Characters'
        },
        maxLength: {
            value: 250,
            message: 'Bio can be maximum of 250 Characters'
        }
    }
}

export const servicesRules = {
    serviceName: {
        required: 'Service Name is required',
        minLength: {
            value: 3,
            message: 'Service Name must be at least 3 Characters'
        },
        maxLength: {
            value: 40,
            message: 'Service Name can be maximum of 40 Characters'
        }
    },
    duration: {
        required: 'The duration in minutes is required',
        pattern: {
            value: /^(1[5-9]|[2-9][0-9]|1[0-9]{2}|2[0-3][0-9]|240)$/,
            message: 'The duration must be between 15 and 240 minutes'
        }
    },
    price: {
        required: 'The price is required',
        pattern: {
            value: /^(1[5-9]|[2-9][0-9]|1[0-9]{2}|2[0-3][0-9]|300)$/,
            message: 'The price must be between 10 and 300'
        }
    },
    clientType: {
        required: 'The Client type is required',
        pattern: {
            value: /^(Woman|Man|Child)$/,
            message: 'Invalid Service type'
        }
    }
}

export const photoRules = {
    validate: {
        required: (files) =>
        files?.length > 0 || 'Photo is required',

        fileType: (files) => {
            if (!files?.length) return true;
            const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
            return (
                allowed.includes(files[0].type) ||
                'Only JPG, PNG or JPEG images are allowed'
            );
        },

        fileSize: (files) => {
            if (!files?.length) return true;
            const maxSize = 2 * 1024 * 1024; // 2MB
            return (
                files[0].size <= maxSize ||
                'Image must be smaller than 2MB'
            );
        }
    }
};


export const confirmPasswordRule = (getValues) => ({
    required: 'Please confirm password',
    validate: (value) => 
        value === getValues('password') || 'Password do not match'
})