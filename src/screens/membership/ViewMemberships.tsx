import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  RefreshControl,
  View,
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
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import BottomModals from "../../components/modals/BottomModals";
import TextPrimary from "../../components/texts/text";
import Checkbox from "../../components/inputs/Checkbox";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import CardListing from "../../components/CardListing";
import images from "../../utils/constants/images";
import { useGetUserMembershipQuery } from "../../state/features/services/membership/membership";
import BackButton from "../../components/BackButton";
import MemberItem from "../../components/MemberItem";
import SimpleLoader from "../../components/SimpleLoader";
import PageLoader from "../../components/Loader";
import { useFocusEffect } from "@react-navigation/native";

const ViewMemberships = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: orgData,
    isLoading,
    refetch,
    isFetching,
  } = useGetUserMembershipQuery("activeFromOrganization");
  const {
    data: indData,
    isLoading: isGettingInd,
    refetch: refetchInd,
    isFetching: isRefetchingInd,
  } = useGetUserMembershipQuery("activeFromIndividual");
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchInd();
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      refetchInd();
    }, []),
  );
  const combinedData = [...(orgData?.data || []), ...(indData?.data || [])];

  const filteredData = combinedData.filter((item) => {
    const fullName = item.organization?.companyName?.toLowerCase() || "";
    const email = item.organization?.email?.toLowerCase() || "";

    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });
  // console.log(filteredData);
  if (isGettingInd || isLoading) return <PageLoader />;
  return (
    <>
      <PageContainer>
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isRefetchingInd || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between items-center`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Membership
            </Header>
            <AntDesign
              name="pluscircle"
              size={24}
              color={colors.primary}
              onPress={() => navigation.navigate("JoinOrganization")}
            />
          </View>

          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            All your memberships (
            {indData?.data?.length + orgData?.data?.length})
          </TextPrimary>

          <View style={tw`flex-row gap-5 mt-5`}>
            <View style={tw`flex-1`}>
              <InputText
                value={searchQuery}
                onChangeText={setSearchQuery}
                icon={icons.search}
                placeholder="Search"
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
              />
            </View>
            {/* <Pressable
                onPress={toggleFilterModal}
                style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
              >
                <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
              </Pressable> */}
          </View>

          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={tw`flex-1 m-2`}>
                <MemberItem
                  item={item?.organization}
                  designation={item.designation}
                  onPress={() =>
                    navigation.navigate("MembershipDetails", { data: item })
                  }
                />
              </View>
            )}
            numColumns={2}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default ViewMemberships;

const styles = StyleSheet.create({});
