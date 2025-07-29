import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React from "react";

interface ImageCompProps {
  image: ImageSourcePropType;
  size?: number;
  style?: any;
  resizeMode?: ImageResizeMode;
}

const ImageComp = ({ image, size = 15, style, resizeMode= "contain"}: ImageCompProps) => {
  return (
    <Image
      source={image}
      style={[{ width: size, height: size }, style]}
      resizeMode={resizeMode}
    />
  );
};

export default ImageComp;

