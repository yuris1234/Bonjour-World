import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar";
import SplashPage from "./components/MainPage";
import SignupForm from "./components/SessionForms/SignupForm";
import LoginForm from "./components/SessionForms/LoginForm";
import { getCurrentUser } from "./store/session";
const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);
  return (
    loaded && (
      <>
        <Switch>
          <Route exact path="/">
            <NavBar />
            <SplashPage />
          </Route>
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
        </Switch>
      </>
    )
  );
};
export default App;
