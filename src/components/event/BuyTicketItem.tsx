import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../utils/constants";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import { Ticket } from "../../screens/events/BuyTicket";
interface TicketItem extends Ticket {
  quantity?: number;
  [key: string]: any;
}
const BuyTicketItem = ({
  isActive,
  onPress,
  name,
  price,
  quantity,
  ticketsAvailable,
}: TicketItem) => {
  const { colorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        tw`flex-row bg-[${colors.gray_dark}] border rounded-[10px] p-4 bg-light dark:bg-[#2E2F36]`,
        {
          borderColor: isActive ? colors.primary : "transparent",
        },
      ]}
    >
      <View style={tw`flex-1 gap-2`}>
        <TextPrimary size={10} style={tw`uppercase`}>
          {name}
        </TextPrimary>
        <TextPrimary size={14} font="semi_bold">
          {price}
        </TextPrimary>

        <TextPrimary size={12} color={colors.gray_light}>
          Quantity: {ticketsAvailable}
        </TextPrimary>
        {/* <TextPrimary size={12} color={colors.gray_light}>
          Limited customization and control...
        </TextPrimary> */}
      </View>

      {isActive ? (
        <Ionicons name="radio-button-on" size={25} color={colors.primary} />
      ) : (
        <Ionicons name="radio-button-off" size={25} color={colors.gray_light} />
      )}
    </Pressable>
  );
};

export default BuyTicketItem;

const styles = StyleSheet.create({});
