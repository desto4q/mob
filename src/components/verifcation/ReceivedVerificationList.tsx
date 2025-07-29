import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import PendingVerificationItem from "./PendingVerificationItem";
import Toast from "react-native-toast-message";
import {
  useDeleteVerificationRequestMutation,
  useGetIndividualVerificationRequestQuery,
  useGetOrganizationVerificationRequestQuery,
  useUpdateVerificationStatusMutation,
} from "../../state/features/services/verification/verification";
import PageLoader from "../Loader";
import BottomModals from "../modals/BottomModals";
import PrimaryButton from "../buttons/PrimaryButtom";
import VerificationRequestItem from "./VerificationRequestItem";
import VerificationRequestOrgItem from "./VerificationRequestOrgItem";

const ReceivedVerificationList = () => {
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch, isFetching } =
    useGetOrganizationVerificationRequestQuery({ requestType: "received" });

  // const [requestId, setRequestId] = useState("");
  const pendingVerificagtion = data?.data;

  // const toggleModal = (requestId: string) => {
  //   setModal(!modal);
  //   console.log("requestId", requestId);
  //   setRequestId(requestId);
  // };

  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateVerificationStatusMutation();
  const [declineRequest, { isLoading: isDeclining }] =
    useUpdateVerificationStatusMutation();

  const handleAccept = async (requestId: string) => {
    try {
      const response = await updateRequest({
        requestId,
        status: "active",
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
  const handleDeclineRequest = async (requestId: string) => {
    try {
      const response = await declineRequest({
        requestId,
        status: "declined",
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

  if (isLoading) return <PageLoader />;

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

  return (
    <>
      <View style={tw`flex-1 px-[5%]`}>
        <FlatList
          data={pendingVerificagtion}
          renderItem={({ item }) => (
            <View style={tw`my-3`}>
              <VerificationRequestOrgItem
                item={item}

                //  toggleModal={toggleModal}
              />
            </View>
          )}
          style={tw`mt-2 `}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        />
      </View>

      <BottomModals
        open={modal}
        handleClose={() => setModal(false)}
        snapPoints={["50"]}
      >
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary font="medium" size={15} style={tw`text-center mt-5`}>
            Delete Request
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <TextPrimary>Note: This action cannot be reversed⚠️</TextPrimary>
            </View>

            <PrimaryButton
              size={13}
              style={tw``}
              loading={isUpdating}
              // onPress={handleDelete}
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

export default ReceivedVerificationList;

const styles = StyleSheet.create({});
