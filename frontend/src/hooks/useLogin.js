import { useState } from "react"
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dispatch} = useAuthContext();


    const login = async (email, password) => {
        setLoading(true);
        axios.post("http://localhost:5000/api/user/login",
            {email, password},
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
    return {login, loading, error};
}