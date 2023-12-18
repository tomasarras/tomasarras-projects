import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const Provider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0);
    return (<Context.Provider value={{
        setCurrentPage,
        currentPage,
    }}>
        {children}
    </Context.Provider>);
}