import { useState } from 'react';

export const useAlert = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [onAlertClose, setOnAlertClose] = useState(null); // Callback on alert close

  const showAlert = (message, callback = null) => {
    setAlertMessage(message);
    setOnAlertClose(() => callback); // Set the callback
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
    if (onAlertClose) onAlertClose(); // Execute the callback if it exists
  };

  return {
    alertOpen,
    alertMessage,
    showAlert,
    closeAlert,
  };
};
