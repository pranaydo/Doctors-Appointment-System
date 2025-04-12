'use client';

import { useState } from 'react';
import CalendarHeader from '../CalendarHeader';
import CalendarLayout from './CalendarLayout';
import dayjs from 'dayjs';

export default function Calendar() {
  const [view, setView] = useState('MONTH');
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("week"),
    dayjs().endOf("week"),
  ]);

  return (
    <div className="p-4 max-w-7xl mx-auto overflow-hidden">
      <CalendarHeader view={view} setView={setView} dateRange={dateRange} setDateRange={setDateRange} />
      <CalendarLayout view={view} dateRange={dateRange} />
    </div>
  );
}
