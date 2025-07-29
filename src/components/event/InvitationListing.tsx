import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import TextPrimary from "../texts/text";
import InvitedEventItem from "./InvitedEventItem";
import images from "../../utils/constants/images";
import tw from "twrnc";
import { colors } from "../../utils/constants";
import InvitationItem from "./InvitationItem";
import SearchInput from "../inputs/Search";
import Checkbox from "../inputs/Checkbox";
import PrimaryButton from "../buttons/PrimaryButtom";
import {
  useGetSentInvitationQuery,
  useGetSingleEventPublicQuery,
  useSetEventInvitationMutation,
} from "../../state/features/services/events/events";
import Toast from "react-native-toast-message";
import InputTextWithLabel from "../inputs/InputWithLabel";
import PageLoader from "../Loader";
import SimpleLoader from "../SimpleLoader";
import { newApi } from "../../state/newStates/flow";

const InvitationListing = ({ navigation, eventId }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  const { data, isLoading: isLoadingData } =
    useGetSingleEventPublicQuery(eventId);
  const {
    data: inviteData,
    refetch,
    isFetching,
    isLoading: isGettingInvites,
  } = useGetSentInvitationQuery(eventId);
  const [sendInvite, { isLoading }] = useSetEventInvitationMutation();

  const inviteList = inviteData?.data;

  if (isLoadingData || isGettingInvites) return <SimpleLoader />;
  const eventDetails = data?.data;

  console.log(eventDetails?.eventtickets);

  const handleSubmit = async () => {
    // console.log(eventDetails);
    // return;
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Email fields are required",
      });
      return;
    }
    if (!eventDetails?.eventtickets) {
      Alert.alert("error", "This event doesn't have a ticket");
      return;
    }
    try {
      const response = await newApi.post("/api/events/send/invitation", {
        eventId: eventId.toString(),
        userId: email,
        isFree: true,
        ticketId: eventDetails.id.toString(),
      });

      Toast.show({
        type: "success",
        text1: "ss",
      });

      if (response?.error) {
        Alert.alert("error", response?.error?.data?.message);
        return;
      }

      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
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
  if (isFetching) return <PageLoader />;
  return (
    <View style={tw`px-[5%]`}>
      <View
        style={tw`gap-4 border border-dashed border-[#2E2F36] mb-6 p-4 rounded-[10px]`}
      >
        <TextPrimary color={colors.gray_light} font="medium">
          Invite User
        </TextPrimary>
        <InputTextWithLabel
          placeholder="Enter user email or ID"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={tw`flex-row items-center gap-2`}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <TextPrimary size={11}>Mark event as FREE for user</TextPrimary>
        </View>
        <PrimaryButton loading={isLoading} onPress={handleSubmit}>
          Invite Users(s)
        </PrimaryButton>
      </View>
      <TextPrimary color={colors.gray_light} font="medium">
        Previously Invited
      </TextPrimary>

      <FlatList
        data={inviteList}
        renderItem={({ item }) => (
          <View style={tw`my-3`}>
            <InvitationItem
              item={item}
              // onPress={() => navigation.navigate("EventDetails")}
              image={images.event}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
        style={tw``}
      />
    </View>
  );
};

export default InvitationListing;

const styles = StyleSheet.create({});
