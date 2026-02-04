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
            message: 'Password can be maximul of 50 Characters'
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
            message: 'Password can be maximul of 50 Characters'
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
            message: 'Full name can be maximul of 50 Characters'
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
            message: 'Bio can be maximul of 250 Characters'
        }
    }
}

export const photoRules = {
    validate: {
        required: (files) =>
        files?.length > 0 || 'Photo is required',

        fileType: (files) => {
            if (!files?.length) return true;
            const allowed = ['image/jpeg', 'image/png', 'image/webp'];
            return (
                allowed.includes(files[0].type) ||
                'Only JPG, PNG or WEBP images are allowed'
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