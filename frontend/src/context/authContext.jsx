import { useReducer, createContext } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    if (action.type === "LOGIN") {
        return { auth: action.payload };
    } else {
        return state;
    }
}


export const AuthContextProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(authReducer, {auth : null});
    //console.log(state);
    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}