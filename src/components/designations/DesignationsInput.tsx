import Modal from "react-native-modal";
import { newApi } from "../../state/newStates/flow";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, TouchableOpacity, View, ViewBase } from "react-native";
import tw from "../../lib/tailwind";
import Toast from "react-native-toast-message";
import BaseText from "../BaseText";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../../utils/constants";
import { useEffect, useState } from "react";

interface API_RESPONSE {
  code: number;
  message: string;
  data: DESIGNATION[];
}
interface DESIGNATION {
  createdAt: string;
  description: string;
  name: string;
  organizationId: string;
  updatedAt: string;
  id: string;
  [key: string]: any;
}
export default function MemberDesignations({ role, onChange }: any) {
  const [value, setValue] = useState<DESIGNATION>(null);
  const [showModal, setModal] = useState<boolean>(false);
  const [designation, setDesignation] = useState<string>("");
  useEffect(() => {
    if (value) {
      onChange(value.name);
    }
  }, [value]);
  const designations = useQuery<API_RESPONSE>({
    queryKey: ["invite designations"],
    queryFn: async () => {
      let resp = await newApi.get(
        "/api/memberships-subscriptions/designations",
      );
      return resp.data;
    },
  });

  // Handle errors from the query
  useEffect(() => {
    if (designations.isError) {
      Toast.show({
        type: "error",
        text1: "Failed to load roles",
        text2:
          (designations.error as any)?.message ||
          "An unexpected error occurred. Please try again.",
      });
      // Keep console log for debugging purposes
      console.log("designations_error:", JSON.stringify(designations.error));
    }
  }, [designations.isError, designations.error]);

  const designations_data = designations.data?.data.map((e) => {
    return {
      label: e.name,
      value: e.name,
      ...e,
    };
  });
  return (
    <View style={tw`flex-row flex items-center`}>
      <Dropdown
        style={tw`flex-1 p-3   rounded-lg bg-light dark:bg-gray_dark mb-2 `}
        placeholder="Select Role"
        activeColor={colors.primary}
        containerStyle={tw`bg-red-200 dark:bg-gray_dark bg-light shadow-xl`}
        itemContainerStyle={tw``}
        labelField={"label"}
        valueField={"value"}
        search
        dropdownPosition="top"
        searchPlaceholder="Search Roles"
        itemTextStyle={tw`text-sm text-black`}
        data={designations_data || []}
        value={value?.value || ""}
        onChange={(item) => {
          setValue(item);
        }}
      />
    </View>
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
