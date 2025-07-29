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
} from "../../state/features/services/verification/verification";
import PageLoader from "../Loader";
import BottomModals from "../modals/BottomModals";
import PrimaryButton from "../buttons/PrimaryButtom";

const PendingVerificationListIndividual = () => {
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, refetch, isFetching } =
    useGetIndividualVerificationRequestQuery({
      requestType: "initiated",
      status: "pending",
    });
  const [requestId, setRequestId] = useState("");
  const pendingVerificagtion = data?.data;
  const toggleModal = (requestId: string) => {
    setModal(!modal);
    console.log("requestId", requestId);
    setRequestId(requestId);
  };

  const [deleteRequest, { isLoading: isDeleting }] =
    useDeleteVerificationRequestMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteRequest({
        requestId,
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Alert.alert("error", response?.error?.data?.message);
      }
      await refetch();
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      setModal(false);
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
              <PendingVerificationItem item={item} toggleModal={toggleModal} />
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
        <Text>soso</Text>
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
              loading={isDeleting}
              onPress={handleDelete}
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

export default PendingVerificationListIndividual;

const styles = StyleSheet.create({});
