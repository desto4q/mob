import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";

import icons from "../../utils/constants/icons";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
import { useGetUserQuery, useUpdatePersonalDataOrgMutation } from "../../state/features/services/users/user";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import UploadIndDoc from "./UploadIndDoc";

const OrganizationPersonalDataForm = () => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const {
    firstName: fn,
    lastName: ln,
    email: em,
    phoneNumber: pn,
    dateOfBirth: dob,
    accountType,
    photo,
    natureOfOrganization,
    companyName,
    username:un,
  } = (data?.data as any) || {};

  // console.log(natureOfOrganization);

  const [firstName, setFirstName] = useState(fn ?? "");
  const [lastName, setLastName] = useState(ln ?? "");
  const [email, setEmail] = useState(em ?? "");
  const [phoneNumber, setPhoneNumber] = useState(pn ?? "");
  const [username, setUsername] = useState(un ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(dob ?? "");

  const [date, setDate] = useState(new Date(dob));
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false); // Hide the picker
    if (selectedDate) {
      setDate(selectedDate); // Set the selected date
    }
  };

  const [updatePersonalData, { isLoading, isError, isSuccess, data: resp }] =
  useUpdatePersonalDataOrgMutation();

  const handleUpdatePersonalData = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !dateOfBirth) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      const result = await updatePersonalData({
        photo,
        firstName,
        lastName,
        email,
        username,
        phoneNumber,
        dateOfBirth,
        natureOfOrganization,
        companyName,
        companyAddress: {
        country: "Nigeria",
        state: "Lagos",
        street: "123 Main Street" 
    },
      });

      // console.log("result", result);

      if (result?.error) {
        console.log("result error", result?.error)
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message
        });
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message
      });

      refetch();
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <View style={tw`pt-5 pb-20`}>
      <View style={tw`gap-2`}>
        <View style={tw`flex-row justify-between gap-4`}>
          <InputTextWithLabel
            label="First Name"
            bodyStyle={tw`flex-1`}
            placeholder={firstName}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <InputTextWithLabel
            label="Last Name"
            bodyStyle={tw`flex-1`}
            placeholder={lastName}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <InputTextWithLabel
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <InputTextWithLabel
          label="Email Address"
          placeholder={email}
          value={email}
          onChangeText={(text) => setEmail(text)}
          editable={false}
        />
        <InputTextWithLabel
          label="Phone Number"
          keyboardType="number-pad"
          placeholder={phoneNumber}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
     { accountType === "Individual" &&  <View>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
              maximumDate={new Date(2023, 10, 20)}
            />
          )}
          <InputTextWithLabel
            label="Date of Birth"
            onPress={togglePicker}
            icon={icons.event}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={moment(date).format("YYYY-MM-DD")}
            editable={false}
          />
        </View>}
      </View>

      {/* { accountType === "Individual" && <UploadIndDoc/>
      } */}

      <View style={tw`pt-10`}>
        <PrimaryButton loading={isLoading} onPress={handleUpdatePersonalData}>
          Update Info
        </PrimaryButton>
      </View>
    </View>
  );
};

export default OrganizationPersonalDataForm;

const styles = StyleSheet.create({});
