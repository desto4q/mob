import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { FC, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import images from "../utils/constants/images";
import icons from "../utils/constants/icons";
import {
  useGetUserQuery,
  useUploadProfilePictureMutation,
} from "../state/features/services/users/user";
import Toast from "react-native-toast-message";
import { uploadImageToCloudinary } from "../utils/helpers/helpers";
import tw from "../lib/tailwind";

interface ProfileImageProps {
  size?: number;
  image?: string;
  icon?: boolean;
  iconSize?: number;
  imageStyle?:any;
}

const ProfileImage: FC<ProfileImageProps> = ({
  size = 78,
  image = images.profileImg,
  icon = true,
  iconSize = 26,
  imageStyle,
}) => {
  const [profileImageUri, setProfileImageUri] = useState("");
  const { data } = useGetUserQuery();
  const {
    photo,
    dateOfBirth,
    firstName,
    lastName,
    email,
    phoneNumber,
    username,
    natureOfOrganization,
  } = data?.data || {};
  const [uploadProfilePicture, { isLoading, isError, isSuccess, data: resp }] =
    useUploadProfilePictureMutation();

  // Function to pick image from gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Permission to access the gallery is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const uri = result.assets[0].uri;
      const type = result.assets[0].mimeType;
      const name = result.assets[0].uri.split(".")[1];
      const source = { uri, type, name };
      // setProfileImageUri(source)
      const cloudUrl = handleUpload(source);
      setProfileImageUri(cloudUrl);

      console.log(result);
    }
  };

  const handleUpload = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mobil_holder");
    formData.append("cloud_name", "do2kojulq");

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/do2kojulq/upload`;
    try {
      console.log("Uploading to Cloudinary...");
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Cloudinary Response:", data); // Log the response

      if (data.secure_url) {
        console.log(data.secure_url);

        try {
          // await uploadProfilePicture({ photo: data.secure_url });
          const result = await uploadProfilePicture({
            photo: data.secure_url,
          });
          // console.log("response", resp);
          // console.log("Profile updated successfully:", result);

          // Toast.show({
          //   type: "success",
          //   text1: "Profile updated successfully",
          // });
          console.log(result)
        } catch (error) {
          Toast.show({
            type: "error",
            text1: error.response?.data?.message || "An error occurred",
          });
          console.log(error)
        }

        return data.secure_url;
      } else {
        console.error("Cloudinary upload failed:", data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  const updateProfileImage = async () => {
    if (profileImageUri) {
      try {
        const result = await uploadProfilePicture({
          photo: profileImageUri,
        }).unwrap();

        console.log("Profile updated successfully:", result);
        Toast.show({
          type: "success",
          text1: "Profile updated successfully",
        });
        setProfileImageUri(null); // Reset after success
      } catch (error: any) {
        console.error("Error updating profile:", error);
        Toast.show({
          type: "error",
          text1: error.response?.data?.message || "An error occurred",
        });
      }
    }
  };

  return (
    <View style={tw`relative`}>
      <Image
        source={photo ? { uri: photo } : images.profileImg}
        resizeMode="cover"
        style={[tw`w-[${size}px] h-[${size}px] rounded-full`, imageStyle]}
      />

      {icon && (
        <>
          {isLoading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <TouchableOpacity
              style={tw`w-[${iconSize}px] h-[${iconSize}px] items-center justify-center rounded-full border-2 absolute bg-white right-0 bottom-0`}
              onPress={pickImage} // Call the image picker when clicking the icon
            >
              {icon && (
                <Image
                  source={icons.camera}
                  resizeMode="contain"
                  style={tw`w-[13px] h-[10px]`}
                />
              )}
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({});
