import React, { useState, createContext } from "react";

interface AuthContextProps {
  congestion: string;
  setCongestion: (congestion: string) => void;
  color: string;
  setColor: (color: string) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  congestion: "",
  setCongestion: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  color: "",
  setColor: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [congestion, setCongestion] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [color, setColor] = useState("");

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
        return "정보 없음";
    }
  };

  const getColorLabel = (value: string) => {
    switch (value) {
      case "0":
        return "#edede9";
      case "1":
        return "#8ac926";
      case "2":
        return "#ffca3a";
      case "3":
        return "#ff6700";
      case "4":
        return "#ff4800";
      default:
        return "#edede9";
    }
  };
  return (
    <AuthContext.Provider
      value={{
        congestion: getCongestionLabel(congestion),
        setCongestion,
        isPlaying,
        setIsPlaying,
        color: getColorLabel(color),
        setColor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
