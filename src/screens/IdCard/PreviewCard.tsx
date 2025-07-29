import { View, ScrollView, TouchableOpacity } from "react-native";
import BaseText from "../../components/BaseText";
import PageContainer from "../../components/PageContainer";
import CardAction from "../../components/CardAction";
import { useEffect } from "react";
import { ViewCard } from "./ViewCards";
import CardItem from "../../components/CardItem";
import { useTokenStore } from "../../state/newStates/auth";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import { useGetUserQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";

export default function PreviewCard({ route, navigation }) {
  const { card } = route.params;
  let previewCard = card as ViewCard;
  let token = useTokenStore((state) => state.value);
  const query = useGetUserQuery();

  const newCard = { ...previewCard, individual: query.data.data };
  useEffect(() => {
    // console.log(query.data.data);
  }, []);

  if (query.isFetching) return <PageLoader />;
  return (
    <PageContainer>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`flex-1 p-2`}>
          <View
            style={tw`mb-5 items-center justify-between relative flex items-center flex-row`}
          >
            <BackButton onPress={() => navigation.goBack()} />
            <Header>
              <BaseText style={tw`text-2xl font-bold`}>Card Preview</BaseText>
            </Header>
            <View></View>
          </View>
          <View style={tw``}>
            <View style={tw`w-[282px] mx-auto`}>
              <CardItem
                onPress={() => {
                  navigation.navigate("ViewCardDetails", { id: card?.id });
                }}
                cardData={newCard}
                card={card?.template}
              />
            </View>
          </View>
          <View style={tw`py-5`}>
            <CardAction
              title="View Details"
              onPress={() => {
                navigation.navigate("ViewCardDetails", {
                  id: card?.id,
                  card: newCard,
                });
              }}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
}
