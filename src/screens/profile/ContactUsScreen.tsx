import { Alert, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import tw from "twrnc";
import BackIcon from "../../components/BackIcon";
import {
  useCreateIndSubAccountMutation,
  useGetUserQuery,
  useListBankQuery,
  useSubmitContactUsMutation,
} from "../../state/features/services/users/user";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import Toast from "react-native-toast-message";
import PageLoader from "../../components/Loader";
import { Controller, useForm } from "react-hook-form";
import Textarea from "../../components/inputs/Textarea";

const ContactUsScreen = ({ navigation }: any) => {
  const {
    data: userData,
    isLoading: isGettingUser,
    refetch,
  } = useGetUserQuery();
  const [submitContact, { isLoading: isCreating }] =
    useSubmitContactUsMutation();

  const { firstName, lastName, email } = (userData?.data as any) || {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  if (isGettingUser) return <PageLoader />;

  const handleProceed = async (data: any) => {
    console.log(data);
    try {
      const result = await submitContact({
        ...data,
        name: `${firstName} ${lastName}`,
        email,
      });

      if (result?.error) {
        console.log("result error", result?.error);
        Alert.alert("Error", result?.error?.data?.message);
        return;
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
      });
      reset();
      await refetch();
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <PageContainer>
        <ScrollView style={tw`flex-1`}>
          <View style={tw` flex-row justify-between`}>
            <BackIcon onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Contact Us
            </Header>
            <View />
          </View>
          <View style={tw`flex-1 mt-7 gap-2`}>
            <Controller
              control={control}
              name="subject"
              rules={{
                required: "Subject is required",
              }}
              render={({ field: { onChange, value } }) => (
                <InputTextWithLabel
                  value={value}
                  onChangeText={onChange}
                  label="Subject"
                  placeholder="Enter subject"
                  errorMessage={errors.subject?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="message"
              rules={{
                required: "message is required",
              }}
              render={({ field: { onChange, value } }) => (
                <Textarea
                  value={value}
                  onChangeText={onChange}
                  label="message"
                  placeholder="Enter message"
                  errorMessage={errors.message?.message}
                />
              )}
            />
            <PrimaryButton
              style={tw`mt-10`}
              loading={isCreating}
              onPress={handleSubmit(handleProceed)}
            >
              Submit
            </PrimaryButton>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default ContactUsScreen;
