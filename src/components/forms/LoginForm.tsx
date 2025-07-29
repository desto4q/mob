import { Alert, Dimensions, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextPrimary from "../texts/text";
import InputText from "../inputs/InputText";
import { colors } from "../../utils/constants/colors";
import icons from "../../utils/constants/icons";
import PrimaryButton from "../buttons/PrimaryButtom";
import axios from "axios";
import Toast from "react-native-toast-message";
import { BaseUrl } from "../../config/url";
import { useAppDispatch } from "../../state/hooks";
import {
  setLoggedIn,
  setRole,
  setToken,
  setUser,
} from "../../state/features/slices/userSlice";
import { useTokenStore } from "../../state/newStates/auth";
import BaseText from "../BaseText";
import tw from "../../lib/tailwind";

const LoginForm = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  let setTokenStore = useTokenStore((state) => state.setValue);
  let setAccountStore = useTokenStore((state) => state.setAccount);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/users/auth/login`, data);
      const photo = response?.data?.data?.photo;
      // console.log(JSON.stringify(response.data));
      setAccountStore(response.data);
      dispatch(setRole(response.data.data.accountType));
      dispatch(setToken(response.data.token));
      setTokenStore(response.data.token);
      dispatch(setLoggedIn());
      navigation.navigate("Home");
      setIsLoading(false);
      Toast.show({
        type: "success",
        text1: response.data.message,
      });
    } catch (error: any) {
      console.log(error);

      if (error.response.status === 400) {
        Toast.show({
          type: "error",
          text1: error?.response.data.message, // First part of the message
        });
      }

      if (error.response.status === 403) {
        Toast.show({
          type: "error",
          text1: error?.response.data.message.slice(0, 28), // First part of the message
          text2:
            error?.response.data.message.length > 28
              ? error?.response.data.message.slice(28)
              : "", // Remaining part
        });
        navigation.navigate("Otp", { email: data.email });
      }
      console.error("Login failed: ", error.response.status);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
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

      <View>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <InputText
              icon={icons.padlock}
              placeholder="Password"
              type="password"
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.password?.message}
            />
          )}
        />
      </View>

      <BaseText
        onPress={() =>
          navigation.navigate("ResetPassword", { state: "changePassword" })
        }
        style={tw` ml-auto  `}
        // style={{ marginLeft: "auto", marginTop: 5 }}
      >
        Forgot your password?
      </BaseText>

      <View style={{ marginTop: 30 }}>
        <PrimaryButton onPress={handleSubmit(onSubmit)} loading={isLoading}>
          Login
        </PrimaryButton>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  inputContainer: {
    marginTop: 20,
    gap: 16,
  },
});
