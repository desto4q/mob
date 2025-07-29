import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home/Home";
import { Dimensions } from "react-native";
import icons from "../utils/constants/icons";
import { TabIcon } from "../components/TabIcon";
import DrawerNav from "./DrawerNav";
import HomeStack from "./HomeStack";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import EmptyScreen from "../screens/home/EmptyScreen";
import ProfileStack from "./ProfileStack";
import ScanTicket from "../screens/scan/ScanTicket";
import { useToggleMode } from "../utils/helpers";
import WalletStack from "./WalletStack";
import { colors } from "../utils/constants";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

function UserTab() {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);

  //   const {mode:colorScheme, toggleColorMode} = useToggleMode();
  //  console.log('colorScheme', colorScheme);
  //  console.log('colorSchemeState', colorSchemeState);

  return (
    <Tab.Navigator
      key={colorScheme} // Force re-render when color scheme changes
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? colors.dark : "#fff",
          width: width,
          height: 90,
          paddingVertical: 10,
          paddingBottom: 15,
          alignItems: "center",
          justifyContent: "center",
          borderColor: colorScheme === "dark" ? colors.gray : "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label={"Home"}
              focused={focused}
              icon={icons.tab_icon1}
              width={22.13}
              height={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanTicket}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label={"Scan"}
              focused={focused}
              icon={icons.tab_icon2}
              width={24}
              height={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label={"Transactions"}
              focused={focused}
              icon={icons.tab_icon3}
              width={27}
              height={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              label={"Profile"}
              focused={focused}
              icon={icons.tab_icon4}
              width={25}
              height={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default UserTab;
