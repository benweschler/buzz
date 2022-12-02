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
import CreateOrg from "./pages/form-pages/CreateOrg";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === "light" ? darkTheme : lightTheme);

  useEffect(() => {
    console.log("useEffect query in App")

    async function getCurrentUser() {
      const token = JSON.parse(localStorage.getItem('token'));
      const userID = JSON.parse(localStorage.getItem('user')).id;
      if (userID && (token.length > 0)) {
        return axios.get(
          `http://localhost:4000/api/users/token/${token}`
        ).then((response) => {
          if (response.data.success)
            navigate('/feed')
        })
      }
    }

    getCurrentUser()
      .catch((e) => console.log("ERROR WITH AUTHENTICATING USER:", e))
    //TODO: figure out why eslint says useEffect needs navigate as a dependency
    // eslint-disable-next-line
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
          <Route  path="/create-event"
            element={<CreateEvent orgID="NYp9XtXAV19Pjjg9ECd7"/>}/>
          <Route path="/create-organization" element={<CreateOrg/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
