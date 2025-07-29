import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";
import { useGetNotificationsQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import NotificationItem from "../../components/NotificationItem";

const NotificationListing = ({ navigation }: any) => {
  const { data, isLoading, refetch, isFetching } = useGetNotificationsQuery();

  const [refreshing, setRefreshing] = useState(false);
  if (isLoading) return <PageLoader />;

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

  const notificationData = data?.data;
  // const query = useGetNotificationsQuery();
  // useEffect(() => {
  //   console.log(JSON.stringify(query));
  // }, [query.isFetching]);
  return (
    <PageContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Notifications
            </Header>
            <View />
          </View>

          <View style={tw`mt-10 gap-2`}>
            {notificationData?.map((item: any, i: number) => (
              <NotificationItem
                item={item}
                key={i}
                onPress={() =>
                  navigation.navigate("NotificationDetails", {
                    data: { id: item.id, read: item?.read },
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default NotificationListing;

const styles = StyleSheet.create({});
