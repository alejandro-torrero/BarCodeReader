import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [barCodes, setBarCodes] = useState([]);

  const addBarCode = (barCode) => {
    setBarCodes([...barCodes, barCode]);
  };

  const deleteBarCode = (barCode) => {
    setBarCodes(barCodes.filter((item) => item.data !== barCode.data));
  };

  const flushBarCodeList = () => {
    setBarCodes([]);
  };

  const searchBarCode = (barCode) => {
    const chk = barCodes.find((item) => item.data === barCode.data);
    return chk == null ? false : true;
  };

  return (
    <AppContext.Provider
      value={{ barCodes, addBarCode, deleteBarCode, searchBarCode,flushBarCodeList }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
