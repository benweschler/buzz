import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Permanent+Marker&family=Poppins&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.colors.body};
    color: hsl(192, 100%, 9%);
    font-family: 'Poppins', sans-serif;
    font-size: 1.15em;
    margin: 0;
  }
  p {
    opacity: 0.6;
    line-height: 1.5;
    
  }
  img {
    max-width: 100%;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: hsl(192, 100%, 9%);
    
  }
  a:hover {
    color: #ffba00
  }

  h1{
    font-family: 'Permanent Marker', cursive;
  }
`;

export default GlobalStyles;
