import multer from 'multer';
import path from 'path';

// Speicherort + Dateiname
const storage = multer.diskStorage({
    filename: (_, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Datei-Filter (nur Bilder)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg'||
            file.mimetype === 'image/jpg'  ||
            file.mimetype === 'image/png') {
            cb(null, true);
    }   else {
        cb(new Error('Only image files (jpeg / jpg / png) are allowed'), false); // max 2b
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024}, // max 5MB
});

export default upload;