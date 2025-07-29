// import { Alert, StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import InputTextWithLabel from "../inputs/InputWithLabel";
// import ScanBox from "../ScanBox";
// import tw from "twrnc";

// import icons from "../../utils/constants/icons";
// import TextPrimary from "../texts/text";
// import PrimaryButton from "../buttons/PrimaryButtom";
// import {
//   useGetUserQuery,
//   useUpdatePersonalDataMutation,
// } from "../../state/features/services/users/user";
// import Toast from "react-native-toast-message";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { DateInput } from "../shared/DateInput";

// const PersonalDataForm = ({ navigation }: any) => {
//   const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
//   const {
//     firstName: fn,
//     lastName: ln,
//     email: em,
//     phoneNumber: pn,
//     dateOfBirth: dob,
//     accountType,
//     photo,
//     username: un,
//   } = (data?.data as any) || {};

//   console.log(data);

//   // console.log(data?.data);

//   const [firstName, setFirstName] = useState(fn ?? "");
//   const [lastName, setLastName] = useState(ln ?? "");
//   const [email, setEmail] = useState(em ?? "");
//   const [phoneNumber, setPhoneNumber] = useState(pn ?? "");
//   const [username, setUsername] = useState(un ?? "");
//   const [dateOfBirth, setDateOfBirth] = useState(dob ?? "");

//   const [date, setDate] = useState(new Date(dob));
//   const [showPicker, setShowPicker] = useState(false);

//   const togglePicker = () => {
//     setShowPicker(!showPicker);
//   };

//   const onChangeDate = (selectedDate: Date | undefined) => {
//     setShowPicker(false); // Hide the picker
//     if (selectedDate) {
//       setDate(selectedDate); // Set the selected date
//     }
//   };

//   const [updatePersonalData, { isLoading, isError, isSuccess, data: resp }] =
//     useUpdatePersonalDataMutation();

//   const handleUpdatePersonalData = async () => {
//     if (!firstName || !lastName || !email || !phoneNumber) {
//       Alert.alert("Error", "All fields are required.");
//       return;
//     }
//     // const user_data = {
//     //   firstName,
//     //   lastName,
//     //   email,
//     //   phoneNumber,
//     //   dateOfBirth,
//     // };
//     // console.log(user_data);
//     try {
//       const result = await updatePersonalData({
//         photo,
//         firstName,
//         lastName,
//         email,
//         username,
//         phoneNumber,
//         dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
//       });

//       // console.log("result", result);

//       if (result?.error) {
//         console.log("result error", result?.error);
//         return Toast.show({
//           type: "error",
//           text1: result?.error?.data?.message,
//         });
//       }
//       Toast.show({
//         type: "success",
//         text1: result?.data?.message,
//       });

//       await refetch();
//       navigation.goBack();
//     } catch (error: any) {
//       Alert.alert(error.response?.data?.message || "An error occurred");
//     }
//   };

//   return (
//     <View style={tw`pt-5 pb-20`}>
//       <View style={tw`gap-2`}>
//         <View style={tw`flex-row justify-between gap-4`}>
//           <InputTextWithLabel
//             label="First Name"
//             bodyStyle={tw`flex-1`}
//             placeholder={firstName}
//             value={firstName}
//             onChangeText={(text) => setFirstName(text)}
//           />
//           <InputTextWithLabel
//             label="Last Name"
//             bodyStyle={tw`flex-1`}
//             placeholder={lastName}
//             value={lastName}
//             onChangeText={(text) => setLastName(text)}
//           />
//         </View>
//         <InputTextWithLabel
//           label="Username"
//           value={username}
//           onChangeText={(text) => setUsername(text)}
//         />
//         <InputTextWithLabel
//           label="Email Address"
//           placeholder={email}
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           editable={false}
//         />
//         <InputTextWithLabel
//           label="Phone Number"
//           keyboardType="number-pad"
//           placeholder={phoneNumber}
//           value={phoneNumber}
//           onChangeText={(text) => setPhoneNumber(text)}
//         />
//         {accountType === "Individual" && (
//           <View>
//             <DateInput
//               placeholder="Date of Birth (YYYY-MM-DD)"
//               onPress={togglePicker}
//               value={moment(date).format("YYYY-MM-DD")}
//             />
//             <DateTimePickerModal
//               isVisible={showPicker}
//               mode="date"
//               onConfirm={(date) => onChangeDate(date)} // Pass onChange here
//               onCancel={togglePicker}
//               date={date || new Date()}
//               maximumDate={new Date(2020, 10, 20)}
//             />
//           </View>
//         )}
//       </View>

