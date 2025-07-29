import "react-native-gesture-handler";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/state/store";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OffLine } from "./src/components/Offline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import tw from "./src/lib/tailwind";
import { useAppSelector } from "./src/state/hooks";
import LogoutModal from "./src/components/modals/LogoutModal";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          inter: require("./assets/fonts/Inter-VariableFont_opsz,wght.ttf"),

          montserrat_regular: require("./assets/fonts/Montserrat-Regular.ttf"),
          montserrat_medium: require("./assets/fonts/Montserrat-Medium.ttf"),

          unbounded_black: require("./assets/fonts/Unbounded-Black.ttf"),
          unbounded_extrabold: require("./assets/fonts/Unbounded-ExtraBold.ttf"),
          unbounded_bold: require("./assets/fonts/Unbounded-Bold.ttf"),
          unbounded_semibold: require("./assets/fonts/Unbounded-SemiBold.ttf"),
          unbounded_regular: require("./assets/fonts/Unbounded-Regular.ttf"),
          unbounded_medium: require("./assets/fonts/Unbounded-Medium.ttf"),
        });
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 3000);
      } catch (error) {
        console.error("Error loading fonts: ", error);
      } finally {
        setAppIsLoaded(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    return null;
  }
  let client = new QueryClient();
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "inter" };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider onLayout={onLayout}>
        <View style={{ flex: 1 }}>
          <OffLine />
          <Provider store={store}>
            <QueryClientProvider client={client}>
              <AppNavigator />
              <LogoutModal />
              <StatusBar style="auto" />
            </QueryClientProvider>
          </Provider>
          <Toast />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
