import React from "react";

import { ThemeProvider } from "styled-components";
import UserPage from "./pages/UserPage/UserPage";

// styled components global theme
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
    <ThemeProvider theme = {theme}>
      <UserPage /> 
    </ThemeProvider>
  );
}

export default App;
