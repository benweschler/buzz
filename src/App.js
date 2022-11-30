import {useState} from "react";
import Feed from "./pages/feed/Feed";
import {ThemeProvider} from "styled-components";
import {GlobalStyles, lightTheme, darkTheme} from "./theme/theme";
import Navbar from "./components/global/Navbar";
import EventPage from "./pages/event-page/EventPage"
import {Navigate, Route, Routes} from "react-router-dom";
import { Container } from "./components/global/styles/Container.styled";
import OrganizationPage from "./pages/organization-page/OrganizationPage";
import UserPage from "./pages/user-page/UserPage";
import LogRegCtrl from "./pages/form-pages/LogRegCtrl";
import CreateEvent from "./pages/form-pages/CreateEvent";

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === 'light' ? darkTheme : lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path="feed" element={<Feed toggleTheme={toggleTheme}/>}/>
          <Route path="/event-page" element={<EventPage />} />
          <Route path="/organization-page" element={<OrganizationPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/log-or-sign-in" element={<LogRegCtrl/>} />
          <Route path="/create-event" element={<CreateEvent/>} />
        </Routes>
      </Container>
    </ThemeProvider>

  );
}

export default App;
