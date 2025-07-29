import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import { DateInput } from "../shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tw from "../../lib/tailwind";
import moment from "moment";

const ChooseTime = ({ label, placeholder, onChange, value, errorMessage }) => {
  const [time, setTime] = useState<Date | null>(null);
  //   const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (selectedDate, onChange) => {
    const formattedTime = moment(time).format("HH:mm");
    // value={time ? moment(time).format("HH:mm") : ""} // format time only
    setTime(selectedDate);
    onChange(formattedTime);
    setShowPicker(false);
  };
  return (
    <View style={tw`flex-1`}>
      <DateInput
        onPress={() => setShowPicker(true)}
        label={label}
        placeholder={placeholder}
        value={value}
        errorMessage={errorMessage}
      />
      <DateTimePickerModal
        isVisible={showPicker}
        mode="time"
        onConfirm={(date) => handleConfirm(date, onChange)} // Pass onChange here
        onCancel={() => setShowPicker(false)}
        date={time || new Date()}
      />
    </View>
  );
};

export default ChooseTime;

const styles = StyleSheet.create({});
