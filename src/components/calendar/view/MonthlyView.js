'use client';

import { useState, useEffect } from "react";
import dayjs from "dayjs";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MonthView({
  filteredAppointments,
  onSlotClick,
}) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [calendarDays, setCalendarDays] = useState([]);
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startDay = startOfMonth.day();
    const daysInMonth = endOfMonth.date();

    const days = [];

    // Previous month days
    for (let i = 0; i < startDay; i++) {
      days.push({
        date: startOfMonth.subtract(startDay - i, "day"),
        isCurrentMonth: false,
        isDisabled: true,
        appointments: []
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = startOfMonth.add(i - 1, "day");
      const dateStr = date.format("YYYY-MM-DD");
      const isPastDate = date.isBefore(today, "day");
      
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled: isPastDate,
        appointments: filteredAppointments.filter(
          appt => appt.slot?.date === dateStr
        ),
        isToday: dateStr === today
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: endOfMonth.add(i, "day"),
        isCurrentMonth: false,
        isDisabled: true,
        appointments: []
      });
    }

    setCalendarDays(days);
  }, [currentMonth, filteredAppointments, today]);

  const navigateMonth = (direction) => {
    setCurrentMonth(currentMonth.add(direction, "month"));
  };

  const handleDayClick = (day) => {
    if (!day.isCurrentMonth || day.isDisabled) return;
    
    // If there are appointments, use the first one's time
    if (day.appointments.length > 0) {
      const firstAppointment = day.appointments[0];
      onSlotClick(
        day.date.format("YYYY-MM-DD"), 
        firstAppointment.slot?.time,
        firstAppointment // Pass the appointment object
      );
    } else {
      // For empty slots, use default time
      onSlotClick(day.date.format("YYYY-MM-DD"), "09:00", null);
    }
  };

  const handleAppointmentClick = (e, day, appointment) => {
    e.stopPropagation();
    if (!day.isDisabled) {
      onSlotClick(
        day.date.format("YYYY-MM-DD"), 
        appointment.slot?.time,
        appointment // Pass the appointment object
      );
    }
  };

  return (
    <div className="month-view w-full">
      {/* Month navigation and header remain the same */}
      {/* ... */}

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