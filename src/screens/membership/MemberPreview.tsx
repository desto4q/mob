import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import BaseText from "../../components/BaseText";
import { useMemberEdit } from "../../state/newStates/flow";

const MemberPreview = ({ navigation, route }: any) => {
  // const insets = useSafeAreaInsets();

  const { data } = route?.params;
  const { individual } = data;

  const [dropdown, setDropdown] = useState(false);

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [requestAction, { isLoading: sendingRequest, error }] =
    useRequestActionMutation();

  console.log(error);

  const handleSubmit = async () => {
    console.log(data.id);
    // return;
    try {
      const response = await requestAction({
        membershipId: data.id,
        status: data.status === "active" ? "inactive" : "active",
      });

      if (response?.error) {
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
      // navigation.navigate("RequestSuccess")
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  let { setMember } = useMemberEdit();
  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Member Preview
            </Header>
            <MaterialCommunityIcons
              onPress={() => setDropdown(!dropdown)}
              name="dots-vertical"
              size={24}
              style={tw`px-2`}
              color="#C4C4C4"
            />
          </View>
          {dropdown && (
            <View
              style={tw`dark:bg-[#3A3A3C] elevation-2 bg-white rounded-[10px] p-3 gap-1 w-[181px] absolute z-50 right-0 top-10`}
            >
              <TouchableOpacity
                onPress={(e) => {
                  setMember(data);
                  navigation.navigate("EditMember");
                }}
                style={tw`py-2`}
              >
                <BaseText style={tw`text-base`}>Edit MemberShip</BaseText>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`py-2`}
                onPress={() => {
                  setModal(true);
                  setDropdown(false);
                }}
              >
                <BaseText size={11}>
                  {data.status === "active"
                    ? "Deactivate Member"
                    : "Activate Member"}
                </BaseText>
              </TouchableOpacity>
              {/* <Pressable>
                  <TextPrimary
                    size={11}
                    font="medium"
                    style={tw`text-[#EEEEEE]`}
                  >
                    Update Details{" "}
                  </TextPrimary>
                </Pressable> */}
            </View>
          )}

          <View style={tw``}>
            <View style={tw`mt-8 gap-4 `}>
              <TextPrimary
                size={13}
                style={tw`text-gray_light`}
                font="montserrat_medium"
              >
                Member:{" "}
                <TextPrimary
                  size={13}
                  style={tw`text-blue`}
                  font="montserrat_medium"
                >
                  {individual?.firstName} {individual?.lastName}
                </TextPrimary>
              </TextPrimary>
              <CardItem
                navigation={navigation}
                height={187}
                image={images.card2}
              />
            </View>

            <View style={tw`mt-8 gap-4`}>
              <ListItem
                icon={icons.user_icon}
                itemKey="Name"
                value={`${individual?.firstName} ${individual?.lastName}`}
              />
              <ListItem
                icon={icons.company}
                itemKey="Role"
                value={data.designation}
              />
              {/* <ListItem icon={icons.role} itemKey="Role" value="Seles Rep" /> */}
              <ListItem
                icon={icons.mail}
                itemKey="Email"
                value={individual.email}
              />
              <ListItem
                icon={icons.event}
                itemKey="Date Joined"
                value={formatDate(data.dateJoined)}
              />
              <ListItem
                icon={icons.event}
                itemKey="MobiHolder ID"
                value={individual.mobiHolderId}
              />
              {/* <ListItem
                  icon={icons.card_number}
                  itemKey="ID card Number"
                  value="34738473t67"
                /> */}
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
        </ScrollView>
      </PageContainer>
      <BottomModals open={modal} handleClose={toggleModal} snapPoints={["50"]}>
        <View style={tw`p-5 pt-1`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <BaseText font="" style={tw`text-base`}>
            {data.status === "active"
              ? "Deactivate Membership"
              : "Activate Member"}{" "}
            ?
          </BaseText>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={
                  individual?.photo
                    ? { uri: individual.photo }
                    : images.profileImg
                }
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {`${individual?.firstName} ${individual?.lastName}`}
                </TextPrimary>

                <TextPrimary font="semi_bold" size={11} color="#696767">
                  {individual.email}
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
              {data.status === "active"
                ? "Deactivate Membership"
                : "Activate Membership"}
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default MemberPreview;

const styles = StyleSheet.create({});
