import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface ColorScheme {
	colorScheme: string;
	setColorScheme: Dispatch<SetStateAction<string>>;
}

const ColorSchemeContext = createContext<ColorScheme>({
	colorScheme: "light",
	setColorScheme: () => "light",
});

export const useColorScheme = () => useContext(ColorSchemeContext);

export const ColorSchemeProvider = ColorSchemeContext.Provider;
