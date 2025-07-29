import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import tw from "../../lib/tailwind";
import TextPrimary from "../texts/text";
import ScanBox from "../ScanBox";
import CenterModal from "../modals/CenterModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { uploadImage } from "../../utils/helpers/uploadImage";

export const UploadLogo = ({ setImage, selectedImage }:any) => {
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleImageUpload = async (useCamera = false) => {
    setIsLoading(true);
    setIsError(false);

    const {
      isLoading: uploading,
      isSuccess,
      isError,
      imageUrl,
    } = await uploadImage(useCamera);
    setIsLoading(uploading);
    setIsError(isError);

    if (isSuccess) {
      setImageUrl(imageUrl);
      setImage(imageUrl);
      setShowContent(false); // Close the modal after successful upload
      console.log("Image uploaded successfully:", imageUrl);
    } else if (isError) {
      console.log("Error uploading image.");
    }
  };

  return (
    <>
      <Pressable style={tw`justify-between mt-3 w-[160px]`}>
        <TextPrimary size={13} style={tw`pb-3`}>
          Logo
        </TextPrimary>
        {imageUrl || selectedImage ? (
          <Image
            resizeMode="cover"
            source={{ uri: imageUrl ? imageUrl: selectedImage }}
            style={tw`h-[130px] w-full mt-5 rounded-xl`}
          />
        ) : (
          <ScanBox
            onPress={() => setShowContent(true)}
            label="Upload Company Logo"
            style={tw`h-[130px]`}
          />
        )}
      </Pressable>
      <CenterModal
        style={tw`p-4 justify-center`}
        open={showContent}
        handleClose={() => setShowContent(!showContent)}
      >
        {isLoading ? (
          <View style={tw`flex-row justify-center items-center gap-8 flex-1`}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
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
        )}
      </CenterModal>
      {isLoading && <TextPrimary>Loading...</TextPrimary>}
      {isError && (
        <TextPrimary>Error uploading image. Please try again.</TextPrimary>
      )}
    </>
  );
};

const styles = StyleSheet.create({});
