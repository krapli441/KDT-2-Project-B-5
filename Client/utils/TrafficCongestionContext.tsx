import React, { useState, createContext } from "react";

interface AuthContextProps {
    congestion:number
    setCongestion:(congestion:number) => void;
    isPlaying:boolean,
    setIsPlaying:(isPlaying:boolean) =>void;

}

export const AuthContext = createContext<AuthContextProps>({
    congestion:0,
    setCongestion:() => {},
    isPlaying:false,
    setIsPlaying:()=> {}
});

export const AuthProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [congestion, setCongestion] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <AuthContext.Provider value={{
            congestion,
            setCongestion,
            isPlaying,
            setIsPlaying

        }}>
             {children}

        </AuthContext.Provider>
    );
};



