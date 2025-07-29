import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextPrimary from "./texts/text";
import { colors } from "../utils/constants";
import tw from "../lib/tailwind";
import InputText from "./inputs/InputText";
import icons from "../utils/constants/icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MembershipRequestItem from "./MembershipRequestItem";
import {
  useGetUserOrganizationMembershipQuery,
  useRequestActionMutation,
} from "../state/features/services/membership/membership";
import Toast from "react-native-toast-message";
import BottomModals from "./modals/BottomModals";
import { RefreshControl } from "react-native-gesture-handler";
import SimpleLoader from "./SimpleLoader";
import images from "../utils/constants/images";
import InputTextWithLabel from "./inputs/InputWithLabel";
import PrimaryButton from "./buttons/PrimaryButtom";
import Textarea from "./inputs/Textarea";
import { useGetUserQuery } from "../state/features/services/users/user";
import DesignationsInput from "./designations/DesignationsInput";

const MembershipPendingRequest = ({ navigation }: any) => {
  // const { data, isLoading } = useGetUserOrganizationMembershipQuery("pendingFromIndividual");
  const [modal, setModal] = useState(false);
  const [toggleAction, setToggleAction] = useState<"accept" | "decline" | "">(
    "",
  );
  const userData = useGetUserQuery();
  // useEffect(() => {
  //   console.log(userData.data.data.email, "suserdatas");
  // }, [userData.isFetching]);
  const [memberId, setMemberId] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState(
    userData.data.data.companyEmail,
  );
  const [role, setrole] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [reasonForDecline, setReasonForDecline] = useState("");

  const toggleModal = (item: any) => {
    setModal(!modal);
    setSelected(item);
  };
  const closeModal = () => setModal(false);

  const acceptData = {
    membershipId: parseInt(selected?.id),
    memberId,
    organizationEmail,
    rdesignation: role,
    status: "active",
  };

  const [requestAction, { isLoading: sendingRequest }] =
    useRequestActionMutation();
  const declineData = {
    membershipId: parseInt(selected?.id),
    status: "declined",
    message: reasonForDecline,
  };

  const [declineRequest, { isLoading: isDeclining }] =
    useRequestActionMutation();

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
      closeModal();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const {
    data: pendingRequest,
    isLoading: isGettingRequest,
    refetch: refetchRequest,
    isFetching,
  } = useGetUserOrganizationMembershipQuery("pendingFromIndividual");
  const [refreshing, setRefreshing] = useState(false);

  if (isGettingRequest) return <SimpleLoader />;

  const handleSubmit = async (data) => {
    try {
      const response = await requestAction({
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
      closeModal();
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
      await refetchRequest();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredData = pendingRequest?.data?.filter((item) => {
    const fullName =
      `${item.individual.firstName} ${item.individual.lastName}`.toLowerCase();
    const email = item.individual.email?.toLowerCase() || "";

    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <View style={tw`px-[5%] flex-1`}>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <View style={tw`my-1`}>
              <MembershipRequestItem
                isLoading={sendingRequest}
                item={item}
                membershipId={item.id}
                designation={item?.designation}
                handleSubmit={handleSubmit}
                toggleModal={toggleModal}
                setToggleAction={setToggleAction}
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
          ListHeaderComponent={
            <View>
              <TextPrimary
                size={13}
                font="medium"
                color={colors.gray_light}
                style={tw`mt-5`}
              >
                All your pending request
              </TextPrimary>

              <View style={tw`flex-row gap-5 mt-5`}>
                <View style={tw`flex-1`}>
                  <InputText
                    icon={icons.search}
                    placeholder="Search"
                    style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                {/* <Pressable
                  // onPress={toggleFilterModal}
                  style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
                >
                  <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
                </Pressable> */}
              </View>
            </View>
          }
        />
      </View>

      <BottomModals open={modal} handleClose={closeModal} snapPoints={["70%"]}>
        {toggleAction === "accept" && (
          <View style={tw`p-5 pt-0`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <Image
                source={
                  selected?.individual?.photo
                    ? { uri: selected?.individual?.photo }
                    : images.profileImg
                }
                resizeMode="cover"
                style={tw`h-[70px]  w-[70px] rounded-full `}
              />
              <View style={tw`flex-col justify-between   w-full `}>
                <TextPrimary color="#fff">
                  {selected?.individual?.firstName}{" "}
                  {selected?.individual?.lastName}
                </TextPrimary>
                <TextPrimary
                  font="montserrat_medium"
                  size={11}
                  color="#A6A6A6"
                  style={tw`mt-1 text-gray_light`}
                >
                  {selected?.individual?.email}
                </TextPrimary>
                <TextPrimary
                  font="montserrat_medium"
                  size={11}
                  color="#A6A6A6"
                  style={tw`mt-1 text-gray_light`}
                >
                  {selected?.designation}
                </TextPrimary>
              </View>
            </View>
            <View style={tw`gap-1 mt-4 `}>
              <InputTextWithLabel
                label="Member/Staff ID"
                placeholder="Enter member/staff ID"
                style={tw`dark:border border-[#8F8E8E] h-[40px]`}
                value={memberId}
                onChangeText={setMemberId}
              />
              <InputTextWithLabel
                label="Organisation Email"
                placeholder="Enter organisation email"
                style={tw`dark:border border-[#8F8E8E] h-[40px]`}
                value={organizationEmail}
                onChangeText={(text) => setOrganizationEmail(text)}
              />
              <View style={tw`py-2 mb-2`}>
                <DesignationsInput onChange={setrole} />
              </View>
              {/* <InputTextWithLabel
                label="Role (Designation)"
                placeholder="Enter member/staff role"
                style={tw`dark:border border-[#8F8E8E] h-[40px]`}
              /> */}
            </View>

            <PrimaryButton
              style={tw`mt-5`}
              loading={sendingRequest}
              onPress={() => handleSubmit(acceptData)}
            >
              Accept Member
            </PrimaryButton>
          </View>
        )}
        {toggleAction === "decline" && (
          <View style={tw`p-5 pt-0`}>
            <View style={tw`flex-row gap-2 items-center`}>
              <Image
                source={
                  selected?.individual?.photo
                    ? { uri: selected?.individual?.photo }
                    : images.profileImg
                }
                resizeMode="cover"
                style={tw`h-[70px]  w-[70px] rounded-full `}
              />
              <View style={tw`flex-col justify-between w-full `}>
                <TextPrimary color="#fff">
                  {selected?.individual?.firstName}{" "}
                  {selected?.individual?.lastName}
                </TextPrimary>
                <TextPrimary
                  font="montserrat_medium"
                  size={11}
                  color="#A6A6A6"
                  style={tw`mt-1 text-gray_light`}
                >
                  {selected?.individual?.email}
                </TextPrimary>
                <TextPrimary
                  font="montserrat_medium"
                  size={11}
                  color="#A6A6A6"
                  style={tw`mt-1 text-gray_light`}
                >
                  {selected?.designation}
                </TextPrimary>
              </View>
            </View>
            <View style={tw`mt-7`}>
              <InputTextWithLabel
                placeholder="Enter your reason for declining"
                label="Reason for declining request"
                style={tw`border h-20`}
                value={reasonForDecline}
                onChangeText={(text) => setReasonForDecline(text)}
              />
            </View>
            <PrimaryButton
              style={tw`mt-5`}
              loading={isDeclining}
              onPress={() => handleDecline(declineData)}
            >
              Decline Request
            </PrimaryButton>
          </View>
        )}
      </BottomModals>
    </>
  );
};

export default MembershipPendingRequest;
