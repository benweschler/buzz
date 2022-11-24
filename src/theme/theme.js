import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --theme-transition: all 200ms ease-in;
  }

  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: var(--theme-transition)
  }

  .card {
    background: ${({theme}) => theme.card};
    transition: var(--theme-transition);
  }
`;

const baseTheme = {
  main: "#d5563b",
}

export const lightTheme = {
  ...baseTheme,
  body: 'rgb(247, 247, 247)',
  text: 'black',
  card: 'white',
  brightness: 'light',
}

export const darkTheme = {
  ...baseTheme,
  body: 'rgb(21,25,37)',
  text: 'white',
  card: 'rgb(32,37,45)',
  brightness: 'dark',
}
