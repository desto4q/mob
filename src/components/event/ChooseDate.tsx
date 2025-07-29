import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import { DateInput } from "../shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tw from "../../lib/tailwind";

const ChooseDate = ({ label, placeholder, onChange, value, errorMessage, minimumDate, maximumDate }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm =  (selectedDate, onChange) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(selectedDate);
    onChange(formattedDate);
    setShowPicker(false)
  };

//   const handleConfirm = (selectedDate, onChange) => {
//     const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
//     setDate(selectedDate);
//     onChange(formattedDate); // Update the value in the Controller
//     // Close the picker
//   };

  console.log(date);
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
        mode="date"
        onConfirm={(date) => handleConfirm(date, onChange)} // Pass onChange here
        onCancel={() => setShowPicker(false)}
        date={date || new Date()}
        minimumDate={ minimumDate && minimumDate}
        maximumDate={maximumDate && maximumDate}
      />
    </View>
  );
};

export default ChooseDate;

const styles = StyleSheet.create({});
