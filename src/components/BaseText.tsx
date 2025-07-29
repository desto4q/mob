import { Text, TextProps, TextStyle } from "react-native";
import tw from "../lib/tailwind";
import { useColorScheme } from "nativewind";

interface BaseTextProps extends TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  textColor?: string;
  [key: string]: any;
}

function BaseText({ children, textColor, style, ...props }: BaseTextProps) {
  const { colorScheme } = useColorScheme();
  return (
    <Text
      style={[
        tw`${textColor ? `text-[${textColor}]` : colorScheme == "dark" ? "text-neutral-100" : "text-black"} text-xs bg-transparent text-base`,
        { fontFamily: "inter" },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export default BaseText;
