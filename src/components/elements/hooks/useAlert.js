// useAlert.js
import { useState } from 'react';

export const useAlert = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [onAlertClose, setOnAlertClose] = useState(null); // Callback on alert close

  const showAlert = (message, severity = 'success', callback = null) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
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
    alertSeverity,
    showAlert,
    closeAlert,
  };
};
