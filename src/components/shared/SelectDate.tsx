import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReusableBottomSheet from "./ReusableBottomSheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

type AndroidMode = "date" | "time" | "datetime";

interface SelectDateProps {
  mode: AndroidMode;
  isVisible: boolean;
  date: any;
  onChangeDate: () => void;
  onClose: () => void;
  snapPoints?: Array<string | number>;
}

const SelectDate = ({
  isVisible,
  onClose,
  snapPoints,
  onChangeDate,
  date,
  mode = "date",
}: SelectDateProps) => {
  return (
    <ReusableBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={snapPoints}
    >
      <DateTimePicker
         value={date || new Date()}
        mode={mode}
        display="spinner"
        onChange={onChangeDate}
        // maximumDate={new Date(2023, 10, 20)}
      />
    </ReusableBottomSheet>
  );
};

export default SelectDate;

const styles = StyleSheet.create({});
