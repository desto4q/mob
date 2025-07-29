import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import TicketRequestItem from "./TicketRequestItem";
import images from "../../utils/constants/images";
import { navigationRef } from "../../navigation/navigationRef";
import { useGetEventTicketRequestQuery, useTicketRequestActionMutation } from "../../state/features/services/events/events";
import SimpleLoader from "../SimpleLoader";
import ReusableBottomSheet from "../shared/ReusableBottomSheet";
import PrimaryButton from "../buttons/PrimaryButtom";
import Toast from "react-native-toast-message";

const TicketRequestListing = ({ eventId }:any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [requestAction, setRequestAction] = useState<'decline' | 'approve' | string>('');
  const { data, isLoading, refetch, isFetching } =
    useGetEventTicketRequestQuery(eventId);

    const [ticketAction,{isLoading:isSending}] = useTicketRequestActionMutation()
  if (isLoading) return <SimpleLoader />;

  const handleAction = async () => {
    try {
      const response:any = await ticketAction({
        requestId: selectedMember?.id,
        action: requestAction,
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
      // navigation.navigate("RequestSuccess");
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  }



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

  const toggleModal = (item:any, action:string) => {
    setSelectedMember(item);
    setRequestAction(action)
    setModal(!modal);
  };

  const closeModal = () => setModal(false);

  

  return (
    <>
    <View style={tw`flex-1 px-[5%]`}>
      <TextPrimary>Users requesting this event ticket</TextPrimary>
      <FlatList
        data={data?.data}
        renderItem={({ item }) => (
          <View style={tw`my-3`}>
            <TicketRequestItem
              item={item}
              // onPress={() => navigationRef.navigate("EventDetails")}
              toggleModal={toggleModal}
              image={images.event}
            />
          </View>
        )}
        style={tw``}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
    <ReusableBottomSheet
        isVisible={modal}
        onClose={closeModal}
        snapPoints={["30%"]}
      >
        <View style={tw`p-5 pt-2 `}>
          <TextPrimary font="medium" size={15} style={tw`text-center mt-0`}>
            {
              requestAction === 'decline'
               ? 'Decline Ticket Request'
                : requestAction === 'approve'
               ? 'Accept Ticket Request'
                : 'Delete Request'
            }
          </TextPrimary>
          <View style={tw`gap-5 mt-3`}>
            {/* <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={{ uri: selectedMember?.photo }}
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {selectedMember?.firstName} {selectedMember?.lastName}
                </TextPrimary>

                <TextPrimary
                  font="semi_bold"
                  size={11}
                  style={tw`text-[#696767]`}
                  color="#696767"
                >
                  {selectedMember?.email}
                </TextPrimary>
              </View>
            </View> */}

            <PrimaryButton
              size={13}
              style={tw``}
              loading={isSending}
              onPress={handleAction}
            >
              {
                requestAction === 'decline'
                 ? 'Decline'
                  : requestAction === 'approve'
                 ? 'Approve'
                  : 'Delete'
              }
            </PrimaryButton>
          </View>
        </View>
      </ReusableBottomSheet>
    </>
  );
};

export default TicketRequestListing;

const styles = StyleSheet.create({});
