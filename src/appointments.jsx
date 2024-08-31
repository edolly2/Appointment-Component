// Mock Appointments API

let appointments = {};

export function getAvailableSlots() {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    slots.push(`${i}:00`);
  }
  return slots.filter((slot) => !appointments[slot]);
}

export function bookSlot(slot) {
  if (!appointments[slot]) {
    appointments[slot] = true;
    return { success: true };
  }
  return { success: false, message: "Sorry, that slot is already booked." };
}
