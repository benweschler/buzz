import { ThemeProvider } from "styled-components";
import GlobalStyles from "./components/global/styles/Global";
import OrganizationPage from "./Pages/OrganizationPage/OrganizationPage";

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
      <OrganizationPage />
    </ThemeProvider>
    
  );
}

export default App;
