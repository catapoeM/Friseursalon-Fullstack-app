import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import * as authService from "./authService";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = authService.getToken();
        if (token) {
            try {
                setUser(jwtDecode(token))
            }catch {
                authService.logout();
            }
        }
        setLoading(false);
    }, [])


    const login = async (credentials) => {
        const token = await authService.login(credentials)
        setUser(jwtDecode(token));
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}