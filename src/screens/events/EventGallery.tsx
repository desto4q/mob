import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import PageContainer from "../../components/PageContainer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import TextPrimary from "../../components/texts/text";
import icons from "../../utils/constants/icons";
import { colors } from "../../utils/constants";
import EventItem from "../../components/event/EventItem";
import tw from "../../lib/tailwind";
import InputText from "../../components/inputs/InputText";
import { useGetEventsPublicQuery } from "../../state/features/services/events/events";
import BaseText from "../../components/BaseText";
import { useTokenStore } from "../../state/newStates/auth";
import { useQuery } from "@tanstack/react-query";

const EventGallery = ({ navigation }: any) => {
  const { data, isLoading, refetch, isFetching, isError, error } =
    useGetEventsPublicQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const key = useTokenStore((state) => state.value);
  useEffect(() => {
    console.log(isLoading, isFetching, data, isError, error);
  }, [isLoading, isFetching, data, isError]);
  //@ts-ignore
  const eventsData = data?.data;

  const filteredData = useMemo(() => {
    if (!eventsData || !Array.isArray(eventsData)) {
      return [];
    }

    if (!searchQuery.trim()) {
      return eventsData;
    }

    return eventsData.filter((item: any) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [eventsData, searchQuery]);

  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={tw` flex-row justify-between`}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={22} color="white" />
          </Pressable>
          <Header font="semi_bold" size={16}>
            Event Gallerys
          </Header>
          <View />
        </View>
        {isError ? (
          <View style={tw`flex-1 justify-center items-center flex`}>
            <View>
              <BaseText style={tw`text-xl`}>Error Occured</BaseText>
              <PrimaryButton style={tw`mt-2`} onPress={refetch}>
                Reload
              </PrimaryButton>
            </View>
          </View>
        ) : (
          <FlatList
            style={tw`mb-5 mt-6`}
            ListEmptyComponent={
              <View>{eventsData && <BaseText>No Events Found</BaseText>}</View>
            }
            data={filteredData}
            renderItem={({ item }) => (
              <View style={tw`my-1 mx-1 flex-1 `}>
                <EventItem
                  item={item}
                  onPress={() =>
                    navigation.navigate("EventDetailsPublic", {
                      eventId: item?.id,
                    })
                  }
                />
              </View>
            )}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            ListHeaderComponent={
              <View>
                <TextPrimary
                  color={colors.gray_light}
                  font="medium"
                  style={tw`mb-3`}
                >
                  All upcoming events
                  {/* <Text>{JSON.stringify(filteredData.length)}</Text> */}
                </TextPrimary>
                <InputText
                  icon={icons.search}
                  placeholder="Search"
                  style={tw`border border-[#484848] rounded-[10px] h-[36px] mb-2`}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            }
          />
        )}
      </SafeAreaView>
    </PageContainer>
  );
};

export default EventGallery;

const styles = StyleSheet.create({});
