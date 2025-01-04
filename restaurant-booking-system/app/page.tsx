"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });
  const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchAvailability = async () => {
    if (formData.date && formData.time) {
      const res = await fetch(
        `/api/availability?date=${formData.date}&time=${formData.time}`
      );
      const data = await res.json();
      setAvailability(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://restaurent-table-booking.vercel.app/api/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        const bookingDetails = data.details;
        setMessage(
          `Booking confirmed: Name - ${bookingDetails.name}, Date - ${bookingDetails.date}, Time - ${bookingDetails.time}, Guests - ${bookingDetails.guests}, Contact - ${bookingDetails.contact}`
        );
        setFormData({ date: "", time: "", guests: "", name: "", contact: "" });
      } else {
        setMessage(`Booking failed: ${data.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [formData.date, formData.time]);

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center overflow-y-hidden">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 ">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Restaurant Table Booking
            </h1>
          </div>
          {!message && (
            <form
              className="flex flex-col gap-5 text-gray-800"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <select
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a time
                </option>
                <option value="12:00">12:00</option>
                <option value="14:00">14:00</option>
                <option value="16:00">16:00</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
              </select>
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Guests"
                required
              />
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact"
                required
              />
              <button
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white focus:outline-none"
                type="submit"
              >
                Book Table
              </button>
            </form>
          )}

          {message && <p>{message}</p>}
          <ul>
            {availability.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
