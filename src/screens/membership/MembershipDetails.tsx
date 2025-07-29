import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput, // Added TextInput
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItem from "../../components/ListItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import BackButton from "../../components/BackButton";
import { formatDate } from "../../utils/helpers";
import { useGetOrgSubByIdQuery } from "../../state/features/services/subscription/subscription";
import PageLoader from "../../components/Loader";
import CenterModal from "../../components/modals/CenterModal";
import BaseText from "../../components/BaseText";
import { newApi, useMemberEdit } from "../../state/newStates/flow";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import EditMember from "./EditMember";
import { RefreshControl } from "react-native-gesture-handler";

const MembershipDetails = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { data } = route?.params;

  const { organization } = data;
  console.log("data", data);
  const navigate = useNavigation();
  const { data: orgData, isLoading,isFetching,refetch } = useGetOrgSubByIdQuery(organization?.id);
  const [loading, setIsLoading] = useState<boolean>(false);
  const {member,setMember}= useMemberEdit()

  const handleLeave = async () => {
    console.log("leaving");
    setIsLoading(true);
    try {
      let resp = await newApi.post(
        "/api/memberships-subscriptions/individual/leave/organization",
        {
          membershipId: data.id,
          reason: reason,
        },
      );
      Toast.show({
        text1: "Left Organization successfully",
        type: "success",
      });
      setLeaveModal(false);
      navigate.goBack();
    } catch (err) {
      Toast.show({
        text1: "error",
        text2: "error leaving",
        type: "error",
      });
      console.log("Error leaving organization:", err);
    }
    setIsLoading(false);
  };
  const orgPlans = orgData?.data;
  const [leaveModal, setLeaveModal] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const nav =useNavigation()
  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``} refreshControl={<RefreshControl refreshing={isFetching}  onRefresh={refetch}/>}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Membership Details
            </Header>
            <View />
          </View>

          <View style={tw`mt-5`}>
            <Image
              source={{ uri: organization.photo }}
              resizeMode="cover"
              style={tw`w-full h-[183px]`}
            />
          </View>

          <View style={tw`mt-5 px-[5%]`}>
            <View style={tw`mt-8 gap-4 `}>
              <ListItem
                icon={icons.card_number}
                itemKey="Member ID"
                value={data.memberId}
              />
              <ListItem
                icon={icons.company}
                itemKey="Organization"
                value={organization.companyName}
              />
              <ListItem
                icon={icons.mail}
                itemKey="Email"
                value={organization.companyEmail}
              />
              <ListItem
                icon={icons.phone}
                itemKey="Phone Number"
                value={organization.phoneNumber}
              />
              <ListItem
                icon={icons.event}
                itemKey="Date Joined"
                value={formatDate(data.dateJoined)}
              />

              <ListItem
                icon={icons.verify}
                valueColor={
                  data.status === "active"
                    ? "#4CD964"
                    : data.status === "pending"
                      ? "#F9BF13"
                      : "#F74D1B"
                }
                itemKey="Status"
                value={data.status}
              />
            </View>
            <View style={tw`mt-6 gap-4`}>
              <PrimaryButton onPress={(e)=>{
                setMember(data)
                nav.navigate("EditMember", { member: orgData });
              }}>
                Edit MemberShip
              </PrimaryButton>
              <PrimaryButton
                style={tw`bg-red-500`}
                onPress={() => {
                  setLeaveModal(true);
                }}
              >
                Leave Organization
              </PrimaryButton>
            </View>
            {orgPlans?.length > 0 && (
              <View style={tw`mt-4`}>
                <PrimaryButton
                  onPress={() =>
                    navigation.navigate("ViewSubscriptions", {
                      data: orgPlans,
                      orgId: organization?.id,
                    })
                  }
                >
                  Subscribe to Organization
                </PrimaryButton>
              </View>
            )}
          </View>
        </ScrollView>
        <CenterModal open={leaveModal} handleClose={() => setLeaveModal(false)}>
          <View style={tw`p-4`}>
            <BaseText style={tw`text-lg mt-2`}>
              Are you sure you want to leave organization
            </BaseText>
            <TextInput
              style={tw`border border-gray-300 rounded-md p-3 mt-4 text-base`}
              placeholder="Reason for leaving (optional)"
              multiline
              numberOfLines={4}
              value={reason}
              onChangeText={setReason}
            />
            <View style={tw`gap-2 mt-6`}>

              <PrimaryButton
                disabled={loading}
                style={tw`bg-red-500`}
                onPress={handleLeave}
              >
                <BaseText style={tw`text-xl`}>Yes</BaseText>
              </PrimaryButton>>
              <PrimaryButton
                onPress={() => {
                  setLeaveModal(false);
                }}
              >
                <BaseText style={tw`text-xl`}>No</BaseText>
              </PrimaryButton>
            </View>>
          </View>
        </CenterModal>
      </PageContainer>
    </>
  );
};

export default MembershipDetails;

const styles = StyleSheet.create({});
