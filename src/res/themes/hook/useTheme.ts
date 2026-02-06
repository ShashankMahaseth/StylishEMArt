import { useColorScheme } from "react-native";
import { lightTheme, darkTheme, ThemeColors } from "../themes";

export const useTheme = (): ThemeColors => {
  const scheme = useColorScheme(); // 'light' | 'dark'
  return scheme === "dark" ? darkTheme : lightTheme;
};
