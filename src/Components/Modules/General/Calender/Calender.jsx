import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calender.css";

const localizer = momentLocalizer(moment);
const holidays = [
  {
    title: "New Year's Day",
    start: new Date(2024, 0, 1),
    end: new Date(2024, 0, 1),
  },
  {
    title: "Independence Day",
    start: new Date(2024, 7, 15),
    end: new Date(2024, 7, 15),
  },
  {
    title: "Christmas Day",
    start: new Date(2024, 11, 25),
    end: new Date(2024, 11, 25),
  },
];

const Calender = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(holidays);
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = holidays.some(
      (holiday) => holiday.title === event.title
    )
      ? "#ff6347"
      : "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <div className="my-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh", width: "100%" }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calender;
