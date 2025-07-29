import {
  FlatList,
  Image,
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
import TextPrimary from "../../components/texts/text";
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import EventVerifiersItem from "../../components/verifcation/EventVerifiersItem";
import BackButton from "../../components/BackButton";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import { useGetUserOrganizationMembershipQuery } from "../../state/features/services/membership/membership";
import OrgMembershipItem from "../../components/membership/OrgMembershipItem";
import ReusableBottomSheet from "../../components/shared/ReusableBottomSheet";

const OrgMembersList = ({ navigation }: any) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch, isFetching } =
    useGetUserOrganizationMembershipQuery("");

  const [modal, setModal] = useState(false);
  const toggleModal = (item: any) => {
    setSelectedMember(item);
    setModal(!modal);
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

  const closeModal = () => setModal(false);

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Create ID Card
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
              Choose a member to create card for
            </TextPrimary>
            <View style={tw``}>
              <InputText
                icon={icons.search}
                placeholder="Search "
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
              />
            </View>
          </View>

          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={tw`mt-5 ml-[5%] flex-1`}>
                <OrgMembershipItem
                  onPress={() => toggleModal(item.individual)}
                  item={item.individual}
                  status={item.status}
                />
              </View>
            )}
            numColumns={2}
            style={tw`mr-[5%]  mt-0`}
          />
        </ScrollView>
      </PageContainer>
      <ReusableBottomSheet
        isVisible={modal}
        onClose={closeModal}
        snapPoints={["40%"]}
      >
        <View style={tw`p-5 pt-2 `}>
          <TextPrimary font="medium" size={15} style={tw`text-center mt-0`}>
            Create ID Card for :
          </TextPrimary>
          <View style={tw`gap-5 mt-3`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={{ uri: selectedMember?.photo }}
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {selectedMember?.firstName} {selectedMember?.lastName}
                </TextPrimary>

                <TextPrimary
                  font="semi_bold"
                  size={11}
                  style={tw`text-[#696767]`}
                  color="#696767"
                >
                  {selectedMember?.email}
                </TextPrimary>
              </View>
            </View>

            <PrimaryButton
              size={13}
              style={tw``}
              onPress={() => {
                navigation.navigate("CreateCardOrg", { data: selectedMember });
                closeModal();
              }}
            >
              Proceed
            </PrimaryButton>
          </View>
        </View>
      </ReusableBottomSheet>
    </>
  );
};

export default OrgMembersList;

const styles = StyleSheet.create({});
