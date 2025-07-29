import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState, useMemo } from "react";
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
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import BackButton from "../../components/BackButton";
import {
  useGetIndividualCardsQuery,
  useGetPersonalCardsQuery,
} from "../../state/features/services/card/card";
import CardItem from "../../components/CardItem";
import PageLoader from "../../components/Loader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BaseText from "../../components/BaseText";
export interface IndividualCard {
  id: string;
  individualId: string;
  cardNumber: string;
  designation: string;
  issuingOrganization: string;
  issuedDate: string; // ISO date string
  expiryDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  scanIDCard: {
    frontIdCard: string;
    backIdCard: string;
  };
}

const ViewPersonalCards = ({ navigation }) => {
  // All hooks moved to top
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const { data, isLoading, refetch, isFetching } = useGetPersonalCardsQuery();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [refreshing, setRefreshing] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });
  const [tempFilters, setTempFilters] = useState(filterData);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const cardData = data?.data as IndividualCard[];

  const filteredData = useMemo(() => {
    if (!cardData) return [];

    let filtered = cardData;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item: IndividualCard) =>
          item?.designation
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.issuingOrganization
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filters
    if (filterData.active || filterData.inActive) {
      filtered = filtered.filter((item: IndividualCard) => {
        const isActive = new Date(item.expiryDate) > new Date();
        return (
          (filterData.active && isActive) || (filterData.inActive && !isActive)
        );
      });
    }

    // Apply card type filters (me = personal, organization = organizational)
    if (filterData.me || filterData.organization) {
      filtered = filtered.filter((item: IndividualCard) => {
        // This logic might need adjustment based on your actual data structure
        // For now, assuming all cards in this view are personal cards
        return filterData.me;
      });
    }

    return filtered;
  }, [cardData, searchQuery, filterData]);

  // Early return after hooks
  if (isLoading) return <PageLoader />;

  const toggleFilterModal = () => setFilterModal(!filterModal);

  const handleFilterChange = (field: keyof typeof filterData) => {
    setTempFilters((prev) => ({ ...prev, [field]: !prev[field] }));
  };

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

  return (
    <>
      <PageContainer>
        <View style={tw` flex-row justify-between`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Personal Cards
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
          All your personal cards
        </TextPrimary>

        <View style={tw`flex-row gap-3 mt-5`}>
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
            style={tw`bg-${colorScheme === "dark" ? "gray-700" : "gray-100"} border border-${colorScheme === "dark" ? "gray-600" : "gray-300"} rounded-[10px] h-[36px] w-[36px] items-center justify-center`}
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="filter-list"
              size={18}
              color={
                colorScheme === "dark" ? colors.gray_light : colors.gray_dark
              }
            />
          </TouchableOpacity>
        </View>

        <View style={tw`gap-4 mt-5 flex-1`}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => {
              // const imageData = JSON.parse(item?.scanIDCard);
              console.log("card id", item?.scanIDCard);
              const isActive = new Date(item.expiryDate) > new Date();
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ViewPersonalCardDetails", {
                      cardId: item.id,
                    })
                  }
                  style={tw`mt-3`}
                >
                  <View
                    style={tw`bg-white border border-gray-300 rounded-xl p-4 shadow-sm ${colorScheme === "dark" ? "bg-gray-800 border-gray-600" : "bg-white"}`}
                  >
                    {/* Card Header */}
                    <View
                      style={tw`flex-row justify-between items-center mb-3`}
                    >
                      <View style={tw`flex-1`}>
                        <Header
                          size={14}
                          font="semi_bold"
                          style={tw`text-gray-700 ${colorScheme === "dark" ? "text-gray-200" : "text-gray-700"}`}
                        >
                          {item?.issuingOrganization}
                        </Header>
                        <TextPrimary
                          size={12}
                          color={colors.gray_light}
                          style={tw`mt-1`}
                        >
                          {item?.designation}
                        </TextPrimary>
                      </View>
                      <View
                        style={tw`px-2 py-1 rounded-full ${isActive ? "bg-green-800" : "bg-red-700"}`}
                      >
                        <TextPrimary
                          size={10}
                          font="medium"
                          color={isActive ? "#059669" : "#DC2626"}
                        >
                          {isActive ? "ACTIVE" : "EXPIRED"}
                        </TextPrimary>
                      </View>
                    </View>

                    {/* Card Image */}
                    <View
                      style={tw`bg-gray-100 rounded-lg overflow-hidden ${colorScheme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                    >
                      <Image
                        source={{ uri: item?.scanIDCard?.frontIdCard }}
                        resizeMode="cover"
                        style={tw`w-full h-[140px]`}
                      />
                    </View>

                    {/* Card Footer */}
                    <View
                      style={tw`flex-row justify-between items-center mt-3`}
                    >
                      <View>
                        <TextPrimary size={11} color={colors.gray_light}>
                          Card Number
                        </TextPrimary>
                        <TextPrimary size={12} font="medium" style={tw`mt-1`}>
                          {item?.cardNumber || "N/A"}
                        </TextPrimary>
                      </View>
                      <View style={tw`items-end`}>
                        <TextPrimary size={11} color={colors.gray_light}>
                          Expires
                        </TextPrimary>
                        <TextPrimary size={12} font="medium" style={tw`mt-1`}>
                          {new Date(item?.expiryDate).toLocaleDateString()}
                        </TextPrimary>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing || isFetching}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
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
              style={tw`flex-1 py-3 px-4 border border-gray-300   bg-transparent bg-red-500`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
export default ViewPersonalCards;
