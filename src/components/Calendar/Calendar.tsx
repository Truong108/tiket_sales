import { DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

interface ValueCalendar{
    date: dayjs.Dayjs | null;
    onDateChange: (date: dayjs.Dayjs) => void
}
export const CalendarDatevl: React.FC<ValueCalendar> = ({date, onDateChange}) => {
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(date);
    useEffect(() => {
      setSelectedDate(date);
    }, [date]);
    const handleDateChange = (date: any) => {
      setSelectedDate(date);
      onDateChange(date);
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