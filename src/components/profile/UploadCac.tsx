import {
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import ScanBox from "../ScanBox";
import CenterModal from "../modals/CenterModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { uploadImage } from "../../utils/helpers/uploadImage";
import PrimaryButton from "../buttons/PrimaryButtom";
import InputTextWithLabel from "../inputs/InputWithLabel";
import SelectDate from "../shared/SelectDate";
import moment from "moment";

const UploadCac = ({ setImage }) => {
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [registrationDate, setRegistrationDate] = useState(new Date());

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
      setImage(imageUrl);
      console.log("Image uploaded successfully:", imageUrl);
    } else if (isError) {
      console.log("Error uploading image.");
    }
  };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const handleOpen = () => {
    console.log("im pressed");
    setIsBottomSheetVisible(true);
  };
  const handleClose = () => setIsBottomSheetVisible(false);

  return (
    <View style={tw`flex-1 h-full`}>
      <InputTextWithLabel
        label="Document Name"
        placeholder="Enter document name"
      />
      <InputTextWithLabel
        label="Registration Number"
        placeholder="Enter Registration name"
      />
      <Pressable style={tw``} onPress={handleOpen}>
        <InputTextWithLabel
          onPress={handleOpen}
          label="Registration Date"
          value={moment(registrationDate).format("YYYY-MM-DD")}
          placeholder="Enter Registration date"
          editable={false}
        />
      </Pressable>
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
      <PrimaryButton style={tw`mt-10`} onPress={() => setShowContent(true)}>
        Upload Document
      </PrimaryButton>
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
      <SelectDate
        date={registrationDate}
        onChangeDate={(setDate: any) => setRegistrationDate(setDate)}
        isVisible={isBottomSheetVisible}
        onClose={handleClose}
        snapPoints={["60%", "80%"]}
      />
    </View>
  );
};

export default UploadCac;

const styles = StyleSheet.create({});
