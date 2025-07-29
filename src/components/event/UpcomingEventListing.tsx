import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants";
import EventItem from "./EventItem";
import { useGetEventsPublicQuery } from "../../state/features/services/events/events";
import SimpleLoader from "../SimpleLoader";
import InputText from "../inputs/InputText";
import icons from "../../utils/constants/icons";

const UpcomingEventListing = ({ navigation }) => {
  const { data, isLoading, refetch, isFetching } = useGetEventsPublicQuery();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const eventsData = data?.data;

  if (isLoading) return <SimpleLoader />;
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

  const filteredData =
    eventsData?.filter((item:any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || "";

  return (
    <View style={tw`pt-6 mb-10`}>
      <FlatList
        style={tw`mb-5`}
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
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <View>
            <TextPrimary color={colors.gray_light} font="medium" style={tw`mb-3`}>
              All upcoming events
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
    </View>
  );
};

export default UpcomingEventListing;

const styles = StyleSheet.create({});
