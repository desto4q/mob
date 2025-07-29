import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants/colors";
import icons from "../../utils/constants/icons";
import TextPrimary from "../../components/texts/text";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import { useInviteMemberMutation } from "../../state/features/services/membership/membership";
import Toast from "react-native-toast-message";
import ChooseDate from "../../components/event/ChooseDate";
import { newApi, useMemberEdit } from "../../state/newStates/flow";
import BaseText from "../../components/BaseText";
import { Pressable, TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import { useQuery } from "@tanstack/react-query";
interface API_RESPONSE {
  code: number;
  message: string;
  data: DESIGNATION[];
}
interface DESIGNATION {
  createdAt: string;
  description: string;
  name: string;
  organizationId: string;
  updatedAt: string;
  id: string;
  [key: string]: any;
}
export default function EditMember({ navigation, route }: any) {
  let { params } = useRoute();
  const { member } = useMemberEdit();
  let initial_designation = {
    label: member?.designation,
    value: member?.designation,
  };
  const [joinedDate, setJoinedDate] = useState(member?.dateJoined);
  const [individualInfo, setindividualInfo] = useState(member?.individualId);
  const [designation, setDesignation] = useState(initial_designation);
  const [memberId, setMemberId] = useState(member?.memberId);
  const [status, setStatus] = useState(member?.status);
  const [organizationEmail, setOrganizationEmail] = useState(
    member?.organizationEmail,
  );
  const [showStatusModal, setShowStatusModal] = useState(false);
  useEffect(() => {
    console.log(member?.designation);
  }, []);
  const [inviteMember, { isLoading }] = useInviteMemberMutation();

  const sendRequest = async () => {
    console.log(member);
    if (!individualInfo.trim()) {
      Alert.alert(
        "Validation Error",
        "Member MobiHolder ID or Email is required",
      );
      return false;
    }
    try {
      const response = await newApi.put(
        "/api/memberships-subscriptions/organization/update/membership/status",
        {
          membershipId: String(member?.id),
          status: status, // declined, inactive or active
          memberId: String(memberId),
          // organizationEmail: organizationEmail, // Not Required
        },
      );
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
      navigation.navigate("RequestSuccess", {
        title: "Request Sent",
        message: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const handleStatusSelect = (selectedStatus: string) => {
    setStatus(selectedStatus);
    setShowStatusModal(false);
  };

  let status_list = ["active", "declined"];
  const designations = useQuery<API_RESPONSE>({
    queryKey: ["invite designations"],
    queryFn: async () => {
      let resp = await newApi.get(
        "/api/memberships-subscriptions/designations",
      );
      return resp.data;
    },
  });
  const designations_data = designations.data?.data.map((e) => {
    return {
      label: e.name,
      value: e.name,
      ...e,
    };
  });
  designations_data?.push(initial_designation);
  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``} contentContainerStyle={tw`pb-12`}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Edit Member
            </Header>
            <View />
          </View>
          <View style={tw` gap-5 mt-4 px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5 text-gray_light`}
            >
              Edit Member
            </TextPrimary>
            <View style={tw`gap-2 mt-4`}>
              <BaseText style={tw`opacity-40 text-sm`}>Member ID</BaseText>
              <View style={tw`p-4 dark:bg-gray_dark bg-light rounded-lg `}>
                <BaseText style={tw`text-neutral-500`}>
                  {individualInfo}
                </BaseText>
              </View>
              {/* <InputTextWithLabel
                  label="Member MobiHolder ID or Email"
                  placeholder=" Enter member email or ID"
                  value={individualInfo}
                  disabled
                  onChangeText={(text) => setindividualInfo(text)}
                /> */}
              <InputTextWithLabel
                label="Member/Staff ID"
                placeholder="Enter members staff ID"
                value={memberId}
                onChangeText={(text) => setMemberId(text)}
              />
              <View style={tw` -mt-2 gap-2`}>
                <BaseText style={tw`opacity-40 text-sm`}>Role</BaseText>
                <Dropdown
                  style={tw`flex-1 p-3 dark:bg-gray_dark bg-light   rounded-xl bg-gray-100 rounded-md  `}
                  placeholder="Select Role"
                  activeColor={colors.primary}
                  containerStyle={tw` dark:bg-gray_dark bg-light  rounded-xl shadow-xl`}
                  itemContainerStyle={tw``}
                  labelField={"label"}
                  valueField={"value"}
                  search
                  value={designation.value}
                  dropdownPosition="top"
                  searchPlaceholder="Search Roles"
                  itemTextStyle={tw`text-sm text-black`}
                  data={designations_data || []}
                  onChange={(item) => {
                    console.log(item);
                    setDesignation(item);
                  }}
                />
              </View>

              <ChooseDate
                label="Enter Joined date"
                placeholder="Enter Joined date"
                value={moment(joinedDate).format("MM D, YYYY")}
                onChange={(date: any) => setJoinedDate(date)}
                maximumDate={new Date()}
              />
              <InputTextWithLabel
                label="Organisation Email"
                placeholder="Enter user organisation email"
                value={organizationEmail}
                onChangeText={(text) => setOrganizationEmail(text)}
              />
              <View>
                <BaseText style={tw`mb-2 text-gray`}>Status</BaseText>
                <TouchableOpacity
                  style={tw`p-3 py-4 dark:bg-gray_dark bg-light rounded-lg  `}
                  onPress={() => setShowStatusModal(true)}
                >
                  <BaseText style={tw``}>{status}</BaseText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`pt-4`}>
              <PrimaryButton onPress={sendRequest} loading={isLoading}>
                Edit Member
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>

      <Modal
        isVisible={showStatusModal}
        // transparent={true}
        onBackdropPress={(e) => {
          setShowStatusModal(false);
        }}
      >
        <View style={tw`dark:bg-gray_dark bg-white p-3 rounded-md`}>
          <BaseText style={tw`mb-2  mb-2 text-lg`}>Select Status</BaseText>
          <View style={tw`w-full gap-2`}>
            {status_list.map((e) => (
              <TouchableOpacity
                key={"status" + e}
                style={tw`p-3 ${status == e && "bg-primary"} rounded-md w-full z-20`}
                onPress={() => {
                  setStatus(e);
                  setShowStatusModal(false);
                }}
              >
                <BaseText>{e}</BaseText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({});
