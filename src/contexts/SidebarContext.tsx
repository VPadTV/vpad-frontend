'use client'
import React, { useState, createContext, ReactNode, useContext, useEffect, SetStateAction } from "react";

export interface SidebarContextType {
    open: boolean,
    setOpen: React.Dispatch<SetStateAction<boolean>>
}

interface SidebarContextProviderProps {
    children: ReactNode;
}

export const SidebarContext = createContext<SidebarContextType>({
    open: false,
    setOpen: () => { }
});

export const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{
            open,
            setOpen
        }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => useContext(SidebarContext);