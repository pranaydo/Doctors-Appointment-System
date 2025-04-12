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
  const { filteredAppointments } = useAppointmentContext();

  const handleSlotSelection = (date, time, appointment = null) => {
    setSelectedSlot({ date, time });
    setEditingAppointment(appointment); // This will be null for new appointments
    setIsModalOpen(true);
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg p-2">
      {view === "WEEK" ? (
        <WeekView
          filteredAppointments={filteredAppointments}
          onSlotClick={handleSlotSelection}
          dateRange={dateRange}
        />
      ) : (
        <MonthView
          filteredAppointments={filteredAppointments}
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