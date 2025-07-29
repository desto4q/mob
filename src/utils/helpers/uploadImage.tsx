import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const MAX_IMAGE_SIZE_MB = 5; // Maximum file size in MB

export const uploadImage = async (useCamera = false) => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission required",
      "Permission to access the camera is required.",
    );
    return {
      isLoading: false,
      isError: true,
      isSuccess: false,
      imageUrl: null,
    };
  }

  let result;
  if (useCamera) {
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  } else {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  }

  if (!result.canceled) {
    const imageAsset = result.assets[0];
    const { uri, fileSize, mimeType = "image/jpeg" } = imageAsset;
    const name = uri.split("/").pop();

    // Check file size
    if (fileSize && fileSize / (1024 * 1024) > MAX_IMAGE_SIZE_MB) {
      Alert.alert(
        "File too large",
        `The selected image exceeds the maximum file size of ${MAX_IMAGE_SIZE_MB} MB. Please choose a smaller image.`,
      );
      return {
        isLoading: false,
        isError: true,
        isSuccess: false,
        imageUrl: null,
      };
    }

    const source = { uri, type: mimeType, name };
    const cloudUrl = await handleUpload(source as unknown as File);

    return {
      isLoading: false,
      isSuccess: !!cloudUrl,
      isError: !cloudUrl,
      imageUrl: cloudUrl,
    };
  } else {
    return {
      isLoading: false,
      isError: true,
      isSuccess: false,
      imageUrl: null,
    };
  }
};

const handleUpload = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mobil_holder");
  formData.append("cloud_name", "do2kojulq");

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/do2kojulq/upload`;
  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.secure_url) {
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
