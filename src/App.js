import { ThemeProvider } from "styled-components";
import Navbar from "./components/global/Navbar";
import GlobalStyles from "./components/global//styles/Global";
import EventPage from "./Pages/EventPage/EventPage"
import { Route, Routes } from "react-router-dom";
import { Container } from "./components/global/styles/Container.styled";
import OrganizationPage from "./Pages/OrganizationPage/OrganizationPage";
import UserPage from "./Pages/UserPage/UserPage"
const theme = {
  colors: {
    header: '#fff',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
}


function App() {

  return (
    <ThemeProvider theme= {theme}>
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
