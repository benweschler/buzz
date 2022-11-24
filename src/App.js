import {useState} from "react";
import Feed from "./pages/feed/Feed";
import {GlobalStyles, lightTheme, darkTheme} from "./theme/theme";
import {ThemeProvider} from "styled-components";

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () =>
    setTheme(theme.brightness === 'light' ? darkTheme : lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Feed toggleTheme={toggleTheme}/>
    </ThemeProvider>
  );
}

export default App;
