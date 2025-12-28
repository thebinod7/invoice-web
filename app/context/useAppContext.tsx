import React, { createContext, useContext, useState } from 'react';

interface IAppContextProps {
  isProcessing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isProcessing, setProcessing] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isProcessing,
        setProcessing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
