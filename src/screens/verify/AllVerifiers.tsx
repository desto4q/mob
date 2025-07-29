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
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import { useGetEventsQuery } from "../../state/features/services/events/events";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import TabSelect from "../../components/TabSelect";
import VerifiersEventItem from "../../components/verifcation/VerifiersEventItem";

const AllVerifiers = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const [tab, setTab] = useState<"events" | "verifiers">("events");
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
  const { data } = useGetEventsQuery();

  const events = data?.data;

  return (
    <>
      <PageContainer>
        <ScrollView style={tw`flex-1`}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Manage Verifiers
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
            A list of events you are verifier in
          </TextPrimary>

          <View style={tw`mt-4 mb-5`}>
            <View
              style={[
                tw`px-[8px] py-[5px] flex-row rounded-[20px]  dark:bg-gray_dark bg-light`,
              ]}
            >
              <Pressable
                style={[
                  tw` flex-1 items-center rounded-[20px] py-3`,
                  tab === "events" ? { backgroundColor: "#242EF2" } : {},
                ]}
                onPress={() => setTab("events")}
              >
                <TextPrimary
                  size={11}
                  style={[tab === "events" ? { color: "#fff" } : {}]}
                >
                  Events
                </TextPrimary>
              </Pressable>
              <Pressable
                style={[
                  tw` flex-1 items-center rounded-[20px] py-3`,
                  tab === "verifiers" ? { backgroundColor: "#242EF2" } : {},
                ]}
                onPress={() => setTab("verifiers")}
              >
                <TextPrimary
                  size={11}
                  style={[tab === "verifiers" ? { color: "#fff" } : {}]}
                >
                  Verifiers
                </TextPrimary>
              </Pressable>
            </View>
          </View>

          {tab === "events" && (
            <FlatList
              data={events}
              renderItem={({ item }) => (
                <View style={tw`my-1 mx-1`}>
                  <VerifiersEventItem
                    item={item}
                    onPress={() =>
                      navigation.navigate("VerifiersEventDetails", {
                        eventId: item.id,
                      })
                    }
                    image={images.event_img2}
                  />
                </View>
              )}
            />
          )}
        </ScrollView>
      </PageContainer>
      {/* <BottomModals open={filterModal} handleClose={toggleFilterModal}>
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
      </BottomModals> */}
    </>
  );
};

export default AllVerifiers;

const styles = StyleSheet.create({});
