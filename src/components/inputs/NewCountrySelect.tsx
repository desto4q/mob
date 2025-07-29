// import { Image, StyleSheet, Text, View } from "react-native";
// import { useEffect, useState } from "react";
// import tw from "../../lib/tailwind";
// import { COUNTRY } from "../forms/SignUpForm2";
// import { SelectList } from "react-native-dropdown-select-list";
// import icons from "../../utils/constants/icons";
// import { colors } from "../../utils/constants";
interface COUNTRYSELECT {
  [key: string]: any;
  value?: any;
  onChangeText?: (value: any) => any;
}
// export default function NewCountrySelect(props: COUNTRYSELECT) {
//   const [selected, setSelected] = useState("");
//   let formated_data = Object.entries(props.items).map(
//     (key: COUNTRYSELECT, item) => {
//       return {
//         key: key[1].country,
//         value: key[1].country,
//       };
//     },
//   );
//   useEffect(() => {
//     if (props.onChangeText) {
//       props.onChangeText(selected);
//     }
//   }, [selected]);

//   const [data, setData] = useState<any>(formated_data);

//   return (
//     <View style={tw`z-10 w-full text-neutral-200`}>
//       {/* <Text>{JSON.stringify(formated_data)}</Text> */}
//       <SelectList
//         disabledTextStyles={tw`text-red-200`}
//         inputStyles={tw`bg-light dark:bg-gray_dark text-gray_light placeholder::text-red-200`}
//         boxStyles={tw`bg-light dark:bg-gray_dark p-2 py-4`}
//         dropdownStyles={tw`bg-light dark:bg-gray_dark text-gray_light`}
//         dropdownTextStyles={tw`text-gray_light `}
//         arrowicon={
//           <Image source={icons.dropdown} style={[styles.icon]}></Image>
//         }
//         searchicon={
//           <Image
//             source={icons.location}
//             resizeMode="contain"
//             style={[styles.icon, tw`mr-2`]}
//           />
//         }
//         placeholder="Select Country"
//         setSelected={(val: any) => setSelected(val)}
//         searchPlaceholder="Select Country"
//         data={data}
//         save="value"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 15,
//     height: 15,
//     tintColor: colors.gray_light,
//     objectFit: "contain",
//   },
// });
//
//

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
import { Dropdown } from "react-native-element-dropdown";
import React, { useEffect, useState } from "react";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";
import { Image, StyleSheet, Text, View } from "react-native";
import tw from "../../lib/tailwind";
import { colors } from "../../utils/constants";
import icons from "../../utils/constants/icons";
export default function NewCountrySelect(props: COUNTRYSELECT) {
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  let formated_data = Object.entries(props.items).map(
    (key: COUNTRYSELECT, item) => {
      return {
        label: key[1].country,
        value: key[1].country,
      };
    },
  );
  useEffect(() => {
    if (props.onChangeText) {
      props.onChangeText(value);
      // console.log(value);
    }
  }, [value]);

  const [data, setData] = useState<any>(formated_data);

  return (
    <>
      <Dropdown
        style={tw`p-3 rounded-md border border-neutral-500 bg-light dark:bg-gray_dark`}
        placeholderStyle={[
          styles.placeholderStyle,
          tw`dark:text-white text-black`,
        ]}
        activeColor={colors.primary}
        itemContainerStyle={tw`bg-white  dark:bg-gray_dark`}
        itemTextStyle={tw`dark:text-white text-black`}
        selectedTextStyle={tw`dark:text-white text-black`}
        containerStyle={tw`bg-white dark:bg-gray_dark rounded-b-xl overflow-hidden`}
        inputSearchStyle={tw`dark:text-white/80`}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        autoScroll={false}
        labelField="label"
        valueField="value"
        placeholder={"Select Country"}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Image
            source={icons.location}
            resizeMode="contain"
            style={[tw`mr-2 h-4 w-4`]}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
