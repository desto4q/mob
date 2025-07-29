import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import TextPrimary from "../../components/texts/text";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../utils/constants/images";
import Header from "../../components/texts/header";
import HomeCard from "../../components/HomeCard";
import ShadowGradient from "../../components/ShadowGradient";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useToggleMode } from "../../utils/helpers";
import PagerView from "react-native-pager-view";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useGetUserQuery } from "../../state/features/services/users/user";
import tw from "../../lib/tailwind";
import { colors, home_data } from "../../utils/constants";
import Hero from "../../components/home_components/Hero";
import Headerbar from "../../components/home_components/HeaderBar";
import BaseText from "../../components/BaseText";

const Home = ({ navigation }) => {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  const { toggleColorMode } = useToggleMode();
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, isFetching } = useGetUserQuery();

  const { firstName, mobiHolderId } = data?.data || {};
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

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };
  const greeting = getGreeting();

  // return <HomeLoader />;

  return (
    <PageContainer padding={0} style={[tw`pt-0`]}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
      {/* header  */}

      <Headerbar {...data?.data} />
      <ScrollView
        style={tw`flex-1`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
            tintColor={colorScheme === "dark" ? `bg-[${colors.dark}]` : "#000"}
          />
        }
      >
        <Hero />

        <View style={tw`px-3 `}>
          <View style={tw`flex-row items-center justify-between mb-6 px-3`}>
            <View>
              <BaseText
                font="montserrat_bold"
                style={tw`mb-1 text-2xl font-semibold opacity-80`}
              >
                Quick Actions
              </BaseText>
              <BaseText style={tw`text-base`} font="inter">
                Jump right in and get started
              </BaseText>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color={colorScheme === "dark" ? "#94A3B8" : "#64748B"}
            />
          </View>

          <FlatList
            data={home_data}
            style={tw``}
            renderItem={({ item }) => (
              <View style={tw`flex-1 mb-4 flex`}>
                <View style={tw`mx-2  flex-1 `}>
                  <HomeCard item={item} navigation={navigation} />
                </View>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={tw`justify-between`}
            contentContainerStyle={tw`pb-6`}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default Home;
