import { createNavigationContainerRef } from "@react-navigation/native";

type RootStackParamList = {
  SignIn: undefined; 
  Home: undefined;
  Profile: { userId: string }; 
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
