import { createGlobalStyle } from "styled-components";

const lightbg = "#e0dcdc";
const darkbg = "#20222F";
const lightfont = "#F7F9FF";
const darkfont = "#20222F";

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => (props.light ? lightbg : darkbg)};
  }

  header{
    background: ${props => (props.light ? darkbg : lightbg)};
    color: ${props => (props.light ? lightfont : darkfont)};
  }

  h5, label{
    color: ${props => (props.light ? darkfont : lightfont)};
  }

  .disclaimer{
    font-size: small;
    text-align:right;
  }

`;