//       {/* { accountType === "Individual" && <UploadIndDoc/>
//       } */}

//       <View style={tw`pt-10`}>
//         <PrimaryButton loading={isLoading} onPress={handleUpdatePersonalData}>
//           Update Info
//         </PrimaryButton>
//       </View>
//     </View>
//   );
// };

// export default PersonalDataForm;

// const styles = StyleSheet.create({});

import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import PrimaryButton from "../buttons/PrimaryButtom";
import tw from "twrnc";

import {
  useGetUserQuery,
  useUpdatePersonalDataMutation,
} from "../../state/features/services/users/user";

import Toast from "react-native-toast-message";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateInput } from "../shared/DateInput";
import { OffLine } from "../Offline";

const PersonalDataForm = ({ navigation }: any) => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const {
    firstName: fn,
    lastName: ln,
    email: em,
    phoneNumber: pn,
    dateOfBirth: dob,
    accountType,
    photo,
    username: un,
  } = (data?.data as any) || {};

  const [firstName, setFirstName] = useState(fn ?? "");
  const [lastName, setLastName] = useState(ln ?? "");
  const [email, setEmail] = useState(em ?? "");
  const [phoneNumber, setPhoneNumber] = useState(pn ?? "");
  const [username, setUsername] = useState(un ?? "");

  const initialDate = dob ? moment(dob).toDate() : new Date();
  const [date, setDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker((prev) => !prev);

  const onChangeDate = (selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const [updatePersonalData, { isLoading }] = useUpdatePersonalDataMutation();

  const handleUpdatePersonalData = async () => {
    if (!firstName || !lastName || !email || !phoneNumber) {
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
        dateOfBirth: moment(date).format("YYYY-MM-DD"),
      });

      if (result?.error) {
        console.log("Update error:", result?.error);
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message || "Update failed",
        });
      }

      Toast.show({
        type: "success",
        text1: result?.data?.message || "Profile updated",
      });

      await refetch();
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "An error occurred",
      );
    }
  };

  return (
    <View style={tw`pt-5 pb-20 px-2`}>
      <View style={tw`gap-4`}>
        <View style={tw`flex-row justify-between gap-4`}>
          <InputTextWithLabel
            label="First Name"
            bodyStyle={tw`flex-1`}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <InputTextWithLabel
            label="Last Name"
            bodyStyle={tw`flex-1`}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <InputTextWithLabel
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <InputTextWithLabel
          label="Email Address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          editable={false}
        />

        <InputTextWithLabel
          label="Phone Number"
          keyboardType="number-pad"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {accountType === "Individual" && (
          <View>
            <DateInput
              placeholder="Date of Birth"
              value={moment(date).format("YYYY-MM-DD")}
              onPress={togglePicker}
            />
            <DateTimePickerModal
              isVisible={showPicker}
              mode="date"
              onConfirm={onChangeDate}
              onCancel={togglePicker}
              date={date}
              maximumDate={new Date()} // no future birthdates
            />
          </View>
        )}
      </View>
      <View style={tw`pt-10`}>
        <PrimaryButton loading={isLoading} onPress={handleUpdatePersonalData}>
          Update Info
        </PrimaryButton>
      </View>
    </View>
  );
};

export default PersonalDataForm;

const styles = StyleSheet.create({});
