'use client';

import React from "react";
import dayjs from "dayjs";

const hours = [];
for (let h = 9; h <= 16; h++) {
  hours.push(`${String(h).padStart(2, "0")}:00`);
  if (h !== 16) hours.push(`${String(h).padStart(2, "0")}:30`);
}

export default function WeekView({
  allAppointments,
  onSlotClick,
  dateRange
}) {
  const start = dateRange?.[0];
  const end = dateRange?.[1];
  const today = dayjs().format("YYYY-MM-DD");
  const currentHour = dayjs().hour();
  const currentMinute = dayjs().minute();

  const rangeDays = [];
  let current = start;

  while (current.isBefore(end) || current.isSame(end, "day")) {
    rangeDays.push(current);
    current = current.add(1, "day");
  }

  const isSlotDisabled = (date, time) => {
    const dateStr = date.format("YYYY-MM-DD");
    const [hourStr, minuteStr] = time.split(':');
    const slotHour = parseInt(hourStr);
    const slotMinute = parseInt(minuteStr);
    
    // Disable if date is in past
    if (dateStr < today) return true;
    
    // For current day, disable if time has passed
    if (dateStr === today) {
      return slotHour < currentHour || 
             (slotHour === currentHour && slotMinute < currentMinute);
    }
    
    return false;
  };

  const handleSlotClick = (date, time) => {
    if (isSlotDisabled(date, time)) return;
    
    const dateStr = date.format("YYYY-MM-DD");
    const foundAppt = allAppointments.find(
      (appt) => appt.slot?.date === dateStr && appt.slot?.time === time
    );
    onSlotClick(dateStr, time, foundAppt);
  };

  return (
    <div
      className="min-w-[600px] grid text-sm"
      style={{
        gridTemplateColumns: `70px repeat(${rangeDays.length}, minmax(80px, 1fr))`,
      }}
    >
      <div className="border bg-white h-10 sticky top-0 z-20" />
      {rangeDays.map((day) => (
        <div
          key={day.format()}
          className={`border p-2 text-center font-semibold sticky top-0 z-20 ${
            day.format("YYYY-MM-DD") === today ? "bg-blue-50" : "bg-gray-50"
          }`}
        >
          {day.format("ddd, D MMM")}
        </div>
      ))}

      {hours.map((time) => (
        <React.Fragment key={time}>
          <div className="border bg-white text-center p-2 font-medium sticky left-0 z-10">
            {time}
          </div>
          {rangeDays.map((day) => {
            const dateStr = day.format("YYYY-MM-DD");
            const isDisabled = isSlotDisabled(day, time);
            const appointment = allAppointments.find(
              (appt) => appt.slot?.date === dateStr && appt.slot?.time === time
            );

            return (
              <div
                key={`${dateStr}-${time}`}
                onClick={() => handleSlotClick(day, time)}
                className={`
                  border h-12 flex items-center justify-center text-xs px-1
                  ${isDisabled ? "cursor-not-allowed opacity-50 bg-gray-100" : "cursor-pointer hover:bg-blue-50"}
                  ${appointment ? "bg-green-100" : ""}
                `}
              >
                {appointment ? (
                  <div className={`text-xs text-center ${isDisabled ? "text-gray-500" : "text-green-700"}`}>
                    {appointment.name}
                    <br />
                    <span className="text-[10px]">
                      {appointment.startTime} - {appointment.endTime}
                    </span>
                  </div>
                ) : (
                  !isDisabled && <span>+</span>
                )}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}