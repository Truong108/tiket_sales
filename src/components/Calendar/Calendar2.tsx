import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { DatePicker } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";

dayjs.locale("vi");

interface MonthValue {
  onMonthChange: (date: string) => void;
}
export const CalendarDate2: React.FC<MonthValue> = ({ onMonthChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<dayjs.Dayjs | null>(null);
  

  const handleMonthChange = (date: any) => {
    setSelectedMonth(date);
    onMonthChange(date.format("MM/YYYY"));
  };

  return (
    <>
      <DatePicker
        value={selectedMonth}
        onChange={handleMonthChange}
        format="MM/YYYY"
        picker="month"
        className="custom-datepicker"
        mode="month"
        locale={locale}
      />
    </>
  );
};