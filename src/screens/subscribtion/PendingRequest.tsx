import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  RefreshControl,
  FlatList,
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
import images from "../../utils/constants/images";
import TextPrimary from "../../components/texts/text";

import PendingItem from "../../components/verifcation/PendingItem";
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import BackButton from "../../components/BackButton";
import PendingMemberItem from "../../components/membership/PendingMemberItem";
import tw from "../../lib/tailwind";
import {
  useGetUserMembershipQuery,
  useIndividualRequestActionMutation,
} from "../../state/features/services/membership/membership";
import OrganizationRequestItem from "../../components/membership/OrganizationRequestItem";
import Toast from "react-native-toast-message";

const PendingRequest = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<"received" | "initiated">("received");

  const { data, isLoading, refetch, isFetching } = useGetUserMembershipQuery(
    "pendingFromIndividual",
  );
  const {
    data: Orgrequest,
    refetch: refetchOrg,
    isFetching: isFetchingOrg,
  } = useGetUserMembershipQuery("pendingFromOrganization");

  const [individualRequestAction, { isLoading: sendingRequest }] =
    useIndividualRequestActionMutation();
  const [declineRequest, { isLoading: isLoadingDecline }] =
    useIndividualRequestActionMutation();

  console.log("useGetUserMembershipQuery", Orgrequest);

  const handleSubmit = async (data) => {
    try {
      const response = await individualRequestAction({
        ...data,
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
      navigation.navigate("RequestSuccess", {
        message: response?.data?.message,
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

  const handleDecline = async (data) => {
    try {
      const response = await declineRequest({
        ...data,
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
      navigation.navigate("RequestSuccess", {
        message: response?.data?.message,
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      await refetchOrg();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <>
      <PageContainer>
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching || isFetchingOrg}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between `}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Pending Requests
            </Header>
            <View />
          </View>

          <View style={tw`mt-5  flex-1 mb-5`}>
            <View style={tw`pb-5 gap-2`}>
              <TextPrimary size={13} style={tw`text-gray`}>
                All requests that are yet to be approved.
              </TextPrimary>
            </View>

            <View style={tw`mb-1 flex-1`}>
              <View
                style={[
                  tw`px-[8px] py-[5px] flex-row rounded-[20px]  dark:bg-gray_dark bg-light`,
                ]}
              >
                <Pressable
                  style={[
                    tw` flex-1 items-center rounded-[20px] py-3`,
                    tab === "received" ? { backgroundColor: "#242EF2" } : {},
                  ]}
                  onPress={() => setTab("received")}
                >
                  <TextPrimary
                    size={11}
                    style={[tab === "received" ? { color: "#fff" } : {}]}
                  >
                    Received
                  </TextPrimary>
                </Pressable>
                <Pressable
                  style={[
                    tw` flex-1 items-center rounded-[20px] py-3`,
                    tab === "initiated" ? { backgroundColor: "#242EF2" } : {},
                  ]}
                  onPress={() => setTab("initiated")}
                >
                  <TextPrimary
                    size={11}
                    style={[tab === "initiated" ? { color: "#fff" } : {}]}
                  >
                    Initiated
                  </TextPrimary>
                </Pressable>
              </View>
            </View>
          </View>
          {tab === "received" && (
            <FlatList
              data={Orgrequest?.data}
              renderItem={({ item }) => (
                <View style={tw`my-1`}>
                  <OrganizationRequestItem
                    isLoading={sendingRequest}
                    item={item?.organization}
                    membershipId={item.id}
                    designation={item?.designation}
                    isLoadingDecline={isLoadingDecline}
                    handleSubmit={handleSubmit}
                    handleDecline={handleDecline}
                  />
                </View>
              )}
              style={tw`mt-5`}
            />
          )}

          {tab === "initiated" && (
            <FlatList
              data={data?.data}
              renderItem={({ item }) => (
                <View style={tw`my-1 mx-1`}>
                  <PendingMemberItem
                    image={images.event_img}
                    onPress={() =>
                      navigation.navigate("IndividualPendingReview", {
                        data: item,
                      })
                    }
                    item={item?.organization}
                    designation={item?.designation}
                    status={item.status}
                    date={item.createdAt}
                  />
                </View>
              )}
            />
          )}
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default PendingRequest;

const styles = StyleSheet.create({});
