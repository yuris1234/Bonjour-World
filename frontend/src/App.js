import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute } from "./components/Routes/Routes";
import { getCurrentUser } from "./store/session";
import LoginForm from "./components/SessionForms/LoginForm/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm/SignupForm";
import Modal from "./components/Modal";
import SplashPage from "./components/SplashPage";
import EventIndex from "./components/Event/EventIndex";
import EventForm from "./components/Event/EventForm";
import EventShow from "./components/Event/EventShow";
import UserProfile from "./components/UserProfile";
import AboutUs from "./components/AboutUs";
import MainPage from "./components/MainPage";
import NavBar from "./components/NavBar";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <>
        {loaded && (
          <>
            <Switch>
              <Route exact path="/" component={MainPage}></Route>
              <Route exact path="/aboutus" component={AboutUs}></Route>
              <Route exact path="/events" component={EventIndex}></Route>
              {/* <Route exact path="/events/new" component={EventForm}></Route> */}
              <Route
                exact
                path="/events/:eventId"
                component={EventShow}
              ></Route>
              <Route exact path="/profile/:id" component={UserProfile}></Route>
              <AuthRoute exact path="/login" component={LoginForm} />
              <AuthRoute exact path="/signup" component={SignupForm} />
            </Switch>
          </>
        )}
        <Modal />
      </>
    </>
  );
};

export default App;