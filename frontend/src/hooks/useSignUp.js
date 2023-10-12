import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useSign = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();


    const signup = async (email, password, codePostal, location, country, img, name, surname, role) => {
        setLoading(true);
        axios.post("http://localhost:5000/api/user/signup",
            {email, password, codePostal, location, country, role, img, name, surname},
            {headers: {'Content-Type' : 'application/json'}}
        )
            .then(Response => {
                setError(false);
                setLoading(false);
                window.localStorage.setItem("auth",JSON.stringify(Response.data));
                dispatch({type : "LOGIN" ,payload : Response.data});
            })
            .catch(error => {
                setError(error.response.data.error);
                setLoading(false);
            })
    }
    return {signup, loading, error};
}