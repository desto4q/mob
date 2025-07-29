import { Dimensions, View, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Header from "../texts/header";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants/colors";
import tw from "twrnc";
import PrimaryButton from "../buttons/PrimaryButtom";
import Checkbox from "../inputs/Checkbox";
import axios from "axios";
import Toast from "react-native-toast-message";
import icons from "../../utils/constants/icons"; // Assuming you have the icons setup
import InputText from "../inputs/InputText"; // Assuming you have a custom input component
import { BaseUrl } from "../../config/url";

const SignUpForm3 = ({ navigation, formData }: any) => {
  const { width, height } = Dimensions.get("window");
  const [tab, setTab] = useState("first");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const methods = useForm({
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: any) => {
    console.log(formData)
    if (!isChecked) {
      alert("You must agree to the terms and conditions");
      return;
    }
  
    const payload = {
      ...data,
      ...formData,
      dateOfBirth: formData.dateOfBirth ==="Invalid date" ? "" : formData.dateOfBirth,
      acceptedTnC: isChecked,
    };
    console.log("dob",payload.dateOfBirth)
    navigation.navigate("UploadLogoScreen", { payload });
  };

  return (
    <FormProvider {...methods}>
      <View style={{ paddingBottom: 50 }}>
        <View style={tw`mt-2`}>
          <Header size={21}>Sign Up as Organization</Header>
          <View style={tw`mt-4`}>
            <TextPrimary
              color={colors.gray_light}
              font="medium"
              weight={500}
              size={12}
            >
              Not an organisation? Sign up as{" "}
              <TextPrimary
                font="semi_bold"
                style={{ textDecorationLine: "underline" }}
                onPress={() => navigation.navigate("SignUpIndividual")}
              >
                Individual
              </TextPrimary>
            </TextPrimary>
          </View>
          <View style={tw`flex-row gap-3 mt-5`}>
            <View style={tw`h-1 bg-[#242EF2] rounded-[20px] flex-1`} />
            <View style={tw`h-1 bg-[#242EF2] rounded-[20px] flex-1`} />
          </View>
        </View>

        <View style={{ marginTop: 40, gap: 10 }}>
          <View style={tw`flex-row gap-2`}>
            {/* Contact Name */}
            <View style={tw`flex-1`}>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: "first name is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputText
                    icon={icons.user_icon}
                    placeholder="First name"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>

            {/* Role */}
            <View style={tw`flex-1`}>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: "last name is required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <InputText
                    icon={icons.user_icon}
                    placeholder="Last name"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={error?.message}
                  />
                )}
              />
            </View>
          </View>
          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.phone}
                placeholder="Phone number"
                value={value}
                keyboardType="phone-pad"
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          />
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
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.mail}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.padlock}
                placeholder="Password"
                type="password"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          />
          {/* Organization Name */}
          {/* <Controller
            control={control}
            name="organizationName"
            rules={{ required: "Organization name is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.company}
                placeholder="Organization Name"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          /> */}

          {/* Terms and Conditions */}
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

          {/* Submit Button */}
          <View style={{ marginTop: 30 }}>
            <PrimaryButton
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isLoading} // Assuming you have a loading prop to show spinner
            >
              Complete Sign Up
            </PrimaryButton>
          </View>
        </View>
        <View style={tw`items-center mt-6`}>
          <TextPrimary>
            Already have an account?{" "}
            <TextPrimary
              color={colors.secondary}
              font="medium"
              onPress={() => navigation.navigate("SignIn")}
            >
              Login
            </TextPrimary>
          </TextPrimary>
        </View>
      </View>
    </FormProvider>
  );
};

export default SignUpForm3;

const styles = StyleSheet.create({
  inlineText2: {
    textDecorationLine: "underline",
    paddingBottom: 5,
    fontSize: 11,
  },
});
