import { CirclePlus, Sun } from 'lucide-react';
import { Switch, DatePicker, Radio } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function CalendarHeader({ view, setView,dateRange, setDateRange }) {
  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      setDateRange(dates);
    }
  };

  const rangePresets = [
    {
      label: "This Week",
      value: [dayjs().startOf("week"), dayjs().endOf("week")],
    },
    {
      label: "Next Week",
      value: [
        dayjs().startOf("week").add(1, "week"),
        dayjs().endOf("week").add(1, "week"),
      ],
    },
    {
      label: "Next to Next Week",
      value: [
        dayjs().startOf("week").add(2, "week"),
        dayjs().endOf("week").add(2, "week"),
      ],
    },
  ];

  return (
    <>
      <div className="p-4 flex justify-between">
        <h1 className="text-xl font-bold text-red-500">Appointments</h1>
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          <Switch defaultChecked />
          <span className="text-sm">Apply Dark Theme</span>
        </div>
      </div>

      <div className="flex justify-between items-center mx-4">
        <RangePicker presets={rangePresets} onChange={onRangeChange} />

        <div className="flex items-center gap-4">
          <CirclePlus className="cursor-pointer" />
          <Radio.Group
            value={view}
            onChange={(e) => setView(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            <Radio.Button disabled value="DAY">DAY</Radio.Button>
            <Radio.Button value="WEEK">WEEK</Radio.Button>
            <Radio.Button value="MONTH">MONTH</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </>
  );
}