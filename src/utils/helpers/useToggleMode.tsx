import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleMode } from "../../state/features/slices/userSlice";
import { useColorScheme,  } from "nativewind";
import { useAppColorScheme } from "twrnc";
import tw from "../../lib/tailwind";

export const useToggleMode = () => {
  const { toggleColorScheme, colorScheme, setColorScheme } = useColorScheme();

  const [twrncColorScheme, toggleTwrncColorScheme, setTwrncColorScheme] = useAppColorScheme(tw);

  const dispatch = useDispatch();
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme:any = await AsyncStorage.getItem("mode");
      console.log("storedTheme", storedTheme);
      if (storedTheme) {
        setTwrncColorScheme(storedTheme)
        setColorScheme(storedTheme)
        setMode(storedTheme);
        dispatch(toggleMode(storedTheme));
      }else{
        setTwrncColorScheme('dark');
        setColorScheme('dark');
        setMode('dark');
        dispatch(toggleMode('dark'));
      }
    };
    loadTheme();
  }, [dispatch]);

  const toggleColorMode = useCallback(async () => {
    const newScheme = mode === "light" ? "dark" : "light";
    setMode(newScheme);
    setTwrncColorScheme(newScheme);
    setColorScheme(newScheme)
    dispatch(toggleMode(newScheme));
    await AsyncStorage.setItem("mode", newScheme);
  }, [mode, dispatch]);

  return { mode, toggleColorMode };
};
