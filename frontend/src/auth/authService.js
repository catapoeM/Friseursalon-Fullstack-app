import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/login"

const login = async(credentials) => {
    try {
        const response = await axios.post(API_URL, credentials)
        console.log(response, ' res data')
        const token = response.data;
        
        localStorage.setItem("token", token)
    
        return token;

    }   catch(err) {
        return err;
    }
}

const logout = () => {
    localStorage.removeItem("token");
}

const getToken = () => {
    return localStorage.getItem("token");
}

export {login, logout, getToken}
