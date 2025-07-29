import { View } from "react-native";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputText from "../inputs/InputText";
import Textarea from "../inputs/Textarea";
import Checkbox from "../inputs/Checkbox";
import { colors } from "../../utils/constants/colors";
import TextPrimary from "../texts/text";
import { CustomSelectList } from "../inputs/Dropdown";
import icons from "../../utils/constants/icons";
import PrimaryButton from "../buttons/PrimaryButtom";

const Tab1 = ({handleNext}) => {
  const { control } = useFormContext(); // Use context to access form methods

  return (
    <View style={{ marginTop: 40, gap: 10 }}>
      <Controller
        control={control}
        name="username"
        rules={{ required: "Username is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={icons.company}
            placeholder="Username"
            value={value}
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
      <Controller
        control={control}
        name="phone"
        rules={{ required: "Phone number is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={icons.phone}
            placeholder="Phone number"
            value={value}
            type="number-pad"
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="country"
        rules={{ required: "Country is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            icon={icons.phone}
            placeholder="Country"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="state"
        rules={{ required: "State is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputText
            placeholder="State"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Textarea
            icon={icons.location}
            placeholder="Address"
            value={value}
            onChangeText={onChange}
            errorMessage={error?.message}
          />
        )}
      />
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
      <Controller
        control={control}
        name="accessType"
        rules={{ required: "Access type is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <CustomSelectList
            list={[
              { name: "Free Pass / Open", title: "Free Pass / Open", id: "1" },
              {
                name: "Restricted / Closed",
                title: "Restricted / Closed",
                id: "2",
              },
            ]}
            title="Choose Access Type"
            func={(selected) => onChange(selected.title)}
            errorMessage={error?.message}
          />
        )}
      />

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
      <View style={{ marginTop: 30 }}>
        <PrimaryButton onPress={handleNext}>Next</PrimaryButton>
      </View>
    </View>
  );
};

export default Tab1;
