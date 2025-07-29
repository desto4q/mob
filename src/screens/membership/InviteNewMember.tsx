import {
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
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
import { useGetUserQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import { Dropdown } from "react-native-element-dropdown";
import BaseText from "../../components/BaseText";

const InviteNewMember = ({ navigation }: any) => {
  const [joinedDate, setJoinedDate] = useState("");
  let query = useGetUserQuery();
  useEffect(() => {
    console.log("invitepage:", data.data.email);
  }, []);
  let data = query.data;

  const [individualInfo, setindividualInfo] = useState("");
  const [designation, setDesignation] = useState("");
  const [memberId, setMemberId] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState(data.data.email);

  const [inviteMember, { isLoading }] = useInviteMemberMutation();
  if (query.isFetching) return <PageLoader />;

  const sendRequest = async () => {
    if (!individualInfo.trim()) {
      Alert.alert(
        "Validation Error",
        "Member MobiHolder ID or Email is required",
      );
      return false;
    }
    console.log("called");
    if (!memberId.trim()) {
      Toast.show({ type: "error", text1: "Member?staff Id required" });
      return;
    }
    try {
      const response = await inviteMember({
        individualInfo,
        memberId,
        designation,
        organizationEmail,
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

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Invite New Member
            </Header>
            <View />
            {/* <AntDesign
                  name="pluscircle"
                  size={24}
                  color={colors.primary}
                  onPress={() => navigation.navigate("")}
                /> */}
          </View>

          <View style={tw` gap-5 mt-4 px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5 text-gray_light`}
            >
              Input Details to invite a new member to your Organisation
            </TextPrimary>
            <View style={tw`gap-2 mt-4`}>
              <InputTextWithLabel
                label="Member MobiHolder ID or Email"
                placeholder=" Enter member email or ID"
                value={individualInfo}
                onChangeText={(text) => setindividualInfo(text)}
              />
              <InputTextWithLabel
                label="Member/Staff ID"
                placeholder="Enter members staff ID"
                value={memberId}
                onChangeText={(text) => setMemberId(text)}
              />
              {/* <InputTextWithLabel
                label="
                (Designation)"
                placeholder="Enter members role(designation)"
                value={designation}
                onChangeText={(text) => setDesignation(text)}
              /> */}

              <MemberDesignations
                role={designation}
                onChange={setDesignation}
              />
              <ChooseDate
                label="Enter Joined date"
                placeholder="Enter Joined date"
                value={joinedDate}
                onChange={(date: any) => setJoinedDate(date)}
                maximumDate={new Date()}
              />
              <InputTextWithLabel
                label="Organisation Email"
                placeholder="Enter user organisation email"
                value={organizationEmail}
                onChangeText={(text) => setOrganizationEmail(text)}
              />
            </View>
            <View style={tw`pt-4`}>
              <PrimaryButton onPress={sendRequest} loading={isLoading}>
                Invite New Member
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default InviteNewMember;
// import {} from "mater"
import Modal from "react-native-modal";
import { newApi } from "../../state/newStates/flow";
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
let MemberDesignations = ({ role, onChange }: any) => {
  const [value, setValue] = useState<DESIGNATION>(null);
  const [showModal, setModal] = useState<boolean>(false);
  const [designation, setDesignation] = useState<string>("");
  useEffect(() => {
    if (value) {
      onChange(value.name);
    }
  }, [value]);
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

  // useEffect(() => {
  //   console.log("designations_query:", designations_data);
  //   console.log("designations_error:", JSON.stringify(designations.error));
  // }, [designations.isFetching, designations.isError, designations.error]);
  return (
    <View style={tw`flex-row items-center`}>
      <Modal
        isVisible={showModal}
        style={tw`bg-transparent`}
        onBackdropPress={() => {
          setModal(false);
        }}
      >
        <Toast />

        <View
          style={tw`elevation-2 bg-white p-3 px-4 gap-2 py-8  pt-4 rounded-xl`}
        >
          <View style={tw`flex-row`}>
            <TouchableOpacity
              onPress={(e) => {
                setModal(false);
              }}
              style={tw`bg-red-500 rounded-full h-8 w-8 items-center justify-center s-12 ml-auto  w-fit`}
            >
              <BaseText style={tw`text-lg text-white `}>x</BaseText>
            </TouchableOpacity>
          </View>
          <BaseText style={tw`mb-3 text-lg font-semibold`}>
            Create New Designation
          </BaseText>
          <InputTextWithLabel
            value={designation}
            onChangeText={setDesignation}
            label="Input new designation"
            placeholder="Input Designation Here"
          ></InputTextWithLabel>

          <PrimaryButton
            style={tw`text-xl`}
            size={22}
            onPress={async (e) => {
              try {
                if (designation.length < 1)
                  return Toast.show({
                    type: "error",
                    text1: "designation invalid",
                  });
                let resp = newApi.post(
                  "/api/memberships-subscriptions/designation/create",
                  {
                    name: designation,
                    description: "",
                  },
                );
                Toast.show({
                  type: "success",
                  text1: "created successfully",
                });
                setDesignation("");
                designations.refetch();

                setTimeout(() => {
                  // setModal(false);
                }, 1000);
              } catch (err) {
                Toast.show({
                  type: "error",
                  text1: "error occured",
                });
              }
            }}
          >
            <BaseText textColor="white">Create</BaseText>
          </PrimaryButton>
        </View>
      </Modal>
      <Dropdown
        style={tw`flex-1 p-3  rounded-lg bg-light dark:bg-gray_dark mb-2 `}
        placeholder="Select Role"
        activeColor={colors.primary}
        containerStyle={tw`bg-red-200 dark:bg-gray_dark bg-light shadow-xl`}
        itemContainerStyle={tw``}
        labelField={"label"}
        valueField={"value"}
        search
        dropdownPosition="top"
        searchPlaceholder="Search Roles"
        itemTextStyle={tw`text-sm text-black`}
        data={designations_data || []}
        value={value?.value || ""}
        onChange={(item) => {
          setValue(item);
        }}
      />
      <TouchableOpacity
        onPress={(e) => setModal(true)}
        style={tw` h-8 w-8 justify-center items-center bg-primary ml-2 rounded-full`}
      >
        <BaseText textColor="white" style={tw`text-xl`}>
          +
        </BaseText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
