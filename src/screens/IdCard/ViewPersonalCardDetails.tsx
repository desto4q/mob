import {
  Image,
  Pressable,
  RefreshControl,
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
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import icons from "../../utils/constants/icons";
import TextPrimary from "../../components/texts/text";
import ListItem from "../../components/ListItem";
import BackButton from "../../components/BackButton";
import {
  useDeleteIndividualIdCardMutation,
  useGetPersonalCardDetailsQuery,
} from "../../state/features/services/card/card";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import Toast from "react-native-toast-message";

const ViewPersonalCardDetails = ({ navigation, route }: any) => {
  const cardId = route?.params?.cardId;

  const insets = useSafeAreaInsets();
  const [dropdown, setDropdown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const { data, isLoading, refetch, isFetching } =
    useGetPersonalCardDetailsQuery(cardId);

  const [deleteCard, { isLoading: isDeleting }] =
    useDeleteIndividualIdCardMutation();

  const cardDetails = data?.data;

  const handleSubmit = async () => {
    try {
      const response = await deleteCard({
        id: cardId,
      });

      if (response?.error) {
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

      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  if (isLoading) return <PageLoader />;
  return (
    <>
      <PageContainer>
        <ScrollView
          style={tw` `}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              View Cards
            </Header>

            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#C4C4C4"
              onPress={() => setDropdown(!dropdown)}
            />
            {dropdown && (
              <View
                style={tw`bg-[#3A3A3C] rounded-[10px] p-3 gap-3 w-[181px] absolute right-0 top-6 z-[999999]`}
              >
                {/* <TextPrimary size={12} font="medium" style={tw`text-gray`}>
                  Action{" "}
                </TextPrimary> */}

                <Pressable
                  onPress={() => navigation.navigate("AddCard", { cardId })}
                >
                  <TextPrimary
                    size={11}
                    font="medium"
                    style={tw`text-[#EEEEEE]`}
                  >
                    Edit Card
                  </TextPrimary>
                </Pressable>
                <Pressable
                  onPress={() => {
                    openModal();
                    setDropdown(false);
                  }}
                >
                  <TextPrimary
                    size={11}
                    font="medium"
                    style={tw`text-[#EEEEEE]`}
                  >
                    Delete Card
                  </TextPrimary>
                </Pressable>
              </View>
            )}
          </View>
          <TextPrimary
            size={16}
            font="semi_bold"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            {cardDetails?.issuingOrganization}
          </TextPrimary>

          <Image
            source={{ uri: cardDetails?.scanIDCard.frontIdCard }}
            resizeMode="contain"
            style={tw`w-full h-[250px] mt-9`}
          />
          <Image
            source={{ uri: cardDetails?.scanIDCard.backIdCard }}
            resizeMode="contain"
            style={tw`w-full h-[250px] mt-4`}
          />

          <View style={tw`mt-5 pb-10`}>
            {/* <CardTag
                color={colors.primary}
                bgColor="#A324F21A"
                text="Created by Organization"
              /> */}

            <View style={tw`mt-2 gap-4`}>
              <ListItem
                icon={icons.card_number}
                itemKey="ID Card Number"
                value={cardDetails.cardNumber}
              />
              <ListItem
                icon={icons.company}
                itemKey="Issuing Organization"
                value={cardDetails?.issuingOrganization}
              />
              <ListItem
                icon={icons.role}
                itemKey="Role"
                value={cardDetails?.designation}
              />
              <ListItem
                icon={icons.event}
                itemKey="Date Issued"
                value={formatDate(cardDetails?.issuedDate)}
              />
              <ListItem
                icon={icons.event}
                itemKey="Expiry Date"
                value={formatDate(cardDetails?.expiryDate)}
              />
              <ListItem
                icon={icons.verify}
                valueColor={
                  new Date(cardDetails?.expiryDate) > new Date()
                    ? "#4CD964"
                    : "#F74D1B"
                }
                itemKey="Status"
                value={
                  new Date(cardDetails?.expiryDate) > new Date()
                    ? "Active"
                    : "Expired"
                }
              />
            </View>
          </View>
        </ScrollView>
      </PageContainer>
      <BottomModals open={modal} handleClose={closeModal} snapPoints={["50"]}>
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary font="medium" size={15} style={tw`text-center mt-5`}>
            Delete Card
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <TextPrimary>Note: This action cannot be reversed⚠️</TextPrimary>
            </View>

            <PrimaryButton
              size={13}
              style={tw``}
              loading={isDeleting}
              onPress={handleSubmit}
              color="#F74D1B"
            >
              Delete
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default ViewPersonalCardDetails;

const styles = StyleSheet.create({});
