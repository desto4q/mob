import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import TextPrimary from "../../components/texts/text";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import Textarea from "../../components/inputs/Textarea";
import {
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
} from "../../state/features/services/subscription/subscription";
import Toast from "react-native-toast-message";

const AddSubscriptionPlan = ({ navigation, route }: any) => {
  const item = route?.params?.item;

  const [cardCategory, setCardCategory] = useState("");
  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState(item?.price ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [validity, setValidity] = useState(item?.validity ?? "");

  console.log("item", item);

  const [createSubscription, { isLoading: isCreating }] =
    useCreateSubscriptionMutation();
  const [updateSubscription, { isLoading: isUpdating }] =
    useUpdateSubscriptionMutation();

  const handleSubmit = async () => {
    try {
      let response;
      if (item) {
        response = await updateSubscription({
          planId: item?.id,
          name,
          price,
          description,
          validity,
        });
      } else {
        response = await createSubscription({
          name,
          price,
          description,
          validity,
        });
      }

      if (response?.error) {
        Alert.alert("Error", response?.error?.data?.message);
        // console.log("response error", response?.error)
        return;
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
      // navigation.navigate("RequestSuccess")
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <PageContainer padding="0%">
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={10}
        >
          <ScrollView style={{ flexGrow: 1 }}>
            <View style={tw` flex-row justify-between px-[5%]`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                Add Subscription Plan
              </Header>
              <View />
              {/* <AntDesign
                  name="pluscircle"
                  size={24}
                  color={colors.primary}
                  onPress={() => navigation.navigate("")}
                /> */}
            </View>

            <View style={tw` gap-5 mt-4 px-[5%]`}>
              <TextPrimary
                size={13}
                font="medium"
                color={colors.gray_light}
                style={tw`mt-5 text-gray_light`}
              >
                Create a new subscription plan for your organization
              </TextPrimary>
              <View style={tw`gap-2 mt-4`}>
                <InputTextWithLabel
                  label="Plan Name"
                  placeholder="Enter subscription plan name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <Textarea
                  label="Plan Description"
                  placeholder="Tell us about this subscription plan "
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />

                <View style={tw`flex-row gap-4`}>
                  <InputTextWithLabel
                    placeholder="Enter number"
                    bodyStyle={tw`flex-1 `}
                    keyboardType="number-pad"
                    label="Validity (months)"
                    value={validity}
                    onChangeText={(text) => setValidity(text)}
                  />
                  {/* <CustomSelectList
                                    height={40}
                                    label="Selects Renewal Type"
                                        list={[
                                            { name: "Month(s)", title: "Month(s)", id: "1" },
                                            { name: "Year(s)", title: "Year(s)", id: "2" },
                                        ]}
                                        title="Select ID Category"
                                        func={(text) => setCardCategory(text)}
                                    /> */}
                </View>
                <InputTextWithLabel
                  label="Price (N)"
                  keyboardType="number-pad"
                  placeholder="Enter price"
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                />
              </View>
              <View style={tw`pt-10`}>
                <PrimaryButton
                  loading={isCreating || isUpdating}
                  onPress={handleSubmit}
                >
                  {item ? "Update " : "Add Subscription Plan"}
                </PrimaryButton>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </PageContainer>
    </>
  );
};

export default AddSubscriptionPlan;

const styles = StyleSheet.create({});
