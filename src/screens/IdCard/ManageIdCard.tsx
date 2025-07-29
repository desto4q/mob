import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
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
import InvitationItem from "../../components/event/InvitationItem";
import ManageIdItem from "../../components/iDcards/ManageIdItem";
import { useGetUserOrganizationMembershipQuery } from "../../state/features/services/membership/membership";
import { useGetOrganizationMemberCardsQuery } from "../../state/features/services/card/card";

const ManageIdCard = ({ navigation }: any) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch, isFetching } =
    useGetOrganizationMemberCardsQuery("");

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

  console.log(filteredData);
  return (
    <>
      <PageContainer padding="0%">
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Manage ID Card
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
              Manage member card
            </TextPrimary>
            <View style={tw``}>
              <InputText
                icon={icons.search}
                placeholder="Search "
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <View style={tw`my-3`}>
                <ManageIdItem
                  item={item}
                  onPress={() =>
                    navigation.navigate("IdPreview", { id: item?.id })
                  }
                  image={images.verifier1}
                />
              </View>
            )}
            style={tw`px-[5%]`}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default ManageIdCard;

const styles = StyleSheet.create({});
