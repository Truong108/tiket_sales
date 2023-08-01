import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Space, TimePicker } from "antd";


interface CalendarValue {
  dateValue: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

export const CalendarDateValue: React.FC<CalendarValue> = ({ dateValue, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  useEffect(() => {
    setSelectedDate(dateValue);
  }, [dateValue]);
  const handleDateChange = (date: any) => {
    const dayjsDate = date ? dayjs(date) : null; 
    setSelectedDate(dayjsDate); 
    onDateChange(dayjsDate); 
  };

  return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={dateValue}
        format="DD/MM/YYYY"
        className="custom-datepicker"
        onChange={handleDateChange}
      />
    </Space>
  );
};

interface TimeValue {
  timeValue: dayjs.Dayjs | null;
  onTimechange: (time: any) => void;
}

export const CalendarTimeValue: React.FC<TimeValue> = ({
  timeValue,
  onTimechange,
}) => {
  const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  useEffect(() => {
    setSelectedTime(timeValue);
  }, [timeValue]);
  const handleChaneTime = (time: any) => {
    setSelectedTime(time);
    onTimechange(time);
  };
  return (
    <Space style={{ margin: "0" }}>
      <TimePicker
        value={selectedTime}
        className="custom-timepicker"
        placeholder="HH:mm:ss"
        format="HH:mm:ss"
        onChange={handleChaneTime}
      />
    </Space>
  );
};