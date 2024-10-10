import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Event name",
    start: new Date(2018, 0, 2, 10, 0),
    end: new Date(2018, 0, 2, 12, 0),
  },
  {
    title: "Event name",
    start: new Date(2018, 0, 4, 8, 0), 
    end: new Date(2018, 0, 4, 9, 30),
  },
  {
    title: "Event name",
    start: new Date(2018, 0, 5, 14, 0), 
    end: new Date(2018, 0, 5, 15, 30), 
  },
  {
    title: "Event name",
    start: new Date(2018, 0, 6, 20, 0), 
    end: new Date(2018, 0, 6, 22, 0), 
  },
];

const MyCalendar = () => {
  const [view, setView] = useState(Views.MONTH);

  return (
    <div className="App">
      <Header />
      <div className="container">
      <Sidebar />
      <div className="content">
        <div className="calendar-title">Calendar</div>
        <div className="calendar-container">
        <div className="calendar-view">Calendar View</div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={["month", "week", "day", "agenda"]}
            view={view}
            onView={(newView) => setView(newView)}
            defaultDate={new Date(2018, 0, 1)}
            popup
          />
        </div>
      </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>Inbox</li>
        <li>Products</li>
        <li>Invoices</li>
        <li>Customers</li>
        <li>Chat Room</li>
        <li>Calendar</li>
        <li>Help Center</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <div className="title-header">
      <h2>IMPEKABLE</h2>
      </div>
      <div className="header-container">
      <div>
      <i className="search-icon"></i>
      <input type="text" placeholder="Search transactions, invoices or help" />
      </div>
      <div className="user-info">
        <span className="notifications">
        <i className="support-icon"></i>
        <i className="text-icon"></i>
          <i className="bell-icon"></i>
        </span>
        <span className="user-name">John Doe</span>
        <i className="arrow-icon"></i>
        <i className="user-avatar"></i>
      </div>
      </div>
    </div>
  );
};

export default MyCalendar;