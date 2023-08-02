import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Space, TimePicker } from "antd";

interface CalendarValue {
    dateValue: dayjs.Dayjs | null;
    onDateChange: (date: dayjs.Dayjs | null) => void;
  }
  
  export const UpdateCalendar: React.FC<CalendarValue> = ({ dateValue, onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  
    useEffect(() => {
      setSelectedDate(dateValue);
    }, [dateValue]);
  
    const handleDateChange = (date: any, dateString: string) => {
      const dayjsDate = date ? dayjs(date) : null; 
      setSelectedDate(dayjsDate); 
      onDateChange(dayjsDate); 
    };
  
    return (
      <Space direction="vertical" size={12} style={{ margin: "0" }}>
        <DatePicker
          value={selectedDate}
          format="DD/MM/YYYY"
          className="custom-datepicker"
          onChange={handleDateChange}
        />
      </Space>
    );
  };

interface TimeValue {
    timeValue: dayjs.Dayjs | null;
    onTimeChange: (time: dayjs.Dayjs | null) => void;
  }
  
  export const UpdateTimeCalendar: React.FC<TimeValue> = ({ timeValue, onTimeChange }) => {
    const [selectedTime, setSelectedTime] = useState<dayjs.Dayjs | null>(null);
  
    useEffect(() => {
      setSelectedTime(timeValue);
    }, [timeValue]);
  
    const handleChaneTime = (time: any, timeString: string) => {
      const dayjsTime = time ? dayjs(timeString, "HH:mm:ss") : null;
      setSelectedTime(dayjsTime);
      onTimeChange(dayjsTime);
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
