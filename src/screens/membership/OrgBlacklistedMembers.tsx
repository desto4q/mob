import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import AntDesign from "@expo/vector-icons/AntDesign";

import { useGetUserOrganizationMembershipQuery } from "../../state/features/services/membership/membership";
import InputText from "../../components/inputs/InputText";
import TextPrimary from "../../components/texts/text";
import icons from "../../utils/constants/icons";
import OrgMembershipItem from "../../components/membership/OrgMembershipItem";

const OrgBlacklistedMembers = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch, isFetching } =
    useGetUserOrganizationMembershipQuery("inactive");

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
    <PageContainer padding="0%">
      <View style={tw`flex-1  pb-10`}>
        <View style={tw` flex-row justify-between px-[5%]`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Blacklisted Members
          </Header>
          <AntDesign
            name="pluscircle"
            size={24}
            color={colors.primary}
            onPress={() => navigation.navigate("InviteNewMember")}
          />
        </View>
        <View>
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
      </View>
    </PageContainer>
  );
};

export default OrgBlacklistedMembers;

const styles = StyleSheet.create({});
