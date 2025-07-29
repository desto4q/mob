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

const ReceivedVerificationListIndividual = () => {
  const [modal, setModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: indivudual,
    isLoading: isGettingInd,
    refetch: refetchInd,
    isFetching,
    error,
  } = useGetIndividualVerificationRequestQuery({
    requestType: "received",
    status: "pending",
  });

  console.log("error", error);

  // const [requestId, setRequestId] = useState("");

  const pendingIndividual = indivudual?.data;

  if (isGettingInd) return <PageLoader />;

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchInd();
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
          data={pendingIndividual}
          renderItem={({ item }) => (
            <View style={tw`my-3`}>
              <VerificationRequestItem item={item} />
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

      {/* <BottomModals
        open={modal}
        handleClose={() => setModal(false)}
        snapPoints={["50"]}
      >
        <View style={tw`p-5`}>
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
              color="#F74D1B"
            >
              Delete
            </PrimaryButton>
          </View>
        </View>
      </BottomModals> */}
    </>
  );
};

export default ReceivedVerificationListIndividual;

const styles = StyleSheet.create({});
