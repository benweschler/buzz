import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: background 200ms ease-in, color 200ms ease-in;
  }

  .card {
    background: ${({theme}) => theme.card};
    transition: all 200ms ease-in;
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
