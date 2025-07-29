import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";
import { useGetSingleNotificationQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import TextPrimary from "../../components/texts/text";
import { newApi } from "../../state/newStates/flow";
import BaseText from "../../components/BaseText";

const NotificationDetails = ({ navigation, route }: any) => {
  const { id, read } = route?.params?.data;
  const { data, isLoading, refetch, isFetching } =
    useGetSingleNotificationQuery(id);

  const [refreshing, setRefreshing] = useState(false);

  // Mark as read if not already
  useEffect(() => {
    const markNotificationAsRead = async () => {
      if (!read) {
        try {
          await newApi.patch(`/api/users/notification/read?id=${id}`, {});
        } catch (error) {
          console.error("Failed to mark notification as read:", error);
        }
      }
    };
    markNotificationAsRead();
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

  if (isLoading) return <PageLoader />;

  const notification = data?.data;

  return (
    <PageContainer>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isFetching}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={tw`px-4 pb-10`}
      >
        {/* Header Row */}
        <View style={tw`flex-row items-center justify-between py-4`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header size={16} font="semi_bold">
            Notification
          </Header>
          <View style={tw`w-6`} />
          {/* Spacer to balance layout */}
        </View>
        <View style={tw`mt-6 p-4 rounded-xl dark:bg-gray_dark bg-light`}>
          <BaseText font="inter" style={tw`mb-2 text-xl font-bold underline `}>
            {notification?.type}
          </BaseText>

          <BaseText font="inter" style={tw`text-base `}>
            {notification?.message}
          </BaseText>
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default NotificationDetails;
