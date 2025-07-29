import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants/colors";
import AddCardForm from "../../components/forms/AddCardForm";
import BackButton from "../../components/BackButton";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import icons from "../../utils/constants/icons";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/shared/DateInput";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import moment from "moment";
import {
  useCreateIndividualIdCardMutation,
  useGetIndividualCardsQuery,
  useGetIndividualOrganizationDefaultCardQuery,
  useGetPersonalCardDetailsQuery,
  useUpdateIndividualIdCardMutation,
} from "../../state/features/services/card/card";
import PageLoader from "../../components/Loader";
import { useGetUserQuery } from "../../state/features/services/users/user";
import ScanBox from "../../components/ScanBox";
import ChooseDate from "../../components/event/ChooseDate";
import { uploadImage } from "../../utils/helpers";
import { AntDesign } from "@expo/vector-icons";
import CenterModal from "../../components/modals/CenterModal";

const AddCard = ({ navigation, route }: any) => {
  const cardId = route?.params?.cardId;
  const {
    data: cardDetails,
    isLoading: isGettingCard,
    refetch,
    isFetching,
  } = useGetPersonalCardDetailsQuery(cardId);
  const cardData = cardDetails?.data;

  const imageData = cardData?.scanIDCard;
  cardData?.scanIDCard;

  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const handleConfirm = (selectedDate, onChange) => {
  //   const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
  //   setDate(selectedDate);
  //   onChange(formattedDate); // Update the value in the Controller
  //   setDatePickerVisibility(false); // Close the picker
  // };
  // const handleCancel = () => {
  //   setDatePickerVisibility(false); // Close picker if canceled
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState(imageData?.frontIdCard ?? null);
  const [imageUrlBack, setImageUrlBack] = useState(
    imageData?.backIdCard ?? null,
  );

  const handleImageUpload = async (useCamera = false, type) => {
    setIsLoading(true);
    setIsError(false);

    const {
      isLoading: uploading,
      isSuccess,
      isError,
      imageUrl,
    } = await uploadImage(useCamera);
    setIsLoading(false); // Stop loader regardless of the result
    setIsError(isError);

    setShowContent(false); // Close the modal after a successful upload
    if (isSuccess) {
      if (type === "frontView") {
        return setImageUrl(imageUrl);
      }
      if (type === "backView") {
        return setImageUrlBack(imageUrl);
      }
    } else if (isError) {
      console.log("Error uploading image.");
    }
  };

  const handleDeleteImage = (type: string) => {
    if (type === "frontView") {
      setImageUrl(null);
    } else if (type === "backView") {
      setImageUrlBack(null);
    }
  };

  // console.log("cardData", cardData);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      designation: cardData?.designation ?? "",
      expiryDate: cardData?.expiryDate
        ? moment(cardData?.expiryDate).format("YYYY-MM-DD")
        : "",
      issuedDate: cardData?.issuedDate
        ? moment(cardData?.issuedDate).format("YYYY-MM-DD")
        : "",
      cardNumber: cardData?.cardNumber ?? "",
      issuingOrganization: cardData?.issuingOrganization ?? "",
    },
  });

  const [createIndividualIdCard, { isLoading: isCreating }] =
    useCreateIndividualIdCardMutation();
  const [updateCard, { isLoading: isUpdating }] =
    useUpdateIndividualIdCardMutation();

  const onSubmit = async (data: any) => {
    try {
      let result;
      if (cardData) {
        // Call updateIdCard if selectedCard exists
        result = await updateCard({
          ...data,
          id: cardId,
          scanIDCard: {
            frontIdCard: imageUrl,
            backIdCard: imageUrlBack,
          },
        });
      } else {
        // Call createIdCard if selectedCard does not exist
        result = await createIndividualIdCard({
          ...data,
          scanIDCard: {
            frontIdCard: imageUrl,
            backIdCard: imageUrlBack,
          },
        });
      }

      // const result: any = await createIndividualIdCard({
      //   ...data,
      //   scanIDCard: {
      //     frontIdCard: imageUrl,
      //     backIdCard: imageUrlBack,
      //   },
      // });

      if (result?.error) {
        console.log("result error", result?.error);
        console.log("results", result);
        return Alert.alert("error", result?.error?.data?.message);
        return;
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
      });
      navigation.navigate("ViewPersonalCards");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
      console.log(error);
    }
  };

  console.log("cardDetails", cardDetails);

  if (isGettingCard) return <PageLoader />;

  return (
    <PageContainer>
      <ScrollView style={tw``}>
        <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Add Card
            </Header>
            <View />
          </View>
          <TextPrimary
            color={colors.gray_light}
            size={13}
            style={{ marginTop: 30 }}
          >
            Fill in the details below to create your ID Card
          </TextPrimary>
          <View style={tw`pt-5 pb-20`}>
            <View style={tw`gap-2`}>
              <Controller
                control={control}
                name="designation"
                // rules={{ required: "Designation is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputTextWithLabel
                    label="Designation"
                    placeholder="Enter designation"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.designation?.message}
                    style={tw`mb-0`}
                  />
                )}
              />
              <Controller
                control={control}
                name="cardNumber"
                // rules={{ required: "Designation is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputTextWithLabel
                    label="Card Number"
                    placeholder="Enter card number"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.cardNumber?.message}
                    style={tw`mb-0`}
                  />
                )}
              />
              <Controller
                control={control}
                name="issuingOrganization"
                // rules={{ required: "Designation is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputTextWithLabel
                    label="Issuing Organization"
                    placeholder="Enter issuing Organization"
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.issuingOrganization?.message}
                    style={tw`mb-0`}
                  />
                )}
              />
              <Controller
                control={control}
                name="expiryDate"
                // rules={{ required: "Expiry Date is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <ChooseDate
                      minimumDate={new Date()}
                      label="Expiry Date"
                      placeholder="Choose expiry date"
                      value={value}
                      errorMessage={errors?.expiryDate?.message}
                      onChange={onChange}
                    />
                  </>
                )}
              />

              <Controller
                control={control}
                name="issuedDate"
                rules={{ required: "issue Date is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <ChooseDate
                      maximumDate={new Date()}
                      label="Issued Date"
                      placeholder="Select issued date"
                      value={value}
                      errorMessage={errors?.issuedDate?.message}
                      onChange={onChange}
                    />
                  </>
                )}
              />
            </View>

            <View style={tw``}>
              <TextPrimary size={13} style={tw`py-3`}>
                Scan ID Card
              </TextPrimary>
              <View
                style={tw`flex-row justify-between p-5 border border-[#122F62] rounded-[10px] items-end gap-1 `}
              >
                <View style={tw` flex-1`}>
                  {imageUrl ? (
                    <View style={tw`relative`}>
                      <Pressable
                        onPress={() => handleDeleteImage("frontView")}
                        style={tw`absolute top-0 right-0 z-10 bg-red-500 rounded-full w-6 h-6 items-center justify-center`}
                      >
                        <AntDesign name="close" size={14} color="white" />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setShowContent(true);
                          setType("frontView");
                        }}
                      >
                        <TextPrimary>Change Image</TextPrimary>
                      </Pressable>
                      <Image
                        resizeMode="cover"
                        source={{ uri: imageUrl }}
                        style={tw`w-full h-[105px] mt-5 rounded-xl`}
                      />
                    </View>
                  ) : (
                    <ScanBox
                      onPress={() => {
                        setShowContent(true);
                        setType("frontView");
                      }}
                      label="scan FRONT of ID Card"
                      style={tw`w-full h-[105px]`}
                    />
                  )}
                </View>
                <View style={tw` flex-1`}>
                  {imageUrlBack ? (
                    <View style={tw`relative`}>
                      <Pressable
                        onPress={() => handleDeleteImage("backView")}
                        style={tw`absolute top-0 right-0 z-10 bg-red-500 rounded-full w-6 h-6 items-center justify-center`}
                      >
                        <AntDesign name="close" size={14} color="white" />
                      </Pressable>
                      <Pressable
                        onPress={() => {
                          setShowContent(true);
                          setType("backView");
                        }}
                      >
                        <TextPrimary>Change Image</TextPrimary>
                      </Pressable>
                      <Image
                        resizeMode="cover"
                        source={{ uri: imageUrlBack }}
                        style={tw`w-full h-[105px] mt-5 rounded-xl`}
                      />
                    </View>
                  ) : (
                    <ScanBox
                      onPress={() => {
                        setShowContent(true);
                        setType("backView");
                      }}
                      label="scan BACK of ID Card"
                      style={tw`w-full h-[105px]`}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={tw`pt-10`}>
              {cardData ? (
                <PrimaryButton
                  loading={isUpdating}
                  onPress={handleSubmit(onSubmit)}
                >
                  Update Card
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  loading={isCreating}
                  onPress={handleSubmit(onSubmit)}
                >
                  Add Card
                </PrimaryButton>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
        <CenterModal
          style={tw`p-4 justify-center`}
          open={showContent}
          handleClose={() => setShowContent(false)}
        >
          <View style={tw`flex-row justify-center items-center gap-8`}>
            <Pressable
              onPress={() => handleImageUpload(true, type)}
              style={tw`items-center`}
            >
              <AntDesign
                name="camerao"
                size={26}
                style={tw`dark:text-gray_light text-black`}
              />
              <TextPrimary size={11}>Camera</TextPrimary>
            </Pressable>
            <Pressable
              onPress={() => handleImageUpload(false, type)}
              style={tw`items-center`}
            >
              <MaterialIcons
                name="perm-media"
                size={24}
                style={tw`dark:text-gray_light text-black`}
              />
              <TextPrimary size={11}>Media</TextPrimary>
            </Pressable>
          </View>
          {isLoading && (
            <View
              style={tw`absolute inset-0 justify-center items-center bg-black bg-opacity-50`}
            >
              <ActivityIndicator size="large" color="#F74D1B" />
            </View>
          )}
        </CenterModal>
        {isError && (
          <TextPrimary style={tw`text-red-500 text-center mt-2`}>
            Error uploading image. Please try again.
          </TextPrimary>
        )}
      </ScrollView>
      {/* <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        /> */}
    </PageContainer>
  );
};
export default AddCard;
