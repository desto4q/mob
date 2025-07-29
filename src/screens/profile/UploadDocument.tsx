import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import tw from "twrnc";
import ProfileTop from "../../components/profile/ProfileTop";
import AccountInfoForm from "../../components/profile/AccountInfoForm";
import BackIcon from "../../components/BackIcon";
import {
  useGetOrgDocQuery,
  useGetUserQuery,
  useUploadOrganizationDocMutation,
} from "../../state/features/services/users/user";
import UploadIndDoc from "../../components/profile/UploadIndDoc";
import UploadCac from "../../components/profile/UploadCac";
import { uploadImage } from "../../utils/helpers";
import moment from "moment";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import TextPrimary from "../../components/texts/text";
import ScanBox from "../../components/ScanBox";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import CenterModal from "../../components/modals/CenterModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SelectDate from "../../components/shared/SelectDate";
import Toast from "react-native-toast-message";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateInput } from "../../components/shared/DateInput";

const UploadDocument = ({ navigation }: any) => {
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const { data: orgDoc } = useGetOrgDocQuery();
  const orgData = orgDoc?.data;

  const [uploadOrganizationDoc, { isLoading: isUploading }] =
    useUploadOrganizationDocMutation();
  const { accountType, isVerified } = (data?.data as any) || {};

  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState(orgData?.documentUrl ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState(orgData?.name ?? "");
  const [number, setNumber] = useState(orgData?.registrationNumber ?? "");
  const [registrationDate, setRegistrationDate] = useState<Date | null>(
    orgData?.registrationDate ?? null,
  );

  const handleImageUpload = async (useCamera = false) => {
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
      setImageUrl(imageUrl);
      //   setImage(imageUrl);
      // console.log("Image uploaded successfully:", imageUrl);
    } else if (isError) {
      // console.log("Error uploading image.");
    }
  };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const handleOpen = () => {
    setIsBottomSheetVisible(true);
  };
  const handleClose = () => setIsBottomSheetVisible(false);

  const onChangeDate = (selectedDate: Date | undefined) => {
    // setRegistrationDate(false); // Hide the picker
    if (selectedDate) {
      setRegistrationDate(selectedDate);
      handleClose(); // Set the selected date
    }
  };

  const handleUpdatePersonalData = async () => {
    if (!name || !number || !imageUrl || !registrationDate) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    try {
      const result = await uploadOrganizationDoc({
        name,
        documentUrl: imageUrl,
        registrationNumber: number,
        registrationDate,
      });

      // console.log("result", result);

      if (result?.error) {
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: "Success",
        text2: result?.data?.message,
      });

      await refetch();
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(error.response?.data?.message || "An error occurred");
    }
  };

  const documentList = [{ name: "CAC", title: "CAC", id: "4" }];

  return (
    <>
      <PageContainer>
        <ScrollView style={tw`flex-1`}>
          <View style={tw` flex-row justify-between`}>
            <BackIcon onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Verify Account
            </Header>
            <View />
          </View>
          <View style={tw`flex-1 mt-7 gap-3`}>
            <CustomSelectList
              list={documentList}
              title={name ? name : "select your Document Type"}
              func={(text) => setName(text)}
              label="Select Document Type"
              editable={isVerified}
            />
            <InputTextWithLabel
              value={number}
              onChangeText={(text) => setNumber(text)}
              label="Registration Number"
              placeholder="Enter Registration name"
              editable={!isVerified}
            />
            {/* <Pressable style={tw``} onPress={handleOpen}>
                <InputTextWithLabel
                  onPress={handleOpen}
                  label="Registration Date"
                  value={moment(registrationDate).format("YYYY-MM-DD")}
                  placeholder="Enter Registration date"
                  editable={false}
                />
              </Pressable> */}
            <DateInput
              placeholder="Enter Registration date"
              label="Registration Date"
              onPress={handleOpen}
              value={moment(registrationDate).format("YYYY-MM-DD")}
              style={tw`mt-1`}
              editable={isVerified}
            />
            <View
              style={tw`justify-between p-5 py-6 border border-[#F74D1B] rounded-[10px] mt-5`}
            >
              <TextPrimary size={13} style={tw`pb-3`}>
                Verify Account
              </TextPrimary>
              {imageUrl ? (
                <Image
                  resizeMode="cover"
                  source={{ uri: imageUrl }}
                  style={tw`h-[130px] w-full mt-5 rounded-xl`}
                />
              ) : (
                <ScanBox
                  onPress={() => setShowContent(true)}
                  label="Upload Government ID"
                />
              )}
              <TextPrimary size={11} style={tw`pt-3`}>
                Upload organization CAC
              </TextPrimary>
            </View>
            {!isVerified && (
              <PrimaryButton
                style={tw`mt-10`}
                loading={isUploading}
                onPress={handleUpdatePersonalData}
              >
                Upload Document
              </PrimaryButton>
            )}
            <CenterModal
              style={tw`p-4 justify-center`}
              open={showContent}
              handleClose={() => setShowContent(false)}
            >
              <View style={tw`flex-row justify-center items-center gap-8`}>
                <Pressable
                  onPress={() => handleImageUpload(true)}
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
                  onPress={() => handleImageUpload(false)}
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
          </View>
        </ScrollView>
      </PageContainer>
      <DateTimePickerModal
        isVisible={isBottomSheetVisible}
        mode="date"
        onConfirm={(date) => onChangeDate(date)} // Pass onChange here
        onCancel={handleClose}
        date={new Date()}
        maximumDate={new Date()}
      />
      {/* <SelectDate
        value={
          registrationDate ? moment(registrationDate).format("YYYY-MM-DD") : ""
        }
        onChangeDate={onChangeDate}
        isVisible={isBottomSheetVisible}
        onClose={handleClose}
        snapPoints={["40%", "60%"]}
      /> */}
    </>
  );
};
export default UploadDocument;
