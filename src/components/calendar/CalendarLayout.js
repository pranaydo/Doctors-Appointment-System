'use client';

import React, { useState } from "react";
import AppointmentModal from "../utils/AppointmentModal";
import { useAppointmentContext } from "../Context/AppointmentContext";
import MonthView from "./view/MonthlyView";
import WeekView from "./view/WeeklyView";

export default function CalendarLayout({ view, dateRange }) {
  const [selectedSlot, setSelectedSlot] = useState({ date: "", time: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const { allAppointments } = useAppointmentContext();

  const handleSlotSelection = (date, time) => {
    const dateStr = date.format ? date.format("YYYY-MM-DD") : date;
    const foundAppt = allAppointments.find(
      appt => appt.slot?.date === dateStr && appt.slot?.time === time
    );
    
    setSelectedSlot({ date: dateStr, time });
    setEditingAppointment(foundAppt || null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg p-2">
      {view === "WEEK" ? (
        <WeekView
          allAppointments={allAppointments}
          onSlotClick={handleSlotSelection}
          dateRange={dateRange}
        />
      ) : (
        <MonthView
          allAppointments={allAppointments}
          onSlotClick={handleSlotSelection}
        />
      )}

      <AppointmentModal
        selectedSlot={selectedSlot}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingAppointment={editingAppointment}
        setEditingAppointment={setEditingAppointment}
      />
    </div>
  );
}