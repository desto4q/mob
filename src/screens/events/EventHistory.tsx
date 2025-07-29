import {
  FlatList,
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
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import images from "../../utils/constants/images";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import EventHistoryItem from "../../components/event/EventHistoryItem";
import TabSelect from "../../components/TabSelect";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageLoader from "../../components/Loader";
import MaterialErrorComponent from "../../components/errors/ErrorComp";

const EventHistory = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState("invitations");
  const eventsQuery = useQuery({
    queryKey: ["events history"],
    queryFn: async () => {
      let resp = await newApi("/api/events/event/logs");
      return resp.data;
    },
  });

  if (eventsQuery.isFetching) return <PageLoader />;
  if (eventsQuery.isError)
    return (
      <MaterialErrorComponent
        backButton
        message={JSON.stringify(eventsQuery.error.response.data.message)}
      />
    );
  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              History
            </Header>
            <View />
          </View>
          <View style={tw` mt-6 gap-5`}>
            <TextPrimary style={tw` text-gray_light`}>
              All past events
            </TextPrimary>
            <TabSelect data={["My Events", "Invited Events"]} />
            {/* <FlatList
              data={[...Array(4)]}
              renderItem={({}) => (
                <View style={tw`my-2`}>
                  <EventHistoryItem />
                </View>
              )}
              style={tw` `}
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default EventHistory;

const styles = StyleSheet.create({});
