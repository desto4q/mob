import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import TextPrimary from "../../components/texts/text";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { colors } from "../../utils/constants/colors";
import images from "../../utils/constants/images";
import Header from "../../components/texts/header";
import { home_data } from "../../utils/constants/data";
import ShadowGradient from "../../components/ShadowGradient";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useToggleMode } from "../../utils/helpers";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useGetUserQuery } from "../../state/features/services/users/user";
import OrganizationHomeCard from "../../components/OrganizationHomeCard";
import Insight from "../../components/Insight";
import Analytics from "../../components/Analytics";
import axios from "axios";
import { setLogout } from "../../state/features/slices/userSlice";
import { BaseUrl } from "../../config/url";
import Hero from "../../components/home_components/Hero";
import Headerbar from "../../components/home_components/HeaderBar";

const { width, height } = Dimensions.get("window");
const OrganizationHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const {
    data,
    isLoading: isGettingUser,
    refetch,
    isFetching,
    error,
  } = useGetUserQuery();

  console.log("error", error);
  const { companyName, mobiHolderId } = data?.data || {};
  React.useEffect(() => {
    refetch();
  }, []);

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
    <PageContainer padding={0} style={[tw`pt-0`]}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      <Headerbar {...data?.data} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
      >
        <Hero />
        <View style={tw`px-3`}>
          <View style={tw`flex-row items-center justify-between mb-6 px-3`}>
            <View>
              <TextPrimary
                size={24}
                font="montserrat_bold"
                color={colorScheme === "dark" ? "#FFFFFF" : "#1E293B"}
                style={tw`mb-1`}
              >
                Quick Actions
              </TextPrimary>
              <TextPrimary
                size={14}
                font="montserrat_medium"
                color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
              >
                Jump right in and get started
              </TextPrimary>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
            />
          </View>
        </View>
        <View style={tw`px-[2%]  `}>
          <FlatList
            data={home_data}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <OrganizationHomeCard item={item} navigation={navigation} />
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()} // ensure each item has a unique key
            columnWrapperStyle={styles.columnWrapper} // sets horizontal gap
            contentContainerStyle={styles.listContainer} // for overall styling
          />
        </View>
        <View style={tw`px-[5%] mt-10`}>
          <Insight />
        </View>
        {/* <View style={tw`px-[5%] mt-10`}>
          <Analytics />
        </View> */}
      </ScrollView>
    </PageContainer>
  );
};

export default OrganizationHome;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#0A0909",
    padding: 10,
    borderRadius: 10000,
    shadowColor: "#A026F1", // Shadow color
    shadowOffset: { width: -4, height: 0 }, // X-axis offset (-2) and no Y-axis offset
    shadowRadius: 4, // Spread of the shadow (similar to blur)
    shadowOpacity: 0.6, // Opacity of the shadow
    elevation: 4, // Add this for Android shadows
  },
  sliderImage: {
    width: width,
    height: height * 0.2,
    resizeMode: "cover",
    borderRadius: 10,
    overflow: "hidden",

    // justifyContent: "center",
    // alignItems: "center"
  },
  itemContainer: {
    flex: 1, // ensures items take up equal space
    // half of the desired vertical gap (10px)
    marginVertical: 12,
    marginHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  listContainer: {
    paddingVertical: 5, // extra space if needed at the top/bottom of list
  },
});
