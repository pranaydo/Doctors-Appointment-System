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
    },
    {
        "name": "Pranay",
        "category": "followup",
        "doctor": "smith",
        "startTime": "10:05",
        "endTime": "02:02",
        "slot": {
            "date": "2025-04-14",
            "time": "09:00"
        },
        "id": 1744489927094
    },
    {
        "name": "Pranay HEllo",
        "category": "consultation",
        "doctor": "rahul_mehta",
        "startTime": "06:06",
        "endTime": "12:04",
        "slot": {
            "date": "2025-04-16",
            "time": "09:00"
        },
        "id": 1744489947354
    },
    {
        "name": "Pranay",
        "category": "followup",
        "doctor": "rahul_mehta",
        "startTime": "06:00",
        "endTime": "04:00",
        "slot": {
            "date": "2025-04-14",
            "time": "11:30"
        },
        "id": 1744489971489
    },
    {
        "name": "Pranay HEllo",
        "category": "consultation",
        "doctor": "anil_kapoor",
        "startTime": "02:03",
        "endTime": "02:03",
        "slot": {
            "date": "2025-04-18",
            "time": "11:00"
        },
        "id": 1744489993613
    },
    {
        "name": "TEST",
        "category": "consultation",
        "doctor": "priya_sharma",
        "startTime": "02:04",
        "endTime": "04:00",
        "slot": {
            "date": "2025-04-15",
            "time": "09:00"
        },
        "id": 1744490096535
    },
    {
        "name": "PRIYA 11111",
        "category": "consultation",
        "doctor": "priya_sharma",
        "startTime": "02:05",
        "endTime": "02:05",
        "slot": {
            "date": "2025-04-15",
            "time": "09:30"
        },
        "id": 1744490120881
    }
]);
  
  const [searchQuery, setSearchQuery] = useState('');
console.log(allAppointments);

  const filteredAppointments = searchQuery 
    ? allAppointments.filter(appt => 
        appt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allAppointments;

  return (
    <AppointmentContext.Provider value={{ 
      allAppointments, 
      setAllAppointments,
      filteredAppointments,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointmentContext = () => useContext(AppointmentContext);