import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useRef } from "react";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";

const Otp = ({ navigation, route }: any) => {
  const { width, height } = Dimensions.get("window");
  const email = route?.params?.email;
  const state = route?.params?.state;

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(otp);
    try {
      const response = await axios.post(`${BaseUrl}/users/auth/verify/email`, {
        email,
        otpCode: otp.join(""),
      });
      Toast.show({
        type: "success",
        text1: "Your Account has been verified",
      });
      navigation.navigate("SignIn");

      setIsLoading(false);
    } catch (error: any) {
      console.log(error.response.data.message);
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async (data) => {
    console.warn(data);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/users/auth/resend/verification/email`,
        { email }
      );
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

  const handleChange = (text, index) => {
    const newOtp = [...otp];

    // Handle pasting text or normal typing
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
        inputRefs.current[index + 1].focus(); // Auto-focus the next input
      }
    }

    setOtp(newOtp);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus(); // Focus previous input on backspace
    }
  };

  return (
    <PageContainer>
      <View style={{ marginTop: height * 0.06, paddingBottom: 5 }}>
        <MaterialIcons
          name="arrow-back-ios-new"
          size={24}
          color={colors.gray_light}
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView className="py-4">
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={100}
        >
          <View className="my-6 mb-10">
            <Header size={21}>We just sent you an Email</Header>

            <View className="mt-4">
              <TextPrimary
                color={colors.gray_light}
                font="medium"
                weight={500}
                size={12}
                lineHeight={19.93}
              >
                Enter the code we’ve sent to {email}
              </TextPrimary>
            </View>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={[styles.otpInput, tw`text-black dark:text-white`]}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)} // Store input refs
              />
            ))}
          </View>
          <Pressable onPress={handleResendEmail}>
            <TextPrimary font="" style={styles.inlineText}>
              Didn't receive any code?
            </TextPrimary>
          </Pressable>

          <View style={{ marginTop: 30 }}>
            <PrimaryButton loading={isLoading} onPress={handleSubmit}>
              Done
            </PrimaryButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  );
};

export default Otp;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    width: "100%",
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
