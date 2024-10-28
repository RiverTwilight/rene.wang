import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<{ isDark: boolean }>`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Icons&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${(props) => (props.isDark ? "#202124" : "#f0f0f0")};
    color: ${(props) => (props.isDark ? "#fff" : "#333")};
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => (props.isDark ? "#202124" : "#f0f0f0")};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => (props.isDark ? "#444" : "#ccc")};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => (props.isDark ? "#555" : "#bbb")};
  }
`;
