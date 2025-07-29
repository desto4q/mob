import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home/Home";
import DrawerIcon from "../components/DrawerIcon";
import icons from "../utils/constants/icons";
import CustomDrawerContent from "../components/CustomDrawerContent";
import ProfileBrief from "../components/ProfileBrief";
import { View } from "react-native";
import tw from "twrnc";
import UserTab from "./BottomTab";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import EmptyScreen from "../screens/home/EmptyScreen";
import Membership from "../screens/membership/Membership";
import HomeStack from "./HomeStack";
import IdCardManagement from "../screens/IdCard/IdCardManagement";
import EventOverview from "../screens/events/EventOverview";
import VerificationOverview from "../screens/verify/VerificationOverview";
import EventStack from "./EventStack";
import { useToggleMode } from "../utils/helpers";
import WalletStack from "./WalletStack";
import DrawerHomeIcon from "../components/DrawerHomeIcon";

const Drawer = createDrawerNavigator();

function DrawerNav({ navigation }: any) {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  //const {mode:colorScheme, toggleColorMode} = useToggleMode();

  return (
    <Drawer.Navigator
      key={colorScheme}
      screenOptions={{
        headerShown: false,
        drawerHideStatusBarOnOpen: false,
        drawerStyle: {
          width: 325,
          backgroundColor: colorScheme === "dark" ? "#0A0909" : "#fff",
          paddingHorizontal: 10,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          drawerItems={[
            //   { label: "Profile", icon: icons.tab_icon4, screen: "Home" },
            //   { label: "Wallet", icon: icons.tab_icon3, screen: "Wallet" },
            { label: "Logout", icon: icons.logout_icon, screen: "Logout" },
          ]}
        />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={UserTab}
        options={{
          drawerLabel: () => null,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <View style={tw`m-0 p-0`}>
              <DrawerHomeIcon
                focused={focused}
                label="Home"
                icon={icons.tab_icon4}
                onPress={() => {
                  navigation.navigate("Home");
                  // console.log("I was clicked");
                }}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Wallet"
        component={WalletStack}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="Transaction History"
              icon={icons.tab_icon3}
              onPress={() => navigation.navigate("Wallet")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Membership"
        component={Membership}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="Membership & Subscription"
              icon={icons.member}
              onPress={() => navigation.navigate("Membership")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Idcards"
        component={IdCardManagement}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="ID Cards"
              icon={icons.card}
              onPress={() => navigation.navigate("Idcards")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Events"
        component={EventStack}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="Events"
              icon={icons.event}
              onPress={() => navigation.navigate("Events")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Verify"
        component={VerificationOverview}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="Verify"
              icon={icons.verify}
              onPress={() => navigation.navigate("Verify")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Help"
        component={EmptyScreen}
        options={{
          drawerLabel: () => null,
          headerShown: false,
          // drawerActiveBackgroundColor: "#0A0909",
          drawerIcon: ({ size, color, focused }) => (
            <DrawerIcon
              focused={focused}
              label="Help Center"
              icon={icons.help}
              onPress={() => navigation.navigate("ContactUsScreen")}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNav;
