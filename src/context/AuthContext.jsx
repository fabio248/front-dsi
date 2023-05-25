import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider (props) {
    const {children} = props;
    const [user, setUset] = useState(null);
    const [token, setToken] = useState(null)


    useEffect(() => {
        //Comprueba que el usuario se encuentra con la sesión abierta
    }, []);

    const login = async (acccessToken) => {
        console.log("Login Context");
        console.log(accessToken);
    }

    const data = {
        accessToken: token, 
        user, 
        login,

    };
    return <AuthContext.Provider value = {data}>{children}</AuthContext.Provider> 
};
