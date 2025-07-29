import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import DrawerIcon from "./DrawerIcon";
import ProfileBrief from "./ProfileBrief";
import icons from "../utils/constants/icons";
import Theme from "./theme";
import { Modal, Pressable } from "react-native";
import { BlurView } from "expo-blur";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  setLogout,
  setToken,
  setUser,
} from "../state/features/slices/userSlice";
import axios from "axios";
import Toast from "react-native-toast-message";
import { RootState } from "../state";
import { BaseUrl } from "../config/url";
import BottomModals from "./modals/BottomModals";
import TextPrimary from "./texts/text";
import tw from "twrnc";
import PrimaryButton from "./buttons/PrimaryButtom";
import BaseText from "./BaseText";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { useBottomSheetRef } from "./modals/LogoutModal";
const CustomDrawerContent = (props: any) => {
  const { drawerItems } = props;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.user);
  const [logoutModal, setLogoutModal] = useState(false);
  let { ref, open } = useBottomSheetRef();
  const { colorScheme } = useColorScheme();
  const toggleLogoutModal = () => setLogoutModal(!logoutModal);
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Toast.show({
        type: "success",
        text1: response.data.message,
      });
      dispatch(setLogout());
      dispatch(setToken(""));
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response.data.message
          ? error.response.data.message
          : "Something went wrong",
      });
    }
  };
  return (
    <>
      <DrawerContentScrollView
        contentContainerStyle={{ flex: 1 }}
        {...props}
        scrollEnabled={true}
      >
        <ProfileBrief />
        <DrawerItemList
          {...props}
          contentContainerStyle={styles.drawerItemList}
        />

        <DrawerItem
          label={() => (
            <DrawerIcon
              focused={false}
              label={"logout"}
              icon={icons.logout_icon}
              onPress={toggleLogoutModal}
            />
          )}
          onPress={toggleLogoutModal}
        />
        <View style={tw`mt-auto px-3 mb-2`}>
          <Theme onClose={() => props.navigation.toggleDrawer()} />
        </View>
        <Modal
          visible={logoutModal}
          transparent
          animationType="slide"
          onRequestClose={toggleLogoutModal}
        >
          <BlurView
            // tint={colorScheme === "dark" ? "dark" : "light"}
            style={tw`flex-1 justify-center items-center bg-black/70`}
          >
            <View
              style={tw`${colorScheme == "dark" ? "bg-neutral-900" : "bg-neutral-100"} w-11/12 rounded-xl p-6 shadow-md`}
            >
              <BaseText style={tw`text-center mb-6  font-semibold text-base`}>
                Are you sure you want to logout?
              </BaseText>

              <View style={tw`gap-4`}>
                <PrimaryButton
                  onPress={handleLogout}
                  color="#F74D1B"
                  size={22}
                  style={tw`border border-red-500 `}
                >
                  Logout
                </PrimaryButton>

                <PrimaryButton
                  onPress={toggleLogoutModal}
                  style={tw`border bg-transparent`}
                >
                  <BaseText className="text-base">Cancel</BaseText>
                </PrimaryButton>
              </View>
            </View>
          </BlurView>
        </Modal>
      </DrawerContentScrollView>
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    //   paddingVertical: 10,
  },
  drawerItemList: {
    marginVertical: 0,
    marginHorizontal: 0, // Remove margin between items
    paddingHorizontal: 0, // Adjust padding if needed
  },
});
