import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextPrimary from "../../components/texts/text";
import CardTag from "../../components/CardTag";
import CardItem from "../../components/CardItem";
import ListItem from "../../components/ListItem";
import BackButton from "../../components/BackButton";
import { useViewIndividualCardDetailsQuery } from "../../state/features/services/card/card";
import PageLoader from "../../components/Loader";
import { formatDate } from "../../utils/helpers";
import { ViewCard } from "./ViewCards";

const ViewCardDetails = ({ navigation, route }: any) => {
  const cardId = route?.params?.id;
  const cardProps: ViewCard = route.params.card as unknown as any;
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });

  const { data, isLoading } = useViewIndividualCardDetailsQuery(cardId);

  if (isLoading) return <PageLoader />;
  const cardDetails = data?.data;
  const cardDataTemplate = cardDetails?.template;
  const cardDataIndividual = cardDetails?.individual;
  const cardDataOrganization = cardDetails?.organization;

  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              View Card Detail
            </Header>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#C4C4C4"
            />
          </View>
          <TextPrimary
            size={16}
            font="semi_bold"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            {cardProps?.organization?.companyName}
          </TextPrimary>

          <View style={tw`mt-5`}>
            <CardTag
              color={colors.primary}
              bgColor="#A324F21A"
              text="Created by Organization"
            />
            {/* <CardItem
                cardData={cardDetails}
                card={cardDetails?.template}
                style={tw`mt-5`}
              /> */}

            <View style={tw`mt-8 gap-4`}>
              <ListItem
                icon={icons.card_number}
                itemKey="Card iD"
                value={cardProps?.cardNumber}
              />
              <ListItem
                icon={icons.company}
                itemKey="Organization"
                value={cardProps.organization?.companyName}
              />
              <ListItem
                icon={icons.role}
                itemKey="Role"
                value={cardProps?.designation}
              />
              <ListItem
                icon={icons.event}
                itemKey="Date Issued"
                value={formatDate(cardProps?.dateIssued)}
              />
              <ListItem
                icon={icons.event}
                itemKey="Expiry Date"
                value={formatDate(cardProps?.expiryDate)}
              />
              <ListItem
                icon={icons.verify}
                valueColor={
                  cardProps?.status === "active" ? "#4CD964" : "#F74D1B"
                }
                itemKey="Status"
                value={cardProps?.status}
              />
            </View>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default ViewCardDetails;

const styles = StyleSheet.create({});
