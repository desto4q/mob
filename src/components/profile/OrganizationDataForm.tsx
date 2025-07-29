import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import ScanBox from "../ScanBox";
import tw from "twrnc";
import TextPrimary from "../texts/text";
import PrimaryButton from "../buttons/PrimaryButtom";
import {
  useGetUserQuery,
  useUpdatePersonalDataMutation,
  useUpdatePersonalDataOrgMutation,
} from "../../state/features/services/users/user";

import Toast from "react-native-toast-message";
import Textarea from "../inputs/Textarea";
import { CustomSelectList } from "../inputs/Dropdown";
import { DateInput } from "../shared/DateInput";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const OrganizationDataForm = ({navigation}:any) => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const {
    firstName,
    companyName: name,
    lastName: ln,
    email: em,
    companyEmail: ce,
    phoneNumber: pn,
    dateOfBirth: dob,
    aboutCompany: about,
    natureOfOrganization,
    photo,
    username,
  } = (data?.data as any) || {};

  console.log(data?.data);

  const address = data?.data.companyAddress;

  const [companyName, setcompanyName] = useState(name ?? "");
  const [lastName, setLastName] = useState(ln ?? "");
  const [email, setEmail] = useState(em ?? "");
  const [phoneNumber, setPhoneNumber] = useState(pn ?? "");
  const [companyEmail, setCompanyEmail] = useState(ce ?? "");
  const [accessType, setAccessType] = useState(natureOfOrganization ?? "");
  const [aboutCompany, setAboutCompany] = useState(about ?? "");
  const [companyCountry, setcompanyCountry] = useState(address.country ?? "");
  const [companyState, setcompanyState] = useState(address.state ?? "");
  const [companyStreet, setcompanyStreet] = useState(address.street ?? "");

  const [date, setDate] = useState(new Date(dob) ?? new Date());
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDate = (selectedDate: Date | undefined) => {
    setShowPicker(false); // Hide the picker
    if (selectedDate) {
      setDate(selectedDate); // Set the selected date
    }
  };

  const [updatePersonalData, { isLoading, isError, isSuccess, data: resp }] =
    useUpdatePersonalDataOrgMutation();

  const handleUpdatePersonalData = async () => {
    console.log(dob);
    if (!companyName || !email || !phoneNumber) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      const result = await updatePersonalData({
        photo,
        companyName,
        firstName,
        lastName,
        email,
        companyEmail,
        username,
        phoneNumber,
        dateOfBirth:moment(date).format('YYYY-MM-DD'),
        aboutCompany,
        natureOfOrganization: accessType,
        companyAddress: {
          country: companyCountry,
          state: companyState,
          street: companyStreet,
        },
      });

      if (result?.error) {
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
      });

      await refetch();
      navigation.goBack()
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={tw`pt-5 pb-20`}>
      <View style={tw`gap-2`}>
        <InputTextWithLabel
          label="Company Name"
          placeholder={companyName}
          value={companyName}
          onChangeText={(text) => setcompanyName(text)}
        />

        <InputTextWithLabel
          label="Email Address"
          placeholder={email}
          value={email}
          editable={false}
          onChangeText={(text) => setEmail(text)}
        />
        <InputTextWithLabel
          label="Company Email Address"
          placeholder={companyEmail}
          value={companyEmail}
          editable={false}
          onChangeText={(text) => setCompanyEmail(text)}
        />
        <TextPrimary>Company Address</TextPrimary>
        <InputTextWithLabel
          label="Country"
          placeholder={""}
          value={companyCountry}
          onChangeText={(text) => setcompanyCountry(text)}
        />
        <InputTextWithLabel
          label="State"
          placeholder={""}
          value={companyState}
          onChangeText={(text) => setcompanyState(text)}
        />
        <InputTextWithLabel
          label="Street"
          placeholder={""}
          value={companyStreet}
          onChangeText={(text) => setcompanyStreet(text)}
        />
        <InputTextWithLabel
          label="Company phone Number"
          keyboardType="number-pad"
          placeholder={phoneNumber}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <Textarea
          label="About Company"
          placeholder=" "
          value={aboutCompany}
          onChangeText={(text) => setAboutCompany(text)}
        />
        <DateInput
          label="Company Registered Date"
          placeholder="Date of Birth (YYYY-MM-DD)"
          onPress={togglePicker}
          value={moment(date).format("YYYY-MM-DD")}
          style={tw`mb-2`}
        />
        <DateTimePickerModal
          isVisible={showPicker}
          mode="date"
          onConfirm={(date) => onChangeDate(date)} // Pass onChange here
          onCancel={togglePicker}
          date={date || new Date()}
          maximumDate={new Date()}
        />
        <CustomSelectList
          list={[
            { name: "Open", title: "Open", id: "1" },
            { name: "Semi-Open", title: "Semi-Open", id: "2" },
            { name: "Closed", title: "Closed", id: "3" },
          ]}
          title={`Access Type: ${accessType}`}
          func={(text) => setAccessType(text)}
        />
        {/* <View>
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
        </View> */}
      </View>

      {/* <View
        style={tw` justify-between p-5 py-6 border border-[#F74D1B] rounded-[10px] mt-5 `}
      >
        <TextPrimary size={13} style={tw`pb-3`}>
          Verify Account
        </TextPrimary>
        <ScanBox label="Upload Government ID" />
        <TextPrimary size={11} style={tw`pt-3`}>
          Upload a verified government ID to verify your account
        </TextPrimary>
      </View> */}

      <View style={tw`pt-10`}>
        <PrimaryButton loading={isLoading} onPress={handleUpdatePersonalData}>
          Update Info
        </PrimaryButton>
      </View>
    </View>
  );
};

export default OrganizationDataForm;

const styles = StyleSheet.create({});
