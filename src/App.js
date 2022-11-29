import { ThemeProvider } from "styled-components";
import Navbar from "./components/global/Navbar";
import GlobalStyles from "./components/global//styles/Global";
import EventPage from "./Pages/EventPage/EventPage"
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
      <EventPage />
    </ThemeProvider>
    
  );
}

export default App;
