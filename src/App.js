import {useEffect, useState} from "react";
import Feed from "./pages/feed/Feed";
import {ThemeProvider} from "styled-components";
import {GlobalStyles, lightTheme, darkTheme} from "./theme/theme";
import Navbar from "./components/global/Navbar";
import EventPage from "./pages/event-page/EventPage"
import {Navigate, Route, Routes} from "react-router-dom";
import { Container } from "./components/global/styles/Container.styled";
import OrganizationPage from "./pages/organization-page/OrganizationPage";
import UserPage from "./pages/user-page/UserPage"
import  secureLocalStorage  from  "react-secure-storage";
import LogRegCtrl from "./pages/form-pages/LogRegCtrl";
import CreateEvent from "./pages/form-pages/CreateEvent";

import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === 'light' ? darkTheme : lightTheme);

  useEffect(() => {
    secureLocalStorage.setItem(
      "private-key",
      "25ded69a67835050b3a2e1beb92812eb521cfc39"
    )
    console.log(secureLocalStorage.getItem("private-key"));


    async function getCurrentUser() {
      setTimeout(() => {}, 500)
      const token = JSON.parse(localStorage.getItem('token'));
      const userID = JSON.parse(localStorage.getItem('user')).id;
      if (userID && (token.length > 0)) {
        return axios.get(
          `http://localhost:4000/api/users/token/${token}`
        ).then((response) => {
          console.log(response);
          if (response.data.success) {
            console.log('User is logged in!');
            navigate('/feed');
          } else {
            console.log('No user logged in!');
          }
        })
      }
    }

    getCurrentUser().catch((e) => console.log("ERROR WITH AUTHENTICATING USER:", e))
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/log-or-sign-up" />} />
          <Route path="feed" element={<Feed toggleTheme={toggleTheme}/>}/>
          <Route path="/event-page" element={<EventPage />} />
          <Route path="/organization-page" element={<OrganizationPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/log-or-sign-up" element={<LogRegCtrl/>} />
          <Route path="/create-event" element={<CreateEvent/>} />
        </Routes>
      </Container>
    </ThemeProvider>

  );
}

export default App;
