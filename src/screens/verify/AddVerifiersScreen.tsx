import {
  FlatList,
  Image,
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
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ListItem from "../../components/ListItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants";
import EventImage from "../../components/EventImage";
import CardTag from "../../components/CardTag";
import DrawerIcon from "../../components/DrawerIcon";
import ListItemSmall from "../../components/ListItemSmall";
import BackButton from "../../components/BackButton";
import tw from "../../lib/tailwind";
import {
  useGetEventsQuery,
  useGetSingleEventQuery,
} from "../../state/features/services/events/events";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import { useCreateVerificationMutation } from "../../state/features/services/verification/verification";
import Toast from "react-native-toast-message";

const AddVerifiersScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { eventId } = route?.params;
  const [event, setevent] = useState("");
  const [email, setEmail] = useState("");
  const { data, isLoading } = useGetSingleEventQuery(eventId);
  const [addverifier, { isLoading: isAdding }] =
    useCreateVerificationMutation();
  const { data: myEvents, isLoading: isGettingEvents } = useGetEventsQuery();

  if (isLoading || isGettingEvents) return <PageLoader />;
  const events = myEvents?.data;
  const eventDetails = data?.data;

  const eventName = events?.map((event: any) => ({
    name: event.name,
    title: event.name,
    id: event.id,
  }));

  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Add fields are required",
      });
      return;
    }
    try {
      const response = await addverifier({
        eventId,
        userId: email,
      });

      console.log("response", response);

      if (response?.error) {
        Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between `}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Add Verifier
            </Header>
            <View />
          </View>
          <TextPrimary
            size={11}
            font="montserrat_medium"
            color="#3F6BB9"
            style={tw`mt-5`}
          >
            {eventDetails?.category?.name}
          </TextPrimary>
          <TextPrimary size={16} font="montserrat_semibold" style={tw`mt-5`}>
            {eventDetails?.name}
          </TextPrimary>
          <View style={tw`mt-5`}>
            <EventImage item={eventDetails} />
          </View>

          <View style={tw`mt-2 pb-10 `}>
            <View style={tw` gap-2`}>
              <InputTextWithLabel
                label="User ID/Email"
                placeholder="Enter user ID or email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <CustomSelectList
                list={eventName}
                title="Choose an active event"
                func={(text) => setevent(text)}
                //   func2={setTemplateId}
                label="Choose Event"
              />
            </View>

            <View style={tw`mt-10`}>
              <PrimaryButton onPress={handleSubmit} loading={isAdding}>
                Add Verifier
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default AddVerifiersScreen;

const styles = StyleSheet.create({});
