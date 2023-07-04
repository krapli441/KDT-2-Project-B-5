import React, { useState, createContext } from "react";

interface AuthContextProps {
  congestion: number;
  setCongestion: (congestion: number) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  congestion: 0,
  setCongestion: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [congestion, setCongestion] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        congestion,
        setCongestion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
