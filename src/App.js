import React, {  useCallback, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./App.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const MyCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent2, setSelectedEvent2] = useState(null); 
  const [showPopup2, setShowPopup2] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [state, setState] = useState({
    events: [
      {
        start: moment().add(1, "days").toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
        id: 0,
        color: 'blue'
      },
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title2",
        id: 1,
        color: 'red'
        
      },
      {
        start: moment().add(2, "days").toDate(),
        end: moment().add(3, "days").toDate(),
        title: "Some title3",
        id: 2,
        color: 'green'
      },
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title4",
        id: 3,
        color: 'yellow'
      },
    ],
  });
  const onEventResize = (data) => {
    const { start, end } = data;

    setState((state) => {
      state.events[data.event.id].start = start;
      state.events[data.event.id].end = end;
      return { events: [...state.events] };
    });
  };

  const handleSelectSlot = ({ start, end }, e) => {
    const title = '';
    const id = state.events.length;
    const color = 'blue';
    setSelectedEvent2({ title, start, end, id, color });
    
    setShowPopup2(true);

    const calendarContainer = document.querySelector(".rbc-month-view");
    const rect = calendarContainer.getBoundingClientRect();
    setPopupPosition({ top: rect.top + window.scrollY + 50, left: rect.left + window.scrollX + 50 });

  };

  // const handleSelectSlot = useCallback(
  //   ({ start, end }) => {
  //     const title = window.prompt('New Event Name(max 30 chars)');
  //     if (title && title.length <= 30) {
  //       setState((state) => {
  //         console.log(state.events.length);
  //         const id = state.events.length;
  //       return { events: [...state.events, { start, end, title, id }] };
  //       });
  //     }
  //   },
  // )

  const handleDelete = useCallback(
    () => {
      setState((state) => {
        setShowPopup(false);
      return { events: state.events.filter(event => event.id !== selectedEvent.id) };
    });
    },
  )

  const handleSelectEvent = (event, e) => {
    setSelectedEvent(event);
    setShowPopup(true);

    const rect = e.target.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height;
    const left = rect.left + window.scrollX;

    setPopupPosition({ top, left });
  };
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      setSelectedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: new Date(value), 
      }));
    } else if (name === "title" || name === "color") {
      setSelectedEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
    console.log(selectedEvent);
  };

  const handleEventChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      setSelectedEvent2((prevEvent) => ({
        ...prevEvent,
        [name]: new Date(value), 
      }));
    } else if (name === "title" || name === "color") {
      setSelectedEvent2((prevEvent) => ({
        ...prevEvent,
        [name]: value,
      }));
    }
    console.log(selectedEvent2);
  };

  const saveEventChanges = () => {
    setState((state) => {
      state.events[selectedEvent.id].start = selectedEvent.start;
      state.events[selectedEvent.id].end = selectedEvent.end;
      state.events[selectedEvent.id].title = selectedEvent.title;
      state.events[selectedEvent.id].color = selectedEvent.color;
      setShowPopup(false);
      return { events: [...state.events] };
    });
  };

  const saveEventChanges2 = () => {
    setState((state) => {
      const start = selectedEvent2.start;
      const end = selectedEvent2.end;
      const title = selectedEvent2.title;
      const color = selectedEvent2.color;
                console.log(state.events.length);
                const id = state.events.length;
              return { events: [...state.events, { start, end, title, id, color }] };
              });
  };

  const onEventDrop = (data) => {
    const { start, end } = data;
    console.log(data);
    
    setState((state) => {
      state.events[data.event.id].start = start;
      state.events[data.event.id].end = end;
      return { events: [...state.events] };
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
      <Sidebar />
      <div className="content">
        <div className="calendar-title">Calendar</div>
        <div className="calendar-container">
        <div className="calendar-view">Calendar View</div>
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={state.events}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectSlot={handleSelectSlot}
          selectable
          resizable
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          showAllEvents={true}
          eventPropGetter={(event) => ({
            style: { backgroundColor: event.color },
          })}
        />
        {showPopup && selectedEvent && (
        <div
          className="popup"
          style={{
            top: popupPosition.top + "px",
            left: popupPosition.left + "px",
          }}
        >
          <div className="close-popup" onClick={() => setShowPopup(false)}>
            &times;
          </div>
            <input
              type="text"
              name="title"
              value={selectedEvent.title}
              onChange={handleEventChange}
            />
            <input
              type="datetime-local"
              name="start"
              value={moment(selectedEvent.start).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEventChange}
            />
            <input
              type="datetime-local"
              name="end"
              value={moment(selectedEvent.end).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEventChange}
            />
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={selectedEvent.color}
              onChange={handleEventChange}
            />
          </label>
          <button className="discard" onClick={handleDelete}>DISCARD</button>
          <button  className="edit" onClick={saveEventChanges}>EDIT</button>
        </div>
      )}
      {showPopup2 && (
        <div
          className="popup"
          style={{
            top: popupPosition.top + "px",
            left: popupPosition.left + "px",
          }}
        >
          <div className="close-popup" onClick={() => setShowPopup2(false)}>
            &times;
          </div>
            <input
              type="text"
              name="title"
              value={selectedEvent2.title}
              onChange={handleEventChange2}
            />
            <input
              type="datetime-local"
              name="start"
              value={moment(selectedEvent2.start).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEventChange2}
            />
            <input
              type="datetime-local"
              name="end"
              value={moment(selectedEvent2.end).format("YYYY-MM-DDTHH:mm")}
              onChange={handleEventChange2}
            />
          <label>
            Color:
            <input
              type="color"
              name="color"
              value={selectedEvent2.color}
              onChange={handleEventChange2}
            />
          </label>
          <button className="discard" onClick={() => setShowPopup2(false)}>Cancel</button>
          <button  className="edit" onClick={saveEventChanges2}>Save</button>
        </div>
      )}
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