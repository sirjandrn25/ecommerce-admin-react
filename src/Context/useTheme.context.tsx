import { createContext, useContext, useEffect, useState } from "react";
import { useMedia } from "react-use";

type themeTypes = "dark" | "light" | "night" | "cupcake" | "cmyk" | "luxury";

type ThemeContextProviderProps = {
	children: React.ReactNode;
};
interface ThemeContextInterface {
	theme: themeTypes;
	handleChangeTheme: (value: themeTypes) => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
	theme: "dark",
	handleChangeTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
	const isDarkTheme = useMedia("(prefers-color-scheme: dark)");
	const [theme, setTheme] = useState<themeTypes>(
		isDarkTheme ? "dark" : "light"
	);

	useEffect(() => {
		if (!document) return;

		(document as any)
			.querySelector("html")
			.setAttribute("data-theme", theme);
	}, [theme]);
	const handleChangeTheme = (currentTheme: themeTypes): void => {
		setTheme(currentTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, handleChangeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const { theme, handleChangeTheme } = useContext(ThemeContext);
	return { theme, handleChangeTheme };
};

export default ThemeContext;
