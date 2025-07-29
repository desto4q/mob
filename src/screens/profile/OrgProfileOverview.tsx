import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ShadowGradient from "../../components/ShadowGradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import CardAction from "../../components/CardAction";
import icons from "../../utils/constants/icons";
import images from "../../utils/constants/images";
import CardTag from "../../components/CardTag";
import ProfileImage from "../../components/ProfileImage";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants";
import ProfileItem from "../../components/ProfileItem";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { useAppDispatch } from "../../state/hooks";
import { setLogout, setToken } from "../../state/features/slices/userSlice";
import { useGetUserQuery } from "../../state/features/services/users/user";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import { useSelector } from "react-redux";
import { RootState } from "../../state";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";
import BaseText from "../../components/BaseText";

const OrgProfileOverview = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const { token } = useSelector((state: RootState) => state.user);
  const [tab, setTab] = useState<"business" | "user">("business");
  const [loading, setLoading] = useState(false);

  const { firstName, lastName, mobiHolderId, status, isVerified } =
    (data?.data as any) || {};
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`${mobiHolderId}`);
    Alert.alert(`${mobiHolderId} copied to clipboard`);
  };

  console.log("user", data);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLoading(true);
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
      navigation.replace("SignIn");
      toggleLogoutModal();
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response.data.message
          ? error.response.data.message
          : "Something went wrong",
      });
    } finally {
      dispatch(setLogout());
      dispatch(setToken(""));
      toggleLogoutModal();
      setLoading(false);
    }
  };

  const [logoutModal, setLogoutModal] = useState(false);
  const toggleLogoutModal = () => setLogoutModal(!logoutModal);
  return (
    <>
      <PageContainer>
        <ScrollView>
          <View style={tw`flex-row  justify-between`}>
            <View style={tw`flex-row items-center gap-3 `}>
              <ShadowGradient onPress={() => navigation.goBack()}>
                <MaterialIcons
                  name="arrow-back-ios-new"
                  size={24}
                  color="white"
                />
              </ShadowGradient>
              <Header font="semi_bold">Profile</Header>
            </View>
            <View style={tw`mt-2`}>
              <CardTag
                color={isVerified ? "#4CD964" : "#F74D1B"}
                bgColor={isVerified ? "#4CD9641A" : "#F50C0C1A"}
                text={isVerified ? "Verified" : "Unverified"}
              />
            </View>
          </View>

          <View style={tw`items-center justify-center gap-2 mt-3`}>
            <ProfileImage
              size={144}
              iconSize={33}
              imageStyle={{ borderRadius: 15 }}
            />
            <Header>
              {firstName} {lastName}
            </Header>
            <View style={tw`flex-row items-center gap-1`}>
              <TextPrimary color="#4950CA">ID : {mobiHolderId}</TextPrimary>
              <Pressable onPress={copyToClipboard}>
                <Image
                  source={icons.copy}
                  resizeMode="contain"
                  style={tw`w-[15px] h-[17px]`}
                />
              </Pressable>
            </View>
          </View>

          <View
            style={[
              tw`px-[8px] py-[5px] flex-row rounded-[30px] mt-5 dark:bg-gray_dark bg-light`,
            ]}
          >
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "business" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("business")}
            >
              <TextPrimary size={11}>Business Profile</TextPrimary>
            </Pressable>
            <Pressable
              style={[
                tw` flex-1 items-center rounded-[20px] py-3`,
                tab === "user" ? { backgroundColor: "#242EF2" } : {},
              ]}
              onPress={() => setTab("user")}
            >
              <TextPrimary size={11}>User Profile</TextPrimary>
            </Pressable>
          </View>

          {tab === "business" && (
            <View style={tw`gap-5 mt-8 pb-10`}>
              <ProfileItem
                label="Organization Data"
                icon={icons.company}
                onPress={() => navigation.navigate("OrganizationData")}
              />
              <ProfileItem
                label="Verify Account"
                icon={icons.info}
                onPress={() => navigation.navigate("UploadDocument")}
              />
              <ProfileItem
                label="Account Info"
                icon={icons.info}
                onPress={() => navigation.navigate("AccountInfo")}
              />
              <ProfileItem
                label="Create Payment Account"
                icon={icons.user_icon}
                onPress={() => navigation.navigate("CreateOrgSubAccount")}
              />
              <ProfileItem
                label="Contact Support "
                icon={icons.help}
                onPress={() => navigation.navigate("Support")}
              />
              <ProfileItem
                label="Logout"
                icon={icons.logout_icon}
                onPress={toggleLogoutModal}
              />
            </View>
          )}
          {tab === "user" && (
            <View style={tw`gap-5 mt-8 pb-10`}>
              <ProfileItem
                label="User Data"
                icon={icons.user_icon}
                onPress={() => navigation.navigate("PersonalData")}
              />
              <ProfileItem
                label="Security"
                icon={icons.security}
                onPress={() => navigation.navigate("Security")}
              />

              <ProfileItem
                label="Logout"
                icon={icons.logout_icon}
                onPress={toggleLogoutModal}
              />
            </View>
          )}
        </ScrollView>
      </PageContainer>
      <BottomModals
        open={logoutModal}
        handleClose={toggleLogoutModal}
        snapPoints={["40"]}
      >
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary size={15} style={tw`mt-1 text-center`}>
            Are you sure you want to logout ?
          </TextPrimary>
          <View style={tw`gap-5 mt-10 flex-1`}>
            <PrimaryButton
              onPress={handleLogout}
              color="#F74D1B"
              style={tw`border border-[#FFFFFF]`}
              disabled={loading}
              loading={loading}
            >
              Logout
            </PrimaryButton>
            <PrimaryButton
              onPress={toggleLogoutModal}
              color=""
              style={tw`border border-[#606060]`}
            >
              <BaseText>Cancel</BaseText>
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default OrgProfileOverview;

const styles = StyleSheet.create({});
