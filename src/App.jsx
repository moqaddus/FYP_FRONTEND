import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./App.css";
import NavBar from "./components/SharedComponents/NavBar";
import Start from "./components/HomeAboutContact/Start";
import SignUp from "./components/SignUpLogIn/SignUp";
import LogIn from "./components/SignUpLogIn/LogIn";
import Footer from "./components/SharedComponents/Footer";
import ContactUs from "./components/HomeAboutContact/ContactUs";
import AboutUs from "./components/HomeAboutContact/AboutUs";
import HomeDiv from "./components/HomeAboutContact/HomeDiv";
import AdminProfile from "./components/Admin/AdminProfile";
import SuggestionsPage from "./components/Admin/SuggestionsPage";
import AddInterest from "./components/Admin/AddInterest";
import Event from "./components/Events/Event";
import SingleEvent from "./components/Events/SingleEvent";
import UserProfile from "./components/Profiles/UserProfile";
import OrgProfile from "./components/Profiles/OrgProfile";
import EventCard from "./components/Events/AllEvents";
import CreateEventForm from "./components/Events/CreateEvent";
import EditOrganizationForm from "./components/Profiles/EditOrgProfile";
import EditUserForm from "./components/Profiles/EditUserProfile";
import Home from "./components/Payment/Home";
import Success from "./components/Payment/Success";
import PaymentUnsuccessful from "./components/Payment/Cancelled";
import AllOrgs from "./components/PlatformUser/getAllOrganizations";
import ChatHome from "./components/Chat/ChatHome";
import EditEvent from "./components/Events/EditEvent";
import AttendeeList from "./components/Events/AttendeeListEvent";
import PendingReviewPage from "./components/Events/PendingReviewPage";
import RatingReviewPage from "./components/Events/RatingReviewPage";
import ShowRatingAndReview from "./components/Events/ShowRatingAndReview";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  
  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> Pass isLoggedIn and handleLogout as props
      {/* <NavBar /> */}
      <Switch>
       <Route path="/" exact component={Start} />
        <Route path="/home" component={HomeDiv} />
        <Route path="/about" component={AboutUs} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" render={() => <LogIn handleLogin={handleLogin} />} /> {/* Pass handleLogin as prop */}
        {/* <Route path="/login" component={LogIn} /> */}
        <Route path="/contact" component={ContactUs} />
        <Route path="/event" component={Event} />
        <Route path="/singleEvent/:eventId" component={SingleEvent} />
        <Route path="/userProfile/:userId?" component={UserProfile} />
        <Route path="/orgProfile/:orgId?" component={OrgProfile} />
        <Route path="/allEvents" component={EventCard} />
        <Route path="/createEvent" component={CreateEventForm} />
        <Route path="/editOrg" component={EditOrganizationForm} />
        <Route path="/editUser" component={EditUserForm} />
        <Route path="/checkout" component={Home} />
        <Route path="/payment/success" component={Success} />
        <Route path="/payment/cancel" component={PaymentUnsuccessful} />
        <Route path="/allOrgs" component={AllOrgs} />
        <Route path="/chatHome" component={ChatHome} />
        <Route path="/editEvent/:eventId" component={EditEvent} />
        <Route path="/attendeeList/:eventId" component={AttendeeList} />
        <Route path="/admin" component={AdminProfile}/>
        <Route path="/suggestions" component={SuggestionsPage}/>
        <Route path="/addInterest" component={AddInterest}/>
        <Route path="/pendingReview/:attendeeId?" component={PendingReviewPage}/>
        <Route path="/rating/:attendeeId?" component={RatingReviewPage}/>
        <Route path="/showRating/:eventId?" component={ShowRatingAndReview}/>
        {/* <Route path="/averageReview/:eventId?" component={AverageReview}/> */}
        
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

