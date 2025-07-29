import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import Toast from "react-native-toast-message";
import tw from "../../lib/tailwind";
import AntDesign from "@expo/vector-icons/AntDesign";
import CenterModal from "../../components/modals/CenterModal";
import ScanBox from "../../components/ScanBox";
import { uploadImage } from "../../utils/helpers";
import { useUploadProfilePictureMutation } from "../../state/features/services/users/user";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadLogoScreen = ({ navigation, route }: any) => {
  const { width, height } = Dimensions.get("window");

  const data = route?.params?.payload;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [
    uploadProfilePicture,
    { isLoading: isUploading, isSuccess, data: resp },
  ] = useUploadProfilePictureMutation();

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
      console.log("Image uploaded successfully:", imageUrl);
    } else if (isError) {
      console.log("Error uploading image.");
    }
  };

  console.log(data);

  const handleSubmit = async () => {
    if (!imageUrl) {
      alert("Profile image is required");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BaseUrl}/users/auth/register/organization`,
        { ...data, photo: imageUrl }
      );
      console.warn(response);
      navigation.navigate("Otp", { email: data.email });
      Toast.show({
        type: "success",
        text1: "Signup Successful!",
        text2: "Welcome to the platform.",
      });

      // Navigate to the Home screen
    } catch (error: any) {
      // Handle errors appropriately
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
      console.error("Signup failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PageContainer>
      <SafeAreaView style={tw`flex-1`}>
        <View style={{ marginTop: height * 0.02, paddingBottom: 5 }}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            color={colors.gray_light}
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={tw`my-6 mb-10 `}>
          <Header size={21}>Upload Organization Logo to proceed</Header>

          {/* <View style={tw`mt-4`}>
              <TextPrimary
                color={colors.gray_light}
                font="medium"
                weight={500}
                size={12}
                lineHeight={19.93}
              >
                Enter the code we’ve sent to {email}
              </TextPrimary>
            </View> */}

          <View
            style={tw`justify-between p-5 py-6 pb-14 border border-primary rounded-[10px] mt-20 h-[300px] overflow-hidden`}
          >
            <View style={tw`flex-row justify-between`}>
              <TextPrimary size={13} style={tw`pb-3 `}>
                Upload Logo
              </TextPrimary>
              {imageUrl && (
                <TouchableOpacity
                  onPress={() => setShowContent(true)}
                  style={tw`bg-gray py-[.5px] px-1 justify-center rounded-[10px]`}
                >
                  <TextPrimary>Change Image</TextPrimary>
                </TouchableOpacity>
              )}
            </View>
            {imageUrl ? (
              <Image
                resizeMode="cover"
                source={{ uri: imageUrl }}
                style={tw`h-full w-full mt-5 rounded-xl`}
              />
            ) : (
              <ScanBox
                onPress={() => setShowContent(true)}
                label="Upload Logo"
                style={tw`h-full p-0`}
              />
            )}
          </View>
        </View>

        <View style={{ marginTop: 30 }}>
          <PrimaryButton loading={isSubmitting} onPress={handleSubmit}>
            Proceed
          </PrimaryButton>
        </View>
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
      </SafeAreaView>
    </PageContainer>
  );
};

export default UploadLogoScreen;

const styles = StyleSheet.create({});
