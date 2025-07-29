import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants";
import TextPrimary from "../../components/texts/text";
import EventItem from "../../components/event/EventItem";
import images from "../../utils/constants/images";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import InvitedEvent from "../../components/event/InvitedEvent";
import EventTickets from "../../components/event/EventTickets";
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import EventVerifiersItem from "../../components/verifcation/EventVerifiersItem";
import OrgSubscriptionItem from "../../components/OrgSubscriptionItem";
import { useGetSubscriptionQuery } from "../../state/features/services/subscription/subscription";
import PageLoader from "../../components/Loader";
import BaseText from "../../components/BaseText";
import MaterialErrorComponent from "../../components/errors/ErrorComp";
import { RefreshControl } from "react-native-gesture-handler";

const OrgSubscription = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<"membership" | "request" | "invites">(
    "membership",
  );

  const {
    data: orgSub,
    isFetching,
    isError,
    refetch,
    error,
  } = useGetSubscriptionQuery();
  useEffect(() => {
    console.log(JSON.stringify(error));
  }, [isError]);
  if (isFetching) return <PageLoader />;
  if (isError)
    return (
      <PageContainer>
        <View>
          <BackButton />
        </View>
        <MaterialErrorComponent
          title="Failed to load subscription"
          message="We couldn't load your subscription data. Please check your connection and try again."
          onRetry={() => refetch()}
        />
      </PageContainer>
    );
  const subData = orgSub?.data;

  console.log(subData);

  return (
    <PageContainer>
      <ScrollView
        style={tw``}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing={isFetching}
          ></RefreshControl>
        }
      >
        <View style={tw` flex-row justify-between`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Subscription
          </Header>
          <AntDesign
            name="pluscircle"
            size={24}
            color={colors.primary}
            onPress={() => navigation.navigate("AddSubscriptionPlan")}
          />
        </View>
        <BaseText size={13} font="medium" style={tw`mt-5 `}>
          All created Subscription Plans
        </BaseText>
        <BaseText
          size={10}
          font="medium"
          // color={colors.gray_light}
          style={tw`mt-1 text-gray_light`}
        >
          Swipe to delete or edit
        </BaseText>

        <View style={tw`mt-8 gap-5`}>
          {subData?.map((item: any) => (
            <OrgSubscriptionItem item={item} />
          ))}
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default OrgSubscription;

const styles = StyleSheet.create({});
