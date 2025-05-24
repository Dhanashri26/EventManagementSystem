import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./NavBarPages/About";
import Contact from "./NavBarPages/Contact";
import Home from "./NavBarPages/Home";
import Login from "./NavBarPages/Login";
import Navbar from "./NavBarPages/Navbar";
import Service from "./NavBarPages/Service";
import SignUp from "./NavBarPages/SignUp";

import AdminDashboard from "./AllDashboards/AdminDashboard";
import AttendeeDashboard from "./AllDashboards/AttendeeDashboard";
import OrganizerDashboard from "./AllDashboards/OrganizerDashboard";

import AllEvents from "./AdminPages/AllEvents";
import ManageCategories from "./AdminPages/ManageCategories";
import ManageVenues from "./AdminPages/ManageVenues";
import MyEvents from "./OrganizerPages/MyEvents";
import CreateEvent from "./OrganizerPages/CreateEvent";
import BrowseEvents from "./AttendeePages/BrowseEvents";
import MyRegistrations from "./AttendeePages/MyRegistrations";
import EventDetails from "./AdminPages/EventDetails";
import EventRegistration from "./AttendeePages/EventRegistration";

import Success from "./OtherPage/Success";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          {/* Admin Dashboards it's pages  */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AllEvents />} />
          <Route path="/event-details/:id" element={<EventDetails />} />{" "}
          {/* Add this route */}
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/venues" element={<ManageVenues />} />
          {/* Organizer Dashboards it's pages  */}
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/allEvents" element={<MyEvents />} />
          <Route path="/organizer/events" element={<CreateEvent />} />
          {/* Attendee Dashboards it's pages  */}
          <Route path="/attendee-dashboard" element={<AttendeeDashboard />} />
          <Route path="/attendee/events" element={<BrowseEvents />} />
          <Route
            path="/attendee/register/:id"
            element={<EventRegistration />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/attendee/registrations" element={<MyRegistrations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
