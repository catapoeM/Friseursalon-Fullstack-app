import {create} from 'zustand';
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const APIURL = import.meta.env.VITE_BASE_URL
const STORAGEKEY = import.meta.env.VITE_STORAGEKEY

const initialState = {
    loggedinAdmin: null,
    token: null,
    decodedToken: null,
    alertProps: null,
    confirmProps: null
}

const useStore = create((set, get) => ({
    ...initialState,
    adminLogin: async(data) => {
        try {
            // rest api aufrufen
            let response = await axios.post(APIURL + '/admin/login', data)

            // token empfangen
            const token = response.data;

            // Eskalation wenn Login nicht funktioniert
            if (response.status !== 200 || !token) {
                // Snackbar-ALert ausgeben
                return false    
            }
            // token decodieren
            const decodedToken = jwtDecode(token)
            //const {id} = decodedToken;
            //console.log(id, ' id')
            
            // stammdaten des angemeldeten admin holen
            const config = {headers: {Authorization: 'Bearer ' + token}}
            response = await axios(APIURL + '/admin/stylists', config)
            const loggedinAdmin = response.data;
            set({token, decodedToken, loggedinAdmin})
            
            sessionStorage.setItem(STORAGEKEY, JSON.stringify({token, decodedToken, loggedinAdmin}))
            
            return true;
        } catch (error) {
            // TODO: Snackbar/Alert ausgeben
            get().raiseAlert({severity: 'error', title: 'Login error', text: error.message})
        }
    },
    adminLogout: () => {
        // SessionStorage Löschen
        sessionStorage.removeItem(STORAGEKEY);
        
        // Store auf Initialwerte zurucksetzen
        set({...initialState});
    },
    adminCheckLogin: () => {
        // wenn angemeldet, gar nix tun
        // mit det(). greife ich auf elemente im eigenen Store zu
        if (!get().loggedinAdmin) {
            return;
        }
        // Objekt aus SessionStore holen
        const backup = JSON.parse(sessionStorage.getItem(STORAGEKEY));

        // Prüfen, ob Objekt da ist
        if (!backup) {
            // auslogen!
            get().adminLogout();
            return;
        }
        // Gültigkeit des Tokens prüfen, wenn abgelaufen -> Admin ausloggen
        const {token, decodedToken, loggedinAdmin} = backup;
        const currentMS = Number(new Date()) / 1000;
        const {exp} = decodedToken;

        if (exp < currentMS) {
            // auslogen
            get().adminLogout();
            return;
        }
        // Zustand mit den Daten vom SessionStorage updaten
        set({token, decodedToken, loggedinAdmin})
    },
    adminRefreshMe: async() => {
        // Daten von angemeldeten Admin holen
        // stammdaten des angemeldeten admins holen
        const config = {headers: {Authorization: 'Bearer ' + get().token}}
        const response = await axios(APIURL + '/admins/' + get().loggedinAdmin._id, config);
        const loggedinAdmin = response.data;

        // Store updaten
        set({loggedinAdmin})

        // SessionStorage updaten
        sessionStorage.setItem(STORAGEKEY, JSON.stringify({token: get().token, decodedToken: get().decodedToken, loggedinAdmin}))
    },
    raiseAlert: (newProps) => {
        // mindestens Property text muss über die props angeliefert werden!
        // Zusätzlich ist noch Property title möglich
        const defaultProps = {
            duration: 5000,
            vertical: 'top',
            horizontal: 'right',
            variant: 'filled',
            severity: 'success',
        };
    
        const alertProps = { ...defaultProps, ...newProps };
    
        set({ alertProps });
    },
    destroyAlert: () => set({ alertProps: null }),
    raiseConfirm: (confirmProps) => {
        // mindestens Property text muss über die props angeliefert werden!
        // Zusätzlich ist noch Property title möglich
        set({ confirmProps });
    },
    destroyConfirm: () => set({ confirmProps: null }),
}))

export default useStore;