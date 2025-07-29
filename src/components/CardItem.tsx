import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { width } from "../utils/constants";
import VerticalCard from "./CardTemplates/VerticalCard";
import HorizontalCard from "./CardTemplates/HorizontalCard";

const CardItem = ({ navigation, style, cardData, card, onPress }: any) => {
  console.log(cardData?.organization);
  return (
    <Pressable onPress={onPress} style={style}>
      {card?.layout === "vertical" ? (
        <VerticalCard card={card} navigation={navigation} cardData={cardData} />
      ) : (
        <HorizontalCard
          cardData={cardData}
          card={card}
          navigation={navigation}
        />
      )}
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({});
