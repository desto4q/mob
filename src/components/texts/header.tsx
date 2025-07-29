import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
import React, { FC } from "react";
import tw from "twrnc";
import { useColorScheme } from "nativewind";

interface IHeader extends TextProps {
  children: React.ReactNode;
  size?: number;
  weight?: TextStyle["fontWeight"]; // Ensures valid fontWeight values
  color?: string;
  font?: string;
  props?: any;
}

const Header: FC<IHeader> = ({
  children,
  style,
  size = 18,
  weight = "600",
  color = "#fff",
  font = "semi_bold",
  ...props
}) => {
  const { colorScheme } = useColorScheme();
  return (
    <View style={tw`items-center  justify-center`}>
      <Text
        style={[
          {
            fontSize: size,
            fontWeight: weight,
            color: colorScheme === "dark" ? color : "#000",
            fontFamily: font,
          },
          style,
          tw`dark:text-white text-base `,
        ]}
        {...props}
      >
        {children}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {},
});
