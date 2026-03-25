export const loginRules = {
    email: {
        required: 'E-Mail ist erforderlich',
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Ungültiges E-Mail-Format'
        }
    },
    password: {
        required: 'Passwort ist erforderlich',
        minLength: {
            value: 8,
            message: 'Das Passwort muss mindestens 8 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Das Passwort darf maximal 50 Zeichen lang sein'
        }
    }
}

export const registerRules = {
    email: {
        required: 'E-Mail ist erforderlich',
        pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Ungültiges E-Mail-Format'
        }
    },
    password: {
        required: 'Passwort ist erforderlich',
        minLength: {
            value: 8,
            message: 'Das Passwort muss mindestens 8 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Das Passwort darf maximal 50 Zeichen lang sein'
        }
    },
    adminSecret: {
        required: 'Admin-Geheimschlüssel ist erforderlich',
        minLength: {
            value: 12,
            message: 'Der Geheimschlüssel muss mindestens 12 Zeichen lang sein'
        }
    }
}

export const createStylistRules = {
    name: {
        required: 'Vollständiger Name ist erforderlich',
        minLength: {
            value: 2,
            message: 'Der vollständige Name muss mindestens 2 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Der vollständige Name darf maximal 50 Zeichen lang sein'
        }
    },
    bio: {
        required: 'Beschreibung ist erforderlich',
        minLength: {
            value: 10,
            message: 'Die Beschreibung muss mindestens 10 Zeichen lang sein'
        },
        maxLength: {
            value: 250,
            message: 'Die Beschreibung darf maximal 250 Zeichen lang sein'
        }
    }
}

export const servicesRules = {
    serviceName: {
        required: 'Service-Name ist erforderlich',
        minLength: {
            value: 3,
            message: 'Der Service-Name muss mindestens 3 Zeichen lang sein'
        },
        maxLength: {
            value: 40,
            message: 'Der Service-Name darf maximal 40 Zeichen lang sein'
        }
    },
    duration: {
        required: 'Die Dauer in Minuten ist erforderlich',
        pattern: {
            value: /^(1[5-9]|[2-9][0-9]|1[0-9]{2}|2[0-3][0-9]|240)$/,
            message: 'Die Dauer muss zwischen 15 und 240 Minuten liegen'
        }
    },
    price: {
        required: 'Der Preis ist erforderlich',
        pattern: {
            value: /^(1[5-9]|[2-9][0-9]|1[0-9]{2}|2[0-3][0-9]|300)$/,
            message: 'Der Preis muss zwischen 10 und 300 liegen'
        }
    },
    clientType: {
        required: 'Der Kundentyp ist erforderlich',
        pattern: {
            value: /^(Woman|Man|Child)$/,
            message: 'Ungültiger Servicetyp'
        }
    }
}

export const createBookingRules = {
    firstName: {
        required: 'Vorname ist erforderlich',
        minLength: {
            value: 2,
            message: 'Der Vorname muss mindestens 2 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Der Vorname darf maximal 50 Zeichen lang sein'
        }
    },
    lastName: {
        required: 'Nachname ist erforderlich',
        minLength: {
            value: 2,
            message: 'Der Nachname muss mindestens 2 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Der Nachname darf maximal 50 Zeichen lang sein'
        }
    },
    phone: {
        required: 'Telefonnummer ist erforderlich',
        minLength: {
            value: 2,
            message: 'Die Telefonnummer muss mindestens 2 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Die Telefonnummer darf maximal 50 Zeichen lang sein'
        }
    },
    email: {
        required: 'E-Mail-Adresse ist erforderlich',
        minLength: {
            value: 2,
            message: 'Die E-Mail-Adresse muss mindestens 2 Zeichen lang sein'
        },
        maxLength: {
            value: 50,
            message: 'Die E-Mail-Adresse darf maximal 50 Zeichen lang sein'
        }
    },
    clientAdditionalNotes: {
        minLength: {
            value: 10,
            message: 'Die Beschreibung muss mindestens 10 Zeichen lang sein'
        },
        maxLength: {
            value: 100,
            message: 'Die Beschreibung darf maximal 100 Zeichen lang sein'
        }
    }
}

export const verifyCodeRules = {
    verifyCode: {
        required: 'Verifizierungscode ist erforderlich',
        minLength: {
            value: 6,
            message: 'Der Code muss mindestens 6 Zahlen lang sein'
        },
        maxLength: {
            value: 6,
            message: 'Der Code darf maximal 6 Zahlen lang sein'
        }
    },
}

export const clientTypeRules = {
    required: "Kundentyp ist erforderlich.",
    pattern: {
        value: /\b(Mann|Frau|Kinder)\b/,
        message: "Bitte mit Großbuchstaben am Anfang eingeben [Mann / Frau / Kinder].",
    },
};

export const emailRules = {
    required: "E-Mail ist erforderlich",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Bitte eine gültige E-Mail-Adresse eingeben",
    },
};

export const phoneRules = {
    required: "Telefonnummer ist erforderlich",
    pattern: {
        value: /^\+?[0-9\s\-()]{7,15}$/,
        message: "Ungültiges Telefonnummernformat",
    },
};

export const photoRules = {
    validate: {
        required: (files) =>
        files?.length > 0 || 'Foto ist erforderlich',

        fileType: (files) => {
            if (!files?.length) return true;
            const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
            return (
                allowed.includes(files[0].type) ||
                'Nur JPG-, PNG- oder JPEG-Bilder sind erlaubt'
            );
        },

        fileSize: (files) => {
            if (!files?.length) return true;
            const maxSize = 2 * 1024 * 1024;
            return (
                files[0].size <= maxSize ||
                'Das Bild muss kleiner als 2MB sein'
            );
        }
    }
};

export const confirmPasswordRule = (getValues) => ({
    required: 'Bitte Passwort bestätigen',
    validate: (value) => 
        value === getValues('password') || 'Passwörter stimmen nicht überein'
})