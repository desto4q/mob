import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";

const ChangePassword = ({ navigation, route }) => {
  const { width, height } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const formData = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    if (text.length > 1) {
      text.split("").forEach((char, i) => {
        if (index + i < otp.length) {
          newOtp[index + i] = char;
          if (inputRefs.current[index + i]) {
            inputRefs.current[index + i].focus();
          }
        }
      });
    } else {
      newOtp[index] = text;
      if (text && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    console.warn(data);
    setIsLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/users/auth/password/reset`, {
        ...data,
        ...formData,
        otpCode: otp.join(""),
      });
      navigation.navigate("SignIn");
      Toast.show({
        type: "success",
        text1: response.data.message,
      });
      setIsLoading(false);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
      console.error("Login failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <View style={tw`mt-[${height * 0.02}px] pb-5`}>
        <MaterialIcons
          name="arrow-back-ios-new"
          size={24}
          color={colors.gray_light}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView style={tw`py-4`}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={100}
        >
          <View style={tw`my-6 mb-10`}>
            <Header size={21}>Add New Password</Header>

            <View style={tw`mt-4`}>
              <TextPrimary
                color={colors.gray_light}
                font="medium"
                weight={500}
                size={12}
                lineHeight={19.93}
              >
                Enter the OTP sent to your email and set a new password.
              </TextPrimary>
            </View>
          </View>

          {/* OTP input */}
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={[styles.otpInput,tw`text-black dark:text-white`]}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>

          {/* New password input */}
          <View style={tw`mt-5`}>
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: "Enter new password",
              }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  icon={icons.mail}
                  placeholder="New Password"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.newPassword?.message}
                />
              )}
            />
          </View>

          {/* Confirm password input */}
          <View>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm new password",
              }}
              render={({ field: { onChange, value } }) => (
                <InputText
                  icon={icons.mail}
                  placeholder="Confirm Password"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.confirmPassword?.message}
                />
              )}
            />
          </View>

          <TextPrimary
            font=""
            style={styles.inlineText}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            Didn't receive any code?
          </TextPrimary>

          {/* Submit button */}
          <View style={tw`mt-7`}>
            <PrimaryButton onPress={handleSubmit(onSubmit)} loading={isLoading}>
              Confirm
            </PrimaryButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  inlineText: {
    textDecorationLine: "underline",
    color: colors.secondary,
    textAlign: "center",
    marginTop: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray_light,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
});
