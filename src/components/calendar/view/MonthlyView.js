'use client';

import { useState, useEffect } from "react";
import dayjs from "dayjs";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({
  allAppointments,
  onSlotClick,
}) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [calendarDays, setCalendarDays] = useState([]);
  const today = dayjs().format("YYYY-MM-DD");

  // Generate calendar days for the current month
  useEffect(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    const days = [];

    // Add days from previous month
    for (let i = 0; i < startDay; i++) {
      days.push(createCalendarDay(
        startOfMonth.subtract(startDay - i, "day"),
        false,
        true // Disabled
      ));
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.add(i - 1, "day");
      const isPastDate = date.isBefore(today, "day");
      days.push(createCalendarDay(
        date,
        true,
        isPastDate,
        allAppointments
      ));
    }

    // Add days from next month to complete grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = endOfMonth.add(i, "day");
      const isPastDate = date.isBefore(today, "day");
      days.push(createCalendarDay(
        date,
        false,
        isPastDate
      ));
    }

    setCalendarDays(days);
  }, [currentMonth, allAppointments, today]);

  const createCalendarDay = (date, isCurrentMonth, isDisabled, appointments) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const dayAppointments = appointments?.filter(
      appt => appt.slot?.date === formattedDate
    ) || [];

    return {
      date,
      formattedDate,
      isCurrentMonth,
      isDisabled,
      appointments: dayAppointments,
      isToday: formattedDate === today
    };
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(currentMonth.add(direction, "month"));
  };

  const handleDayClick = (day) => {
    if (!day.isCurrentMonth || day.isDisabled) return;
    
    if (day.appointments.length > 0) {
      const firstAppointment = day.appointments[0];
      onSlotClick(day.formattedDate, firstAppointment.slot?.time);
    } else {
      onSlotClick(day.formattedDate, "09:00"); // Default time
    }
  };

  const handleAppointmentClick = (e, day, appointment) => {
    e.stopPropagation();
    if (!day.isDisabled) {
      onSlotClick(day.formattedDate, appointment.slot?.time);
    }
  };

  return (
    <div className="month-view w-full">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4 px-2">
        <button 
          onClick={() => navigateMonth(-1)} 
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(dayjs())} 
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Today
          </button>
          <button 
            onClick={() => navigateMonth(1)} 
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar header */}
      <div className="grid grid-cols-7 text-sm font-bold text-center mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2">{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`
              border h-28 p-2 flex flex-col text-xs
              ${day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
              ${day.isToday ? "border-2 border-blue-500" : ""}
              ${day.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-blue-50"}
            `}
          >
            <div className={`
              font-semibold 
              ${day.isToday ? "text-blue-600" : ""}
              ${day.isDisabled ? "text-gray-400" : ""}
            `}>
              {day.date.format("D")}
            </div>

            <div className="mt-1 overflow-y-auto max-h-20">
              {day.appointments.map(appointment => (
                <div
                  key={appointment.id}
                  className={`
                    mt-1 text-xs p-1 rounded mb-1
                    ${day.isDisabled ? "bg-gray-100 text-gray-500" : "bg-green-50 text-green-700"}
                  `}
                  onClick={(e) => handleAppointmentClick(e, day, appointment)}
                >
                  {appointment.name}
                  <br />
                  <span className="text-[10px]">
                    {appointment.startTime} - {appointment.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}