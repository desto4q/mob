import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";

import icons from "../../utils/constants/icons";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
import { useUpdatePasswordMutation } from "../../state/features/services/users/user";
import Toast from "react-native-toast-message";

const SecurityForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updatePassword, { isLoading, isSuccess, error, isError, data, success }] =
    useUpdatePasswordMutation();


  
    const handleSumit = async () => {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        Alert.alert("Error", "All fields are required.");
        return;
      }
    
      try {
        const result = await updatePassword({
          oldPassword,
          newPassword,
          confirmNewPassword
        }).unwrap();
        console.log("result", result.message)
        Toast.show({
          type: "success",
          text1: result.message,
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error?.data?.message || "An error occurred",
        });
      }
    };
    
  return (
    <View style={tw`pt-5 pb-20`}>
      <View style={tw`gap-2`}>
        <InputTextWithLabel
          label="Old Password"
          icon={icons.event}
          onChangeText={(text) => setOldPassword(text)}
          value={oldPassword}
        />
        <InputTextWithLabel
          label="New Password"
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
        />
        <InputTextWithLabel
          label="Confirm Password"
          onChangeText={(text) => setConfirmNewPassword(text)}
          value={confirmNewPassword}
        />
      </View>
      <View style={tw`pt-10`}>
        <PrimaryButton loading={isLoading} onPress={handleSumit}>Update Password </PrimaryButton>
      </View>
    </View>
  );
};

export default SecurityForm;

const styles = StyleSheet.create({});
