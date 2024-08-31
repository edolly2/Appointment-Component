import { useState, useEffect } from "react";
import { getAvailableSlots, bookSlot } from "./appointments";

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadAvailableSlots = (date) => {
    const slots = getAvailableSlots(date);
    setAvailableSlots(slots);
  };

  const handleBookSlot = () => {
    if (selectedDate && selectedSlot) {
      const response = bookSlot(selectedDate, selectedSlot);
      if (response.success) {
        alert(`Appointment booked for ${selectedDate} at ${selectedSlot}`);
        loadAvailableSlots(selectedDate); // Reload available slots
        setSelectedSlot(""); // Reset selected slot
      } else {
        alert(response.message);
      }
    } else {
      alert("Please select both a date and a time slot");
    }
  };

  return (
    <div>
      <h1>Appointment Scheduler</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        disabled={!selectedDate}
      >
        <option value="">Select a time slot</option>
        {availableSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <button onClick={handleBookSlot}>Book Appointment</button>
    </div>
  );
};

export default AppointmentScheduler;
