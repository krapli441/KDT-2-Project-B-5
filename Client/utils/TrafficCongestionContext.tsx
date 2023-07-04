import React, { useState, createContext } from "react";

interface AuthContextProps {
  congestion: string; // 타입 변경
  setCongestion: (congestion: string) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  congestion: "",
  setCongestion: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [congestion, setCongestion] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const getCongestionLabel = (value: string) => {
    switch (value) {
      case "0":
        return "정보 없음";
      case "1":
        return "원활";
      case "2":
        return "서행";
      case "3":
        return "지체";
      case "4":
        return "정체";
      default:
        return "";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        congestion: getCongestionLabel(congestion),
        setCongestion,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
