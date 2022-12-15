import { createContext } from "react";

const darkTheme = {

};

const lightTheme = {

};

const ThemeContext = createContext(lightTheme)

export { darkTheme, lightTheme };
export default ThemeContext;
