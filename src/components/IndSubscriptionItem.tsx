import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import { useDeleteSubscriptionMutation } from "../state/features/services/subscription/subscription";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../utils/constants";

const IndSubscriptionItem = ({ item, onPress, isActive }) => {
  const navigation = useNavigation();
  const [deleteSub, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  const handleDelete = async () => {
    try {
      const result: any = await deleteSub({
        planId: item.id,
      });
      if (result?.error) {
        console.log("result error", result?.error);
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
      });
      // Call delete API or remove from state
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={tw`dark:bg-gray_dark gap-3 bg-light p-4 rounded-[10px] relative`}
    >
      <TextPrimary font="medium" size={14} style={tw` uppercase`}>
        {item?.name}
      </TextPrimary>
      <TextPrimary size={11} lineHeight={13.3} style={tw`text-gray_light`}>
        {item?.description}
      </TextPrimary>
      <View style={tw`flex-row items-center justify-between`}>
        <TextPrimary size={14} font="medium">
          {item?.validity} Month
        </TextPrimary>
        <TextPrimary size={14}>N{item?.price}</TextPrimary>
      </View>
      <View style={tw`absolute right-2 top-2`}>
        {isActive ? (
          <Ionicons name="radio-button-on" size={25} color={colors.primary} />
        ) : (
          <Ionicons
            name="radio-button-off"
            size={25}
            color={colors.gray_light}
          />
        )}
      </View>
    </Pressable>
  );
};

export default IndSubscriptionItem;

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
  },
  actionText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});
