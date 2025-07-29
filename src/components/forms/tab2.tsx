import { View } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputText from "../inputs/InputText";
import Checkbox from "../inputs/Checkbox";
import { colors } from "../../utils/constants/colors";
import TextPrimary from "../texts/text";
import icons from "../../utils/constants/icons";
import PrimaryButton from "../buttons/PrimaryButtom";

const Tab2 = ({onSubmit}) => {
  const { control } = useFormContext(); // Use context to access form methods

  return (
    <View style={{ marginTop: 40, gap: 10 }}>
      <Controller
        control={control}
        name="contactName"
        rules={{ required: "Full name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={icons.profile}
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="role"
        rules={{ required: "Role is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={icons.company}
            placeholder="Role in the organization"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
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
      />
      <Controller
        control={control}
        name="termsAccepted2"
        rules={{ required: "You must accept the terms" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View className="flex-row items-center gap-2 flex-1 w-full mt-4">
            <Checkbox checked={value} onChange={onChange} />
            <TextPrimary
              color={colors.gray_light}
              font="medium"
              weight={500}
              size={11}
            >
              I agree to the{" "}
              <TextPrimary font="" style={{ textDecorationLine: "underline" }}>
                Terms & Conditions{" "}
              </TextPrimary>
              and{" "}
              <TextPrimary font="" style={{ textDecorationLine: "underline" }}>
                Privacy Policy
              </TextPrimary>
            </TextPrimary>
          </View>
        )}
      />
      <View style={{ marginTop: 30 }}>
        <PrimaryButton onPress={onSubmit}>
          Complete Sign Up
        </PrimaryButton>
      </View>
    </View>
  );
};

export default Tab2;
