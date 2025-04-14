import React, { createContext, useContext, useState } from "react";

interface IAppContextProps {
  personalDetails: {
    firstName: string;
    lastName: string;
    gender: string;
    mobile: string;
    email: string;
    dob: string;
    passportNo: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    birthPlace: string;
    occupation: string;
    education: string;
    passportIssuePlace: string;
  };
  setPersonalDetails: React.Dispatch<React.SetStateAction<{} | null>>;
  contactDetails: {
    fatherName: string;
    motherName: string;
    emergencyContact: string;
  };
  setContactDetails: React.Dispatch<React.SetStateAction<{} | null>>;
}

const AppContext = createContext<IAppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [personalDetails, setPersonalDetails] = useState<any>({});
  const [contactDetails, setContactDetails] = useState<any>({});

  return (
    <AppContext.Provider
      value={{
        personalDetails,
        setPersonalDetails,
        contactDetails,
        setContactDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
