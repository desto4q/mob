import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Header from "../texts/header";
import TextPrimary from "../texts/text";
import InputText from "../inputs/InputText";
import Checkbox from "../inputs/Checkbox";
import { colors } from "../../utils/constants/colors";
import icons from "../../utils/constants/icons";
import tw from "twrnc";
import PrimaryButton from "../buttons/PrimaryButtom";
import { BaseUrl } from "../../config/url";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { DateInput } from "../shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BaseText from "../BaseText";

const SignUpForm1 = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isChecked, setIsChecked] = useState(false);

  const [date, setDate] = useState<Date | null>(null); // Initialize date as null
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleConfirm = (selectedDate, onChange) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(selectedDate);
    onChange(formattedDate); // Update the value in the Controller
    setShowPicker(false); // Close the picker
  };
  console.log("date", date);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const onSubmit = async (data: any) => {
    if (!isChecked) {
      alert("You must agree to the terms and conditions");
      return;
    }
    const payload = {
      ...data,
      dateOfBirth: moment(date).format("YYYY-MM-DD"),
      acceptedTnC: isChecked,
    };
    navigation.navigate("UploadImageScreen", { payload });

    console.log({ ...data });
  };

  console.log(errors);

  return (
    <View style={tw`pb-8`}>
      <View style={tw`mt-6`}>
        <BaseText>Sign Up as Individual</BaseText>

        <View style={tw`mt-4`}>
          <BaseText
            style={tw``}
            color={colors.gray_light}
            font="medium"
            weight={500}
            size={12}
          >
            Not an individual? Sign up as{" "}
            <BaseText
              font="semi_bold"
              style={tw`underline`}
              textColor={colors.primary}
              onPress={() => navigation.navigate("SignUpOrganization")}
            >
              Organization
            </BaseText>
          </BaseText>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={tw`flex-row gap-2`}>
          <View style={tw`flex-1`}>
            <Controller
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  icon={icons.user_icon}
                  placeholder="First name"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors?.firstName?.message}
                />
              )}
              name="firstName"
            />
          </View>
          <View style={tw`flex-1`}>
            <Controller
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  icon={icons.user_icon}
                  placeholder="Last name"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors?.lastName?.message}
                />
              )}
              name="lastName"
            />
          </View>
        </View>

        <Controller
          control={control}
          rules={{ required: "Username is required" }}
          render={({ field: { onChange, value } }) => (
            <InputText
              icon={icons.user_icon}
              placeholder="Username"
              onChangeText={onChange}
              value={value}
              errorMessage={errors?.username?.message}
            />
          )}
          name="username"
        />

        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <InputText
              icon={icons.mail}
              placeholder="Email"
              onChangeText={onChange}
              value={value}
              errorMessage={errors?.email?.message}
              keyboardType="email-address"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          name="dateOfBirth"
          rules={{ required: "Date of birth is required" }}
          defaultValue={moment(date).format("YYYY-MM-DD")}
          render={({ field: { onChange, value } }) => (
            <>
              <DateInput
                placeholder="Select Date of birth"
                onPress={togglePicker}
                value={value}
                errorMessage={errors?.dateOfBirth?.message}
              />
              <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={(date) => handleConfirm(date, onChange)} // Pass onChange here
                onCancel={togglePicker}
                date={date || new Date()}
                maximumDate={new Date()}
              />
            </>
          )}
        />

        <Controller
          control={control}
          rules={{ required: "Phone number is required" }}
          render={({ field: { onChange, value } }) => (
            <InputText
              icon={icons.phone}
              placeholder="Phone number"
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              errorMessage={errors?.phoneNumber?.message}
            />
          )}
          name="phoneNumber"
        />

        <Controller
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <InputText
              icon={icons.padlock}
              placeholder="Password"
              type="password"
              onChangeText={onChange}
              value={value}
              errorMessage={errors?.password?.message}
            />
          )}
          name="password"
        />
      </View>

      <View style={tw`flex-row items-center gap-2 mt-4`}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <TextPrimary
          color={colors.gray_light}
          font="medium"
          weight={500}
          size={11}
        >
          I agree to the{" "}
          <TextPrimary font="" style={styles.inlineText2}>
            Terms & Conditions{" "}
          </TextPrimary>
          and{" "}
          <TextPrimary font="" style={styles.inlineText2}>
            Privacy Policy
          </TextPrimary>
        </TextPrimary>
      </View>

      <View style={tw`mt-7`}>
        <PrimaryButton onPress={handleSubmit(onSubmit)}>
          Sign Up as Individual
        </PrimaryButton>
      </View>

      <View style={tw`items-center mt-6`}>
        <BaseText>
          Already have an account?{" "}
          <BaseText
            textColor={colors.secondary}
            font="medium"
            onPress={() => navigation.navigate("SignIn")}
          >
            Login
          </BaseText>
        </BaseText>
      </View>
    </View>
  );
};

export default SignUpForm1;

const styles = StyleSheet.create({
  inlineText: {
    textDecorationLine: "underline",
    color: colors.pink,
  },
  inlineText2: {
    textDecorationLine: "underline",
    paddingBottom: 5,
    fontSize: 11,
  },
  inputContainer: {
    marginTop: 40,
    gap: 10,
  },
  errorText: {
    color: "red",
    fontSize: 10,
  },
});
