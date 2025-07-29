import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
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
import BackButton from "../../components/BackButton";
import { useGetIndividualCardsQuery } from "../../state/features/services/card/card";
import CardItem from "../../components/CardItem";
import PageLoader from "../../components/Loader";
import BaseText from "../../components/BaseText";
import { useEvent } from "react-native-reanimated";
import { Card } from "../../components/CardTemplates/HorizontalCard";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
export interface ViewCard {
  id: string;
  memberId: string;
  organizationId: string;
  templateId: string;
  cardNumber: string;
  designation: string;
  dateIssued: string;
  expiryDate: string;
  createdBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  template: Template;
  organization: Organization;
}

interface Template {
  id: string;
  organizationId: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  fontSize: number[];
  logo: string | null;
  layout: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Organization {
  isVerified: boolean;
  id: string;
  mobiHolderId: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerifiedAt: string;
  username: string;
  phoneNumber: string;
  dateOfBirth: string;
  companyName: string;
  companyAddress: {
    state: string;
    street: string;
    country: string;
  };
  companyEmail: string;
  aboutCompany: string;
  natureOfOrganization: string;
  isSuperAdmin: boolean;
  accountType: string;
  acceptedTnC: boolean;
  photo: string;
  wallet: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ViewCards = ({ navigation }) => {
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tempFilters, setTempFilters] = useState(filterData);
  const handleFilterChange = (field: keyof typeof filterData) => {
    setTempFilters((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  // console.log(filterData.active);
  // useEffect(() => {
  //   console.log(JSON.stringify(cardData[0]));
  // }, []);
  const { data, isLoading } = useGetIndividualCardsQuery();

  //@ts-ignore
  const cardData: Card[] = data?.data as unknown;

  const filteredData = useMemo(() => {
    if (!cardData) return [];

    let filtered = cardData;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item: ViewCard) =>
          item?.designation
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.organization.companyName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filters
    if (filterData.active || filterData.inActive) {
      filtered = filtered.filter((item: ViewCard) => {
        const isActive = new Date(item.expiryDate) > new Date();
        return (
          (filterData.active && isActive) || (filterData.inActive && !isActive)
        );
      });
    }

    // Apply card type filters (me = personal, organization = organizational)
    if (filterData.me || filterData.organization) {
      filtered = filtered.filter((item: ViewCard) => {
        // This logic might need adjustment based on your actual data structure
        // For now, assuming all cards in this view are personal cards
        return filterData.organization;
      });
    }

    return filtered;
  }, [cardData, searchQuery, filterData]);

  const applyFilters = () => {
    setfilterData(tempFilters);
    bottomSheetRef.current?.close();
  };

  const clearFilters = () => {
    const clearedFilters = {
      active: false,
      inActive: false,
      me: false,
      organization: false,
    };
    setfilterData(clearedFilters);
    setTempFilters(clearedFilters);
  };
  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw` flex-row justify-between`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                My Card
              </Header>
              <AntDesign
                name="pluscircle"
                size={24}
                color={colors.primary}
                onPress={() => navigation.navigate("AddCard")}
              />
            </View>

            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5`}
            >
              All your organisation cards
            </TextPrimary>

            <View style={tw`flex-row gap-5 mt-5`}>
              <View style={tw`flex-1`}>
                <InputText
                  icon={icons.search}
                  placeholder="Search"
                  style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity
                onPress={(e) => {
                  bottomSheetRef.current?.expand();
                }}
                style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
              >
                <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
              </TouchableOpacity>
            </View>

            <View style={tw`gap-4 mt-5`}>
              {filteredData?.map((card: any, index: number) => (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate("PreviewCard", { card })}
                  style={tw`dark:bg-gray_dark bg-light p-4 rounded-[10px] border border-[#484848]`}
                >
                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-1`}>
                      <TextPrimary font="medium" size={16} style={tw`mb-2`}>
                        Template: {card?.template?.name || "Card Name"}
                      </TextPrimary>
                      <TextPrimary
                        font="medium"
                        size={14}
                        color={colors.gray_light}
                      >
                        <BaseText style={tw`font-bold text-sm`}>
                          Company:{" "}
                        </BaseText>
                        {card?.organization?.companyName || "Organization"}
                      </TextPrimary>
                      <TextPrimary
                        font="medium"
                        size={12}
                        color={colors.gray_light}
                        style={tw`mt-1`}
                      >
                        <BaseText style={tw`font-bold`}>Role: </BaseText>
                        {card?.designation || "Designation"}
                      </TextPrimary>
                    </View>
                    <View style={tw`flex-row items-center gap-2`}>
                      <View
                        style={tw`px-2 py-1 rounded-full ${card?.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        <TextPrimary font="regular" size={10} color="white">
                          {card?.status || "Status"}
                        </TextPrimary>
                      </View>
                      <MaterialIcons
                        name="chevron-right"
                        size={20}
                        color={colors.gray_light}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageContainer>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["70%"]}
        backgroundStyle={tw`bg-gray-800`}
        index={-1}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
          />
        )}
      >
        <BottomSheetView
          style={tw`flex-1 p-6 ${colorScheme === "dark" ? "bg-gray_dark" : "bg-white"}`}
        >
          <Header font="semi_bold" size={18} style={tw`mb-6`}>
            Filter Cards
          </Header>

          <View style={tw`gap-4 `}>
            <View style={tw`flex-row items-center justify-between `}>
              <TextPrimary size={16} font="medium">
                Active Cards
              </TextPrimary>
              <Checkbox
                checked={tempFilters.active}
                onChange={() => handleFilterChange("active")}
              />
            </View>

            <View style={tw`flex-row items-center justify-between`}>
              <TextPrimary size={16} font="medium">
                Inactive Cards
              </TextPrimary>
              <Checkbox
                checked={tempFilters.inActive}
                onChange={() => handleFilterChange("inActive")}
              />
            </View>

            <View style={tw`flex-row items-center justify-between`}>
              <TextPrimary size={16} font="medium">
                Personal Cards
              </TextPrimary>
              <Checkbox
                checked={tempFilters.me}
                onChange={() => handleFilterChange("me")}
              />
            </View>

            <View style={tw`flex-row items-center justify-between`}>
              <TextPrimary size={16} font="medium">
                Organization Cards
              </TextPrimary>
              <Checkbox
                checked={tempFilters.organization}
                onChange={() => handleFilterChange("organization")}
              />
            </View>
          </View>

          <View style={tw`flex-row gap-3 mt-auto`}>
            <PrimaryButton
              style={tw`flex-1 py-3 px-4 border border-gray-300    bg-red-500`}
              onPress={clearFilters}
            >
              <BaseText>Clear All</BaseText>
            </PrimaryButton>

            <PrimaryButton onPress={applyFilters} style={tw`flex-1`}>
              Apply Filters
            </PrimaryButton>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default ViewCards;

const styles = StyleSheet.create({});
