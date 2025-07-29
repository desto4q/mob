import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Listcomp } from "./ListComp";
import { colors } from "../../utils/constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import { COUNTRY } from "../forms/SignUpForm2";

interface Props {
  list: {
    [key: string]: COUNTRY;
  };
  title: string;
  func: (value: string) => void;
  func2?: (id: string) => void;
  width?: number;
  height?: number;
  errorMessage?: any;
  label?: string;
  editable?: boolean;
}

export const CustomSelectList: React.FC<Props> = ({
  list,
  title,
  func,
  height,
  func2,
  errorMessage,
  label,
  editable,
}) => {
  const [input, setInput] = useState<string>(title);
  const [isListVisible, setIsListVisible] = useState<boolean>(false);
  // const { mode } = useSelector((state: RootState) => state.user);
  return (
    <View>
      {label && (
        <TextPrimary
          size={13}
          font="medium"
          style={[{ marginBottom: 3 }, tw` text-gray_light`]}
        >
          {label}
        </TextPrimary>
      )}
      <TouchableOpacity
        onPress={() => !editable && setIsListVisible(!isListVisible)}
        style={[
          styles.selectContainer,
          { height: height || 54 },
          tw`bg-light dark:bg-gray_dark`,
        ]}
      >
        <TextPrimary
          style={[
            styles.selectText,
            tw`dark:text-[${input === title ? "#EEEEEE" : "#EEEEEE"}] `,
          ]}
        >
          {input ? input : title}
        </TextPrimary>
        <AntDesign name="caretdown" size={18} color={colors.gray_light} />
      </TouchableOpacity>

      {isListVisible && (
        <View style={[styles.listContainer, tw`bg-light dark:bg-gray_dark`]}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            onScrollBeginDrag={() => {}}
            onScrollEndDrag={() => {}}
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode="never"
          >
            {Object.entries(list || {}).map(([key, item], index) => (
              <Listcomp
                key={index}
                text={item.country || item.title || ""}
                func={(text) => {
                  setInput(text);
                  func(text);
                  if (func2) {
                    func2(item.id);
                  }
                  setIsListVisible(false);
                }}
              />
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      )}
      {errorMessage && (
        <TextPrimary style={tw`text-red-600`}>{errorMessage}</TextPrimary>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: colors.gray_dark,
    borderRadius: 10,
  },
  selectText: {
    fontSize: 12,
  },
  listContainer: {
    backgroundColor: colors.gray_dark,
    borderRadius: 6,
    marginTop: 5,
    zIndex: 2,
    maxHeight: 150,
  },
});
