import {
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
import InputText from "../inputs/InputText";
import icons from "../../utils/constants/icons";
import OrgMembershipItem from "./OrgMembershipItem";
import { useGetUserOrganizationMembershipQuery } from "../../state/features/services/membership/membership";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants";

const MembershipListing = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch, isFetching } =
    useGetUserOrganizationMembershipQuery("");

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

  const filteredData = data?.data?.filter((item) => {
    const fullName =
      `${item.individual.firstName} ${item.individual.lastName}`.toLowerCase();
    const email = item.individual.email?.toLowerCase() || "";

    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <View style={tw``}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={tw`mt-5 ml-[5%] flex-1`}>
            <OrgMembershipItem
              onPress={() =>
                navigation.navigate("MemberPreview", { data: item })
              }
              item={item.individual}
              status={item.status}
            />
          </View>
        )}
        numColumns={2}
        style={tw`mr-[5%]  mt-0 `}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching || isLoading}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <View style={tw`px-[5%]`}>
            <TextPrimary
              font="medium"
              size={13}
              color={colors.gray_light}
              style={tw`mt-5 `}
            >
              All members
            </TextPrimary>

            <View style={tw`flex-row gap-5 mt-5`}>
              <View style={tw`flex-1`}>
                <InputText
                  icon={icons.search}
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
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
  );
};

export default MembershipListing;

const styles = StyleSheet.create({});
