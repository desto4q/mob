import { Image, Pressable, View } from "react-native";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import images from "../../utils/constants/images";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import { useToggleMode } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import BaseText from "../BaseText";
import { colors } from "../../utils/constants";
import { useGetNotificationsQuery } from "../../state/features/services/users/user";

interface API_RESPONSE {
  code: number;
  message: string;
  data: any[];
}
export default function Headerbar({
  companyName,
  firstName,
  mobiHolderId,
}: {
  [key: string]: any;
}) {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  const { toggleColorMode } = useToggleMode();
  const navigation = useNavigation();
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  const notifications = useGetNotificationsQuery();
  const nots = notifications.data as unknown as API_RESPONSE;
  const unreadNotifications = nots.data.filter((item) => !item.read);
  const greeting = getGreeting();
  return (
    <View style={tw`border-b border-[${colors.gray}]/50 pb-3`}>
      <View
        style={tw` px-4  rounded-xl ${
          colorScheme === "dark" ? `bg-[${colors.dark}]` : "bg-white"
        }`}
      >
        <View style={tw`flex-row items-center justify-between`}>
          {/* Left section */}
          <View style={tw`flex-row items-center flex-1`}>
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              style={tw`mr-4 p-2 rounded-2xl ${
                colorScheme === "dark" ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <Image source={images.home_box} style={tw`h-5 w-5`} />
            </Pressable>

            <View style={tw`flex-1`}>
              <TextPrimary
                font="montserrat_regular"
                size={13}
                color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
                style={tw``}
              >
                {greeting} 👋
              </TextPrimary>
              <BaseText
                font="inter"
                style={tw`text-base  font-bold opacity-80`}
              >
                {companyName?.slice(0, 24) || firstName}
                {/* Greenmouse technologies */}
              </BaseText>
            </View>
          </View>

          {/* Right section */}
          <View style={tw`items-end`}>
            <View style={tw`flex-row items-center gap-3 mb-2`}>
              <Pressable
                onPress={toggleColorMode}
                style={tw`p-2 rounded-full ${
                  colorScheme === "dark" ? "bg-yellow-500/20" : "bg-blue-50"
                }`}
              >
                <MaterialIcons
                  name={colorScheme === "dark" ? "dark-mode" : "light-mode"}
                  size={20}
                  color={colorScheme === "dark" ? "#FCD34D" : "#3B82F6"}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("NotificationListing")}
                style={tw`p-2 rounded-full ${
                  colorScheme === "dark" ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                {unreadNotifications.length > 0 && (
                  <View
                    style={tw`p-1.5 bg-red-500 absolute right-1 top-1 z-10 rounded-full`}
                  ></View>
                )}
                <SimpleLineIcons
                  name="bell"
                  size={20}
                  color={colorScheme === "dark" ? "#FFFFFF" : "#374151"}
                />
              </Pressable>
            </View>
            <View
              style={tw`p-2 rounded-full ${
                colorScheme === "dark" ? "bg-purple-900/30" : "bg-purple-50"
              }`}
            >
              <TextPrimary
                font="montserrat_medium"
                size={11}
                color={colorScheme === "dark" ? "#C084FC" : "#7C3AED"}
              >
                ID: {mobiHolderId}
              </TextPrimary>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
