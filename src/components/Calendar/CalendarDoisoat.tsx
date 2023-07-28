import { DatePicker, Space, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dateFormatList = ["DD/MM/YYYY"];
dayjs.extend(customParseFormat);
interface CalenderTimeProps {
  onTimechane: (date: string) => void;
}
export const CalendarTime: React.FC<CalenderTimeProps> = ({ onTimechane }) => {
  const handleTimeChange = (time: any) => {
    onTimechane(time.format("HH:mm:ss"));
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
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    onDateChange(date ? date.format("DD/MM/YYYY") : null);
  };
return (
    <Space direction="vertical" size={12} style={{ margin: "0" }}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format={dateFormatList}
        className="custom-datepicker"
      />
    </Space>
  );
};