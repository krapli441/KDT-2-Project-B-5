import React, { useState, createContext } from "react";

interface AuthContextProps {
    congestion:string;
    setCongestion:(congestion:string) => void;

}

export const AuthContext = createContext<AuthContextProps>({
    congestion:'',
    setCongestion:() => {}
});

export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [congestion, setCongestion] = useState('빈지노');

    return (
        <AuthContext.Provider value={{
            congestion,
            setCongestion,   
        }}>
             {children}

        </AuthContext.Provider>
    );
};



