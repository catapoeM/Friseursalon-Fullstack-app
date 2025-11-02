import { useState } from "react";
import { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingDatePicker({ onChange }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Nur Montag–Freitag
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onChange(date);
      }}
      filterDate={isWeekday}
      minDate={new Date()} // keine Vergangenheit
      placeholderText="Wähle ein Datum"
      dateFormat="dd.MM.yyyy"
      className="date-picker-input"
    />
  );
}
