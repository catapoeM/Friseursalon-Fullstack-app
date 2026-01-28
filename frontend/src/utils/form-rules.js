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

export const confirmPasswordRule = (getValues) => ({
    required: 'Please confirm password',
    validate: (value) => 
        value === getValues('password') || 'Password do not match'
})