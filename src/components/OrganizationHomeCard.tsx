import { Image, Pressable } from "react-native";
import React, { FC } from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";

interface OrganizationHomeCardProps {
  item: {
    icon: string;
    title: string;
    text: string;
    route: string;
    color: string;
    navigation: any;
  };
}

const OrganizationHomeCard: FC<OrganizationHomeCardProps> = ({
  item,
  navigation,
}) => {
  const { icon, title, text, route, color } = item;

  return (
    <Pressable
      onPress={() => navigation.navigate(route)}
      style={[
        tw`rounded-xl px-4 py-3 shadow-sm border-l-4 flex-1 min-h-32 justify-between`,
        {
          backgroundColor: color + "08",
          borderLeftColor: color,
        },
      ]}
    >
      <TextPrimary font="medium" size={16} style={tw` mt-1`}>
        {title}
      </TextPrimary>
      <TextPrimary
        font="regular"
        size={12}
        lineHeight={18}
        color="#6B7280"
        style={tw`mb-2 mt-1.5`}
      >
        {text}
      </TextPrimary>
      <Image
        source={icon}
        resizeMode="contain"
        style={tw`h-8 w-8 ml-auto opacity-70`}
      />
    </Pressable>
  );
};

export default OrganizationHomeCard;
