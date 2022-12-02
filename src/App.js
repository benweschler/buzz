import { useEffect, useState } from "react";
import Feed from "./pages/feed/Feed";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./theme/theme";
import Navbar from "./components/global/Navbar";
import EventPage from "./pages/event-page/EventPage";
import { Navigate, Route, Routes } from "react-router-dom";
import {Container} from "./components/global/styles/Container.styled";
import OrganizationPage from "./pages/organization-page/OrganizationPage";
import UserPage from "./pages/user-page/UserPage";
import LogRegCtrl from "./pages/form-pages/LogRegCtrl";
import CreateEvent from "./pages/form-pages/CreateEvent";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const {auth} = require('./firebase/index.js');

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === "light" ? darkTheme : lightTheme);

    useEffect(() => {
      async function getCurrentUser(id) {
        axios.get(
          `http://localhost:4000/api/users/${id}`
        ).then((response) => {
          if (response.data.success)
            navigate('/feed')
        })
      }

      auth.onIdTokenChanged(function(user) {
        if (user) {
          // User is signed in or token was refreshed.
          console.log('User has signed in!')
          getCurrentUser(user.uid);
        } else {
          navigate('/');
        }
      });
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Navbar/>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/log-or-sign-up"/>}/>
          <Route path="/feed" element={<Feed toggleTheme={toggleTheme}/>}/>
          <Route path="/event-page" element={<EventPage/>}/>
          <Route path="/organization-page" element={<OrganizationPage/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
          <Route path="/log-or-sign-up" element={<LogRegCtrl/>}/>
          <Route
            path="/create-event"
            element={<CreateEvent orgID="NYp9XtXAV19Pjjg9ECd7"/>}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
