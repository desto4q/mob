import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TextPrimary from "../texts/text";
import InvitedEventItem from "./InvitedEventItem";
import images from "../../utils/constants/images";
import tw from "twrnc";
import { colors } from "../../utils/constants";

const InvitedEvent = ({ navigation }:any) => {
  
  return (
    <View style={tw`mt-6 flex-1`}>
      <TextPrimary color={colors.gray_light} font="medium">
        Today
      </TextPrimary>

      <FlatList
        data={[]}
        renderItem={({}) => (
          <View style={tw`my-1`}>
            <InvitedEventItem
              onPress={() =>  navigation.navigate("EventDetails")}
              image={images.event}
            />
          </View>
        )}
      />
    </View>
  );
};

export default InvitedEvent;

const styles = StyleSheet.create({});
