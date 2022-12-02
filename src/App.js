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
import CreateOrEditEvent from "./pages/form-pages/CreateOrEditEvent";
import CreateOrg from "./pages/form-pages/components/CreateOrg";

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {onAuthStateChanged} from 'firebase/auth';
const {auth} = require('./firebase/index.js');

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === "light" ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Navbar/>
      <Container>
        <Routes>
          
          <Route exact path="/" element={
            JSON.parse(localStorage.getItem('user')).id ? (
              <Feed toggleTheme={toggleTheme}/>
            ) : (
              <Navigate to="/log-or-sign-up"/>
            )
            }/>
          <Route path="/feed" element={<Feed toggleTheme={toggleTheme}/>}/>
          <Route path="/event-page" element={<EventPage/>}/>
          <Route path="/organization-page" element={<OrganizationPage/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
          <Route path="/log-or-sign-up" element={<LogRegCtrl/>}/>
          <Route  path="/create-event"
            element={<CreateOrEditEvent orgID="AO0movdTMMnS3wfVHhGC"/>}/>
          <Route path="/create-organization" element={<CreateOrg/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
