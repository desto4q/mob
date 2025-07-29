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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import { useColorScheme } from "nativewind";
import CreateEventForm1 from "../../components/event/CreateEventForm1";
import CreateEventForm2 from "../../components/event/CreateEventForm2";
import BackButton from "../../components/BackButton";
import tw from "../../lib/tailwind";
import { useGetSingleEventQuery } from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";

const CreateEvent = ({ navigation, route }:any) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { eventId } = route?.params || '';

  const [form, setForm] = useState(1);

  const { data, isLoading } = useGetSingleEventQuery(eventId);

  if (isLoading) return <PageLoader />;

  const eventDetails = data?.data;

  return (
    <>
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw` flex-row justify-between`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                Create Event
              </Header>
              <View />
            </View>

            <View style={tw`gap-4 my-5 `}>
              <View style={tw`gap-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <TextPrimary style={tw`text-center`}>About</TextPrimary>
                  <TextPrimary style={tw`text-center`}>Location & Time</TextPrimary>
                  <TextPrimary style={tw`text-center`}>Tickets</TextPrimary>
                </View>
                <View style={tw` bg-gray_light rounded-3xl h-[2px] w-full`}>
                  <View style={[tw`bg-[#242EF2] rounded-3xl h-[2px] w-3/12`]} />
                </View>
              </View>
            </View>
            <View style={tw`mt-5 pb-10`}>
              <CreateEventForm1 navigation={navigation} eventDetails={eventDetails} />
             
            </View>
          </ScrollView>
        </SafeAreaView>
      </PageContainer>
    </>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({});
