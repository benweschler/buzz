import { useState } from "react";
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
import CreateOrg from "./pages/form-pages/components/CreateOrg";
import CreateEvent from "./pages/form-pages/CreateEvent";

function App() {
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
            (JSON.parse(localStorage.getItem('user')) &&
            JSON.parse(localStorage.getItem('user')).id) ? (
              <Feed toggleTheme={toggleTheme}/>
            ) : (
              <Navigate to="/log-or-sign-up"/>
            )
            }/>
          <Route path="/feed" element={<Feed toggleTheme={toggleTheme}/>}/>
          <Route path="/event-page/:id" element={<EventPage/>}/>
          <Route path="/organization-page/:id" element={<OrganizationPage/>}/>
          <Route path="/user-page" element={<UserPage/>}/>
          <Route path="/log-or-sign-up" element={<LogRegCtrl/>}/>
          <Route path="/create-organization" element={<CreateOrg/>}/>
          <Route path="/create-event/:id" element={<CreateEvent/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
