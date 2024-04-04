import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get initial value from local storage or use provided initial value
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  // Update local storage when value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Method to delete item from local storage
  const deleteValue = () => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return [value, setValue, deleteValue];
};

export default useLocalStorage;
