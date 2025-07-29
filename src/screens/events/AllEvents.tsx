import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import BottomModals from "../../components/modals/BottomModals";
import TextPrimary from "../../components/texts/text";
import Checkbox from "../../components/inputs/Checkbox";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";
import { useGetEventsQuery } from "../../state/features/services/events/events";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import OrgEventItem from "../../components/event/OrgEventItem";
import PageLoader from "../../components/Loader";

const AllEvents = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });

  const handleFilterChange = (field: string) => {
    setfilterData({ ...filterData, [field]: !filterData[field] });
  };
  const { data, isLoading } = useGetEventsQuery();

  const events = data?.data;

  const filteredData =
    events?.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || "";

  if (isLoading) return <PageLoader />;

  //   console.log(filterData.active);
  return (
    <>
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw` flex-row justify-between`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                All Events
              </Header>
              <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => navigation.navigate("CreateEvent")}
              />
            </View>

            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5`}
            >
              All events created by you
            </TextPrimary>
            <View style={tw`flex-row gap-5 mt-5 mb-3`}>
              <View style={tw`flex-1`}>
                <InputText
                  icon={icons.search}
                  placeholder="Search"
                  style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
             
            </View>
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <View style={tw`my-1 mx-1`}>
                  <OrgEventItem
                    onPress={() =>
                      navigation.navigate("EventDetails", {
                        eventId: item?.id,
                      })
                    }
                    image={images.event_img2}
                    item={item}
                  />
                </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </PageContainer>
      <BottomModals open={filterModal} handleClose={toggleFilterModal}>
        <View
          style={tw`flex-row justify-between items-center p-5 border-b border-[#848383]`}
        >
          <AntDesign
            name="closecircleo"
            size={22}
            color="white"
            style={tw`text-black dark:text-white`}
          />
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

export default AllEvents;

const styles = StyleSheet.create({});
