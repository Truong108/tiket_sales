import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import "dayjs/locale/vi";

interface CalenderTimeProps {
  onTimeChange: (time: string) => void;
}

export const CalendarTime: React.FC<CalenderTimeProps> = ({ onTimeChange }) => {
  const handleTimeChange = (time: dayjs.Dayjs | null) => {
    if (time) {
      onTimeChange(time.format("HH:mm:ss"));
    } else {
      onTimeChange("");
    }
  };

  return (
    <Space style={{ margin: "0" }}>
      <TimePicker
        className="custom-timepicker"
        placeholder="HH:mm:ss"
        onChange={handleTimeChange}
        format="HH:mm:ss"
      />
    </Space>
  );
};

interface CalendarDateProps {
  onDateChange: (date: string) => void;
}

export const CalendarDateValue: React.FC<CalendarDateProps> = ({
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    onDateChange(date ? date.format("DD/MM/YYYY") : "");
  };

  return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
        className="custom-datepicker"
      />
    </Space>
  );
};
