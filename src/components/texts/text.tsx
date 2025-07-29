import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import React, { FC } from "react";
import { useColorScheme } from "nativewind";
import tw from "../../lib/tailwind";

interface ITextPrimary extends TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: TextStyle["fontWeight"]; // Ensures only valid fontWeight values are used
  color?: string;
  font?: string;
  lineHeight?: number;
}

const TextPrimary: FC<ITextPrimary> = ({
  children,
  style,
  size = 13,
  weight = "400",
  color = "#fff", // Default color is white
  font = "regular",
  lineHeight = 18.83,
  ...props
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: weight,
          fontFamily: font,
          lineHeight: lineHeight,
          color:color
        },
        tw`text-black dark:text-white`, 
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextPrimary;
