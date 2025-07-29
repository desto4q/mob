import { Alert, ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import tw from "twrnc";
import BackIcon from "../../components/BackIcon";
import {
  useCreateOrgSubAccountMutation,
  useGetUserQuery,
  useListBankQuery,
} from "../../state/features/services/users/user";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import Toast from "react-native-toast-message";
import { DateInput } from "../../components/shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import { DropdownComponent } from "../../components/shared/Dropdown";
import { globalStyles } from "../../utils";
import PageLoader from "../../components/Loader";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const CreateOrgSubAccount = ({ navigation }: any) => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const { data: banks, isLoading: isGettingBanks } = useListBankQuery();
  const [createSubAccount, { isLoading: isCreating }] =
    useCreateOrgSubAccountMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      accountNumber: "",
      settlementBank: "",
    },
  });

  if (isGettingBanks || isGettingUser) return <PageLoader />;

  const bankData = banks?.data.map((bank) => ({
    label: bank?.name,
    value: bank?.code,
  }));

  const handleProceed = async (data: any) => {
    console.log(data);
    try {
      const result = await createSubAccount({
        ...data,
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
      await refetch();
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    }
  };
  const nav = useNavigation();
  return (
    <>
      <PageContainer>
        <ScrollView style={tw`flex-1`}>
          <View style={tw` flex-row justify-between`}>
            <BackIcon onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Create Sub Account
            </Header>
            <View />
          </View>
          <View style={tw`flex-1 mt-7 gap-2`}>
            <Controller
              control={control}
              name="settlementBank"
              rules={{ required: "Select a accessType" }}
              render={({ field: { onChange, value } }) => (
                <DropdownComponent
                  label="Settlement Bank"
                  style={{ marginTop: globalStyles.margin.md }}
                  value={value}
                  setValue={onChange}
                  data={bankData}
                  errorMessage={errors?.settlementBank?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="name"
              rules={{
                required: "Account name is required",
              }}
              render={({ field: { onChange, value } }) => (
                <InputTextWithLabel
                  value={value}
                  onChangeText={onChange}
                  label="Business Name"
                  placeholder="Business Account name"
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="accountNumber"
              rules={{
                required: "Account number is required",
                minLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Account number must be 10 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Account number must contain only digits",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputTextWithLabel
                  value={value}
                  onChangeText={onChange}
                  label="Account Number"
                  placeholder="Enter Account Number"
                  errorMessage={errors.accountNumber?.message}
                />
              )}
            />

            <PrimaryButton
              style={tw`mt-10`}
              loading={isCreating}
              onPress={handleSubmit(handleProceed)}
            >
              Create Account
            </PrimaryButton>
            <PrimaryButton
              style={tw`mt-4 bg-neutral-800`}
              loading={isCreating}
              onPress={(e) => {
                nav.navigate("SavedAccounts");
              }}
            >
              View Saved Accounts
            </PrimaryButton>
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default CreateOrgSubAccount;
