import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: all 200ms ease-in;
  }

  .card {
    background: ${({theme}) => theme.card};
    transition: background 200ms ease-in,
    box-shadow 200ms ease-in,
    transform 200ms ease-in;
  }
`;

const baseTheme = {
  main: "#FFA700",
}

export const lightTheme = {
  ...baseTheme,
  body: 'rgb(247, 247, 247)',
  text: 'black',
  card: 'white',
  highlightCard: 'white',
  brightness: 'light',
}

export const darkTheme = {
  ...baseTheme,
  body: 'rgb(21,25,37)',
  text: 'white',
  card: 'rgb(32,37,45)',
  highlightCard: 'rgb(43, 49, 59)',
  brightness: 'dark',
}
