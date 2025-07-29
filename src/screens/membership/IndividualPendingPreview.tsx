import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextPrimary from "../../components/texts/text";
import CardTag from "../../components/CardTag";
import CardItem from "../../components/CardItem";
import ListItem from "../../components/ListItem";
import BackButton from "../../components/BackButton";
import images from "../../utils/constants/images";
import tw from "../../lib/tailwind";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import Toast from "react-native-toast-message";
import { useRequestActionMutation } from "../../state/features/services/membership/membership";
import { formatDate } from "../../utils/helpers";

const IndividualPendingReview = ({ navigation, route }: any) => {
  // const insets = useSafeAreaInsets();

  const { data } = route?.params;
  const { organization } = data;

  const [dropdown, setDropdown] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [requestAction, { isLoading: sendingRequest }] =
    useRequestActionMutation();

  const handleSubmit = async () => {
    try {
      const response = await requestAction({
        membershipId: parseInt(data.id),
        status: data.status === "active" ? "inactive" : "active",
      });

      if (response?.error) {
        console.log("response error", response?.error);
        return Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
      // navigation.navigate("RequestSuccess")
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between  px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Request Details
            </Header>
            <View />
          </View>

          <View style={tw` mt-5`}>
            <Image
              source={
                organization?.photo
                  ? { uri: organization.photo }
                  : images.profileImg
              }
              resizeMode="cover"
              style={tw`h-[183px]  w-full`}
            />
            <View style={tw` px-[5%]`}>
              <View style={tw`mt-8 gap-4`}>
                {/* <ListItem icon={icons.role} itemKey="Role" value="Seles Rep" /> */}
                <ListItem
                  icon={icons.company}
                  itemKey="Email"
                  value={organization.email}
                />
                <ListItem
                  icon={icons.event}
                  itemKey="Date Joined"
                  value={formatDate(data.createdAt)}
                />
                <ListItem
                  icon={icons.event}
                  itemKey="MobiHolder ID"
                  value={organization.mobiHolderId}
                />
                <ListItem
                  icon={icons.card_number}
                  itemKey="Role"
                  value={data.designation}
                />
                {/* <ListItem
                  icon={icons.event}
                  itemKey="Category"
                  value="VIP"
                /> */}
                <ListItem
                  valueColor={
                    data.status === "active"
                      ? "#4CD964"
                      : data.status === "pending"
                        ? "#F9BF13"
                        : "#F74D1B"
                  }
                  icon={icons.verify}
                  itemKey="Status"
                  value={data.status}
                />
                {/* <ListItem icon={icons.verify} itemKey="Subscription Status" value="Active" /> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
      <BottomModals open={modal} handleClose={toggleModal} snapPoints={["50"]}>
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary font="medium" size={15} style={tw`text-center mt-5`}>
            {data.status === "active" ? "Deactivate Member" : "Activate Member"}{" "}
            ?
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={
                  organization?.photo
                    ? { uri: organization.photo }
                    : images.profileImg
                }
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {`${organization?.firstName} ${organization?.lastName}`}
                </TextPrimary>

                <TextPrimary font="semi_bold" size={11} color="#696767">
                  {organization.email}
                </TextPrimary>
              </View>
            </View>

            <PrimaryButton
              size={13}
              style={tw``}
              loading={sendingRequest}
              onPress={handleSubmit}
              color="#F74D1B"
            >
              {data.status === "active" ? "Deactivate User" : "Activate User"}
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default IndividualPendingReview;

const styles = StyleSheet.create({});
