import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import BackButton from "../../components/BackButton";
import {
  useGetOrganizationQuery,
  useJoinOrganizationMutation,
} from "../../state/features/services/membership/membership";
import Toast from "react-native-toast-message";
import PageLoader from "../../components/Loader";
import { Dropdown } from "react-native-element-dropdown";
import { useQuery } from "@tanstack/react-query";

const OrganizationDetails = ({ navigation, route }: any) => {
  const { data: org } = route.params;
  const [designation, setDesignation] = useState();
  const [organizationEmail, setOrganizationEmail] = useState(org.email);

  const { data, isLoading: isGettingDetails } = useGetOrganizationQuery(
    org?.id,
  );

  const [joinOrganization, { isLoading }] = useJoinOrganizationMutation();

  const handleJoin = async () => {
    console.log("reached");

    // console.log(designation.name);
    // if (!designation.name.trim()) {
    //   Alert.alert("Validation Error", "Designation is required");
    //   return false;
    // }
    try {
      const response = await joinOrganization({
        organizationId: org.id,
        designation: designation?.name || "member",
        organizationEmail: org.email,
      });

      if (response?.error) {
        console.log(response.error);
        return Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });

      navigation.navigate("RequestSuccess");
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  useEffect(() => {
    console.log(data);
  }, []);
  if (isGettingDetails) return <PageLoader />;
  const designations_data = data?.data.map((e) => {
    return {
      label: e.name,
      value: e.name,
      ...e,
    };
  });

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Organisation Details
            </Header>
            <View />
          </View>

          <View style={tw`mt-5`}>
            <Image
              source={{ uri: org.photo }}
              resizeMode="cover"
              style={tw`w-full h-[183px]`}
            />
          </View>

          <View style={tw`mt-5 px-[5%] mb-10`}>
            {/* <TextPrimary font="medium" size={13}>
            {org.description}
            </TextPrimary> */}
            <View style={tw`mt-8 gap-4 `}>
              <ListItem
                icon={icons.card_number}
                itemKey="Name"
                value={org.companyName}
              />
              <ListItem
                icon={icons.company}
                itemKey="Address"
                value={`${org.companyAddress.street}, ${org.companyAddress.state} ${org.companyAddress.country}`}
              />
            </View>

            <View
              style={tw`border-t border-[${colors.gray_dark}] mt-10 pt-5 gap-4 `}
            >
              <Dropdown
                style={tw`flex-1 p-3  rounded-lg bg-gray-100 rounded-md dark:bg-gray_dark mb-2 `}
                placeholder="Select Role"
                activeColor={colors.primary}
                containerStyle={tw` dark:bg-gray_dark bg-light shadow-xl`}
                itemContainerStyle={tw``}
                labelField={"label"}
                valueField={"value"}
                search
                dropdownPosition="top"
                searchPlaceholder="Search Roles"
                itemTextStyle={tw`text-sm text-black`}
                data={designations_data || []}
                value={designation || ""}
                onChange={(item) => {
                  setDesignation(item);
                }}
              />
              <InputTextWithLabel
                label="Organization Email"
                value={org.email}
                editable={false}
              />
            </View>
            <View style={tw`mt-10`}>
              <PrimaryButton loading={isLoading} onPress={handleJoin}>
                Send Request
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default OrganizationDetails;

const styles = StyleSheet.create({});
