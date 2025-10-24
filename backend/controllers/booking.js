import {writeFileSync, readFileSync, existsSync, mkdirSync} from 'fs';
let users = [];
// Funktionen für Speichern und Laden des JSON-files
const folder = process.cwd() + '/data';
const fileName = folder + '/users.json';

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


export const getBooking = (req, res) => {
    res.render("termin");
};

export const postBooking = (req, res) => {
    const { name, date, time, service, phone } = req.body;
    let newUser = {
        name,
        date,
        time,
        service,
        phone
    };
    users.push(newUser);

    saveData();
    console.log(newUser);
    res.status(200).json(newUser);
};

export const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};