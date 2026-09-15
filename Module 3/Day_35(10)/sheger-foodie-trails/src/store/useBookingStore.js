import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
        })),
      cancelBooking: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.filter((b) => b.bookingId !== bookingId),
        })),
    }),
    { name: "sheger-bookings-storage" }
  )
);

export default useBookingStore;