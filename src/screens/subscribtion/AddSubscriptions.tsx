import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
import { useColorScheme } from "nativewind";
import MemberItem from "../../components/MemberItem";
import images from "../../utils/constants/images";
import BackButton from "../../components/BackButton";

const AddSubscriptions = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });

  const handleFilterChange = (field: string) => {
    setfilterData({ ...filterData, [field]: !filterData[field] });
  };

  console.log(filterData.active);
  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Add New Subscriptions
            </Header>
            {/* <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => navigation.navigate("JoinOrganization")}
              /> */}
            <View />
          </View>

          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            Choose one of your organization to subscribe
          </TextPrimary>

          <View style={tw`flex-row gap-5 mt-5`}>
            <View style={tw`flex-1`}>
              <InputText
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

          {/* <FlatList
              data={[...Array(4)]}
              renderItem={({}) => (
                <View style={tw`flex-1 m-2`}>
                  <MemberItem image={images.subscriptionItem} />
                </View>
              )}
              numColumns={2}
            /> */}
        </ScrollView>
      </PageContainer>
      <BottomModals open={filterModal} handleClose={toggleFilterModal}>
        <View
          style={tw`flex-row justify-between items-center p-5 border-b border-[#848383]`}
        >
          <AntDesign name="closecircleo" size={22} color="white" />
          <TextPrimary font="semi_bold">Search Filter</TextPrimary>
          <View />
        </View>
        <View style={tw`p-3 px-5`}>
          <TextPrimary
            font="medium"
            size={16}
            color={colors.gray}
            style={tw`text-gray mb-3 mt-4`}
          >
            Status
          </TextPrimary>
          <View style={tw`flex-row justify-between items-center`}>
            <TextPrimary font="medium" size={13}>
              Active
            </TextPrimary>
            <Checkbox
              checked={filterData.active}
              onChange={() => handleFilterChange("active")}
            />
          </View>
          <View style={tw`flex-row justify-between items-center mt-5`}>
            <TextPrimary font="medium" size={13}>
              InActive
            </TextPrimary>
            <Checkbox
              checked={filterData.inActive}
              onChange={() => handleFilterChange("inActive")}
            />
          </View>

          <TextPrimary
            font="medium"
            size={16}
            color={colors.gray}
            style={tw`text-gray mb-3 mt-8`}
          >
            Created By
          </TextPrimary>
          <View style={tw`flex-row justify-between items-center`}>
            <TextPrimary font="medium" size={13}>
              Me
            </TextPrimary>
            <Checkbox
              checked={filterData.me}
              onChange={() => handleFilterChange("me")}
            />
          </View>
          <View style={tw`flex-row justify-between items-center mt-5`}>
            <TextPrimary font="medium" size={13}>
              Organization
            </TextPrimary>
            <Checkbox
              checked={filterData.organization}
              onChange={() => handleFilterChange("organization")}
            />
          </View>
        </View>
        <View
          style={tw`flex-row justify-between items-center w-full p-5 py-4 border-t border-[#848383] mt-auto`}
        >
          <TextPrimary font="medium" size={14} style={tw`underline`}>
            Clear All
          </TextPrimary>
          <View />
          <PrimaryButton
            onPress={toggleColorScheme}
            style={tw`w-[131px] h-[45px]`}
          >
            Search
          </PrimaryButton>
        </View>
      </BottomModals>
    </>
  );
};

export default AddSubscriptions;

const styles = StyleSheet.create({});
