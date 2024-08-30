import React, { createContext, useContext, useState } from 'react';

// Create the UI context
const UIContext = createContext();

// Custom hook to use the UIContext
export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  // Load initial settings from localStorage or set defaults
  const loadInitialSettings = () => {
    const storedSettings = localStorage.getItem('uiSettings');
    return storedSettings
      ? JSON.parse(storedSettings)
      : {
          textFieldVariant: 'outlined', // default variant
          textFieldSize: 'medium', // default size
          btnSize: 'medium', // default button size
          btnVariant: 'contained', // default button variant
          btnColor: 'primary', // default button color
        };
  };

  // State to manage UI settings
  const [uiSettings, setUISettings] = useState(loadInitialSettings);

  // Handler to update the UI settings using key-value pairs
  const updateUISettings = (key, value) => {
    const newSettings = {
      ...uiSettings,
      [key]: value, // Update the specific key with the new value
    };
    setUISettings(newSettings);
    // Save updated settings to localStorage
    localStorage.setItem('uiSettings', JSON.stringify(newSettings));
  };

  return (
    <UIContext.Provider value={{ uiSettings, updateUISettings }}>{children}</UIContext.Provider>
  );
};
