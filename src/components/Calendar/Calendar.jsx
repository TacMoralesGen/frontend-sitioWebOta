import React, { useState } from 'react';

const Calendar = ({ onSelectDays }) => {
  const startDate = new Date('2025-01-29');
  const endDate = new Date('2025-02-04');
  const [selectedDays, setSelectedDays] = useState(new Set());

  const toggleDay = (day) => {
    const updatedDays = new Set(selectedDays);
    if (updatedDays.has(day)) {
      updatedDays.delete(day);
    } else {
      updatedDays.add(day);
    }
    setSelectedDays(updatedDays);
    onSelectDays(updatedDays);
  };

  const renderCalendar = () => {
    let date = new Date(startDate);
    const days = [];

    while (date <= endDate) {
      const dayString = date.toISOString().split('T')[0];
      const isSelected = selectedDays.has(dayString);

      days.push(
        <div
          key={dayString}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => toggleDay(dayString)}
        >
          {date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'short' })}
        </div>
      );

      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  return <div className="calendar">{renderCalendar()}</div>;
};

export default Calendar;
