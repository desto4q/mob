import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import TextPrimary from "../texts/text";
import InvitedEventItem from "./InvitedEventItem";
import images from "../../utils/constants/images";
import tw from "twrnc";
import { colors } from "../../utils/constants";
import EventTicketItem from "./EventTicketItem";
import { useGetEventTicketsQuery } from "../../state/features/services/events/events";
import SimpleLoader from "../SimpleLoader";

const EventTickets = ({ navigation }:any) => {
  const [refreshing, setRefreshing] = useState(false);
  const {data, isLoading, refetch, isFetching} = useGetEventTicketsQuery()

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
  console.log(data?.data)
  return (
    <View style={tw`mt-6 flex-1`}>

      <FlatList
        data={data?.data}
        
        renderItem={({item}) => (
          <View style={tw`my-2`}>
            <EventTicketItem
              onPress={() => navigation.navigate("TicketDetails", {eventId: item?.eventId})}
              image={images.event}
              item={item}
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

export default EventTickets;

const styles = StyleSheet.create({});
