// appointments.js (Updated Mock API with 12-hour format)
let appointments = {};

function formatTime(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:00 ${suffix}`;
}

export function getAvailableSlots(date) {
  if (!appointments[date]) {
    appointments[date] = {};
  }
  const slots = [];
  for (let i = 9; i <= 18; i++) {
    slots.push(formatTime(i));
  }
  return slots.filter((slot) => !appointments[date][slot]);
}

export function bookSlot(date, slot) {
  if (!appointments[date]) {
    appointments[date] = {};
  }
  if (!appointments[date][slot]) {
    appointments[date][slot] = true;
    return { success: true };
  }
  return { success: false, message: "Slot already booked" };
}
