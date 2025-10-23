import {writeFileSync, readFileSync, existsSync, mkdirSync} from 'fs';
let users = [];
// Funktionen für Speichern und Laden des JSON-files
const folder = process.cwd() + '/backend/data';
const fileName = folder + '/users.json';


export const getBooking = (req, res) => {
    res.render("termin");
};

export const postBooking = (req, res) => {
    const { name, date, time, service, phone } = req.body;
    const saveData = () => {
        // Prüfen, ob Ordner existiert, wenn nicht -> anlegen
        if(!existsSync(folder)) {
            mkdirSync(folder);
        }
        writeFileSync(fileName, JSON.stringify(users));
    }
    const loadData = () => {
        // Prüfen, ob Ordner existiert, wenn nicht -> anlegen
        if (!existsSync(fileName)) {
            return;
        }
    
        // Array users von JSON-Datei befüllen
        users = JSON.parse(readFileSync(fileName));
    }

    // Einfacher JSON-Speicher
    const newAppointment = {name, date, time, service, phone };

};