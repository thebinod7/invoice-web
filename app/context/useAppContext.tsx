import React, { createContext, useContext, useState } from 'react';

interface IAppContextProps {
  isProcessing: boolean;
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>;

  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
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
