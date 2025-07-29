import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { useForm, Controller } from "react-hook-form";
  import PageContainer from "../../components/PageContainer";
  import MaterialIcons from "@expo/vector-icons/MaterialIcons";
  import { colors } from "../../utils/constants/colors";
  import Header from "../../components/texts/header";
  import TextPrimary from "../../components/texts/text";
  import InputText from "../../components/inputs/InputText";
  import icons from "../../utils/constants/icons";
  import tw from "twrnc";
  import PrimaryButton from "../../components/buttons/PrimaryButtom";
  import axios from "axios";
  import { BaseUrl } from "../../config/url";
  import Toast from "react-native-toast-message";
  
  const ResendEmail = ({ navigation }) => {
    const { width, height } = Dimensions.get("window");
    const [isLoading, setIsLoading] = useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      console.warn(data);
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BaseUrl}/users/auth/resend/verification/email`,
          data
        );
        navigation.navigate("Otp",{...data});
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
              <Header size={21}>Resend Code</Header>
  
              <View style={tw`mt-4`}>
                <TextPrimary
                  color={colors.gray_light}
                  font="medium"
                  weight={500}
                  size={12}
                  lineHeight={19.93}
                >
                  Enter your email address and we would send you a code to verify your account.
                </TextPrimary>
              </View>
            </View>
  
            {/* Email input with react-hook-form */}
            <View>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    icon={icons.mail}
                    placeholder="Email Address"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors?.email?.message}
                  />
                )}
              />
            </View>
  
            {/* Submit button */}
            <View style={tw`mt-7`}>
              <PrimaryButton onPress={handleSubmit(onSubmit)} loading={isLoading}>
                Send Code
              </PrimaryButton>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    );
  };
  
  export default ResendEmail;
  
  const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
      justifyContent: "center",
    },
  });
  