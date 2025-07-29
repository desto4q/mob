import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import { useGetEventLogsQuery } from "../../state/features/services/events/events";
import InvitationItem from "./InvitationItem";
import images from "../../utils/constants/images";

const EventLogsListing = ({ navigation, eventId }: any) => {
  const { data, isLoading, refetch, isFetching } = useGetEventLogsQuery(eventId);
  const [refreshing, setRefreshing] = useState(false);

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
  console.log("eventLogs", data);
  return (
    <View style={tw`flex-1 px-[5%]`}>
      <FlatList
        data={data?.data}
        renderItem={({item}) => (
          <View style={tw`my-3`}>
            <InvitationItem
            item={item}
              // onPress={() => navigation.navigate("EventDetails")}
              image={images.event}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default EventLogsListing;

const styles = StyleSheet.create({});
