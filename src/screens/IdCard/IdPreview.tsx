import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import EventVerifiersItem from "../../components/verifcation/EventVerifiersItem";
import BackButton from "../../components/BackButton";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import CardItem from "../../components/CardItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useGetCardTemplatesQuery,
  useRevokeMemberCardMutation,
  useUpdateMemberCardDetailsMutation,
  useViewMemberCardDetailsQuery,
} from "../../state/features/services/card/card";
import PageLoader from "../../components/Loader";
import { Controller, useForm } from "react-hook-form";
import { DateInput } from "../../components/shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Toast from "react-native-toast-message";
import { RefreshControl } from "react-native-gesture-handler";

const IdPreview = ({ navigation, route }: any) => {
  const cardId = route?.params?.id;
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
    console.log("modal ran");
  };
  const closeModal = () => setModal(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [templateId, setTemplateId] = useState("");
  const { data: cardTemplate } = useGetCardTemplatesQuery();
  const cardName = cardTemplate?.data?.map((card) => ({
    name: card.name,
    title: card.name,
    id: card.id,
  }));

  const handleConfirm = (selectedDate, onChange) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(selectedDate);
    onChange(formattedDate); // Update the value in the Controller
    setDatePickerVisibility(false); // Close the picker
  };
  const handleCancel = () => {
    setDatePickerVisibility(false); // Close picker if canceled
  };
  const [cardCategory, setCardCategory] = useState("");
  const { data, isLoading, refetch, isFetching } =
    useViewMemberCardDetailsQuery(cardId);
  console.log("data");
  const [updateMemberCardDetails, { isLoading: isUpdating }] =
    useUpdateMemberCardDetailsMutation();
  const [revokeMemberCard, { isLoading: isRevoking, error }] =
    useRevokeMemberCardMutation();

  const memberDetails = data?.data;

  const defaultDateOfBirth = memberDetails?.expiryDate
    ? moment(memberDetails?.expiryDate).format("YYYY-MM-DD")
    : "";

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardId: "", // Initialize with stable default values
      designation: "",
      expiryDate: "",
      cardCategory: "",
    },
  });

  useEffect(() => {
    if (memberDetails) {
      setValue("cardId", cardId);
      setValue("designation", memberDetails?.designation || "");
      setValue("expiryDate", defaultDateOfBirth);
      setValue("cardCategory", memberDetails?.template?.name || "");
      setTemplateId(memberDetails?.template?.id);
    }
  }, [memberDetails, cardId, defaultDateOfBirth, setValue]);
  if (isLoading) return <PageLoader />;

  const onSubmit = async (data: any) => {
    console.log(data);
    console.log(cardCategory);
    try {
      const result: any = await updateMemberCardDetails({
        ...data,
        cardCategory: "",
        templateId,
      });
      console.log("result");
      if (result?.error) {
        console.log("result error", result?.error);
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
      });
      // console.log(result);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
      console.log(error);
    }
  };
  const handleRevokeCard = async () => {
    try {
      const response: any = await revokeMemberCard({
        cardId: cardId,
        status: memberDetails.status === "revoked" ? "active" : "revoked",
        revocationReason: "Violation of terms",
      });

      if (response?.error) {
        return Alert.alert("Error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      await refetch();
      closeModal();
    } catch (error: any) {
      // console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView
          style={tw` flex-1 pb-10`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              ID Preview
            </Header>

            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              style={tw`dark:text-white text-black`}
              onPress={openModal}
            />
          </View>

          <View style={tw`mt-8 gap-4 px-[5%]`}>
            <TextPrimary size={13} font="montserrat_medium">
              ID for:{" "}
              <TextPrimary
                size={13}
                style={tw`text-blue`}
                font="montserrat_medium"
              >
                {memberDetails?.individual.firstName}{" "}
                {memberDetails?.individual.lastName}
              </TextPrimary>
            </TextPrimary>
            <CardItem cardData={memberDetails} card={memberDetails?.template} />
          </View>
          <View style={tw` gap-5 mt-4 px-[5%] pb-5`}>
            <TextPrimary size={13} font="montserrat_medium" style={tw`mt-5`}>
              Update Card Details
            </TextPrimary>
            <View style={tw`gap-2 mt-2`}>
              <Controller
                control={control}
                name="designation"
                rules={{ required: "Role is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputTextWithLabel
                    value={value}
                    onChangeText={onChange}
                    label="Role"
                    placeholder=" "
                    errorMessage={errors?.designation?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="expiryDate"
                rules={{ required: "Expiry Date is required" }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <DateInput
                      placeholder="Enter Expiry Date"
                      label="Expiry Date"
                      onPress={() => setDatePickerVisibility(true)}
                      value={value}
                      errorMessage={errors?.expiryDate?.message}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(date) => handleConfirm(date, onChange)} // Pass onChange here
                      onCancel={handleCancel}
                      date={date || new Date()}
                      minimumDate={new Date(2025, 1, 1)}
                    />
                  </>
                )}
              />
              <Controller
                control={control}
                name="cardCategory"
                rules={{ required: "Select a category" }}
                render={({ field: { onChange, value } }) => (
                  <CustomSelectList
                    list={cardName}
                    title={getValues("cardCategory")}
                    func={onChange}
                    func2={setTemplateId}
                    label="Card Category"
                  />
                )}
              />
            </View>
            <View style={tw`pt-10`}>
              <PrimaryButton
                loading={isUpdating}
                onPress={handleSubmit(onSubmit)}
              >
                Update Card Details
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
      <BottomModals open={modal} handleClose={closeModal} snapPoints={["50"]}>
        <View style={tw`p-5 pt-0`}>
          <TextPrimary font="medium" size={15} style={tw`text-center mt-1`}>
            Revoke ID Card ?
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={{ uri: memberDetails?.individual.photo }}
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {memberDetails?.individual.firstName}{" "}
                  {memberDetails?.individual.lastName}
                </TextPrimary>

                <TextPrimary
                  font="semi_bold"
                  size={11}
                  style={tw`text-[#696767]`}
                  color="#696767"
                >
                  {memberDetails?.individual.email}
                </TextPrimary>
              </View>
            </View>

            <PrimaryButton
              onPress={handleRevokeCard}
              size={13}
              style={tw``}
              loading={isRevoking}
            >
              {memberDetails.status === "revoked"
                ? "Activate Card"
                : "Revoke ID Card"}
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default IdPreview;

const styles = StyleSheet.create({});
