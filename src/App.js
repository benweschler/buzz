import { ThemeProvider } from "styled-components";
import Navbar from "./components/global/Navbar";
import GlobalStyles from "./theme/GlobalStyles"
import EventPage from "./pages/event-page/EventPage"
import { Route, Routes } from "react-router-dom";
import { Container } from "./components/global/styles/Container.styled";
import OrganizationPage from "./pages/organization-page/OrganizationPage";
import UserPage from "./pages/user-page/UserPage"
import { baseTheme } from "./theme/theme";


function App() {

  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      <Navbar />  
      <Container>
        <Routes>
          <Route path="/event-page" element={<EventPage />} />
          <Route path="/organization-page" element={<OrganizationPage />} />
          <Route path="/user-page" element={<UserPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
    
  );
}

export default App;
