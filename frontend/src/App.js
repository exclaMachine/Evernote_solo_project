import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AboutFooter from "./components/Navigation/About";

import NotebookList from "./components/NotebookList";
import AddNotebook from './components/AddNotebook'
import Splashpage from "./components/Splashpage";
import NoteList from "./components/NoteList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
      <Switch>
        <Route exact path='/'>
          <Splashpage/>
        </Route>
        <Route path='/api/notes'>
          <NoteList />
        </Route>
        <Route path="/api/notebooks">
          <AddNotebook/>
          <NotebookList/>
        </Route>

      </Switch>
    </>
  );
}

export default App;
