import {
  Alert,
  FlatList,
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
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import images from "../../utils/constants/images";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import EventInvitesItem from "../../components/event/EventInvitesItem";
import {
  useGetReceivedPendingQuery,
  useRespondToInvitationMutation,
} from "../../state/features/services/events/events";
import SimpleLoader from "../../components/SimpleLoader";
import Toast from "react-native-toast-message";

const EventInvites = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch, isFetching } = useGetReceivedPendingQuery();
  const [acceptInvite, { isLoading: isAccepting }] =
    useRespondToInvitationMutation();
  const [declineInvite, { isLoading: isDeclining }] =
    useRespondToInvitationMutation();

  if (isLoading) return <SimpleLoader />;

  const receivedInvite = data?.data;

  console.log("receivedInvite", receivedInvite);

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

  const handleAccept = async (item: any) => {
    try {
      const response = await acceptInvite({
        token: item.invitationToken.toString(),
        status: "Accepted",
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  const handleDecline = async (item: any) => {
    try {
      const response = await declineInvite({
        token: item.invitationToken.toString(),
        status: "Declined",
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  console.log("receivedInvite", receivedInvite);
  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={tw`flex-1`}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Event Invites
            </Header>
            <View />
          </View>
          <View style={tw` mt-6 flex-1`}>
            <TextPrimary>
              You got invited for these events (
              {receivedInvite ? receivedInvite?.length : 0})
            </TextPrimary>
            <FlatList
              data={receivedInvite}
              renderItem={({ item }) => (
                <View style={tw`my-1`}>
                  <EventInvitesItem
                    navigation={navigation}
                    item={item}
                    isAccepting={isAccepting}
                    isDeclining={isDeclining}
                    handleAccept={handleAccept}
                    handleDecline={handleDecline}
                  />
                </View>
              )}
              style={tw`mt-5`}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing || isFetching}
                  onRefresh={onRefresh}
                />
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

export default EventInvites;

const styles = StyleSheet.create({});
