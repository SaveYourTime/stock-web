import React, { useState } from 'react';

const DateContext = React.createContext();

export const DateContextProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>{children}</DateContext.Provider>
  );
};

export default DateContext;
