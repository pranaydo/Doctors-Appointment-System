'use client';

import { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export const ContextProvider = ({ children }) => {
  const [allAppointments, setAllAppointments] = useState([
    {
      "name": "Pranay",
      "category": "consultation",
      "doctor": "smith",
      "startTime": "07:00",
      "endTime": "02:00",
      "slot": {
        "date": "2024-02-20",
        "time": "10:30"
      },
      "id": 1744407940673
    },
    {
      "name": "Pranay",
      "category": "consultation",
      "doctor": "smith",
      "startTime": "07:00",
      "endTime": "03:00",
      "slot": {
        "date": "2024-02-21",
        "time": "13:30"
      },
      "id": 1744407949180
    }
  ]);

  return (
    <AppointmentContext.Provider value={{ allAppointments, setAllAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);