import React, { SetStateAction, useState } from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
// import {chevronRight, chevronTop, colors, electricity, fonts, globalStyles} from '@/utils';
import ImageComp from "../ImageComp";
import TextPrimary from "../texts/text";
import { colors, fonts, globalStyles } from "../../utils";
import tw from "../../lib/tailwind";
import icons from "../../utils/constants/icons";

interface DropdownComponentProps {
  style?: ViewStyle;
  setValue: SetStateAction<any>;
  value: string | null;
  data: any;
  label?: string | null;
  errorMessage?: string;
}

export const DropdownComponent = ({
  style,
  setValue,
  value,
  data,
  label,
  errorMessage,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: {
    label: string;
    value: string;
    icon: ImageSourcePropType;
  }) => {
    return (
      <View style={[styles.itemContainer, tw`dark:bg-gray_dark `]}>
        {/* <ImageComp source={item.icon} size={20} /> */}
        <Text style={[styles.itemText, tw`dark:text-white text-black`]}>
          {item.label}
        </Text>
        <View style={styles.circle} />
      </View>
    );
  };

  return (
    <View style={[styles.container, style, tw``]}>
      <TextPrimary
        font="fontMedium"
        style={{ marginBottom: globalStyles.margin.xxs }}
      >
        {label}
      </TextPrimary>
      <Dropdown
        style={[styles.dropdown, tw`dark:bg-gray_dark  bg-light`]}
        placeholderStyle={[
          styles.placeholderStyle,
          tw`dark:text-white text-black`,
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          tw`dark:text-white text-black`,
        ]}
        inputSearchStyle={[
          styles.inputSearchStyle,
          tw`dark:text-white text-black dark:bg-gray_dark `,
        ]}
        containerStyle={styles.flatListContainer}
        iconStyle={styles.iconStyle}
        data={data}
        search={true}
        maxHeight={315}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select..." : "Select..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderItem={renderItem}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
        renderRightIcon={() => (
          <ImageComp
            size={isFocus ? 10 : 20}
            image={isFocus ? icons.dropdown : icons.dropdown}
            style={{ tintColor: colors.primaryLight }}
          />
        )}
        flatListProps={{
          onScrollToIndexFailed: () => {},
          initialScrollIndex: 0,
        }}
      />
      {errorMessage && (
        <TextPrimary style={tw`text-red-600`}>{errorMessage}</TextPrimary>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.white,
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderRadius: globalStyles.radius.xmd - 4,
    paddingHorizontal: 8,
  },
  itemContainer: {
    paddingVertical: globalStyles.padding.xs + 5,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    gap: globalStyles.padding.xxs + 3,
  },
  itemText: {
    fontSize: fonts.text.smallText,
    color: colors.black,
    fontFamily: "fontSemiBold",
  },

  icon: {
    marginRight: globalStyles.margin.xxs + 1,
  },
  placeholderStyle: {
    fontSize: fonts.text.smallText,
    color: colors.faintGray,
    fontFamily: "fontSemiBold",
  },
  selectedTextStyle: {
    fontSize: fonts.text.smallText,
    color: colors.primaryLight,
    fontFamily: "fontSemiBold",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: fonts.text.smallText,
    color: colors.primaryLight,
    fontFamily: "fontSemiBold",
  },
  flatListContainer: {
    shadowColor: "transparent",
    shadowOpacity: 0,
    elevation: 0,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "#10285526",
    borderWidth: 1,
    // paddingBottom: globalStyles.padding.xs + 4,
  },
  circle: {
    width: 13,
    height: 13,
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: "#00000057",
    marginLeft: "auto",
  },
});
