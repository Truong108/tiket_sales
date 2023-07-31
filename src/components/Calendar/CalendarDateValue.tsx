import { DatePicker, Space, TimePicker, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dateFormatList = ["DD/MM/YYYY", "MM/DD/YYYY"];
dayjs.extend(customParseFormat);

interface CalenderTimeProps {
  onTimeChange: (date: string) => void;
}

export const CalendarTime: React.FC<CalenderTimeProps> = ({ onTimeChange }) => {
  const handleTimeChange = (time: any) => {
    onTimeChange(time.format("HH:mm:ss"));
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

export const CalendarDateValue: React.FC<CalendarDateProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [addedDates, setAddedDates] = useState<string[]>([]);

  const handleDateChange = (date: any) => {
    const selectedDayjsDate = dayjs(date);
    setSelectedDate(selectedDayjsDate);
  };

  const handleAddDate = () => {
    if (selectedDate && selectedDate.isValid()) {
      const formattedDate = selectedDate.format('DD/MM/YYYY');
      setAddedDates(prevDates => [...prevDates, formattedDate]);
      setSelectedDate(null);
    }
  };

  return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format={dateFormatList}
        className="custom-datepicker"
      />
      <Button onClick={handleAddDate}>Thêm</Button>
      <div>
        {addedDates.map((date, index) => (
          <div key={index}>{date}</div>
        ))}
      </div>
    </Space>
  );
};
