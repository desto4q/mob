import { Image, Pressable } from "react-native";
import React, { FC } from "react";
import TextPrimary from "./texts/text";
import tw from "twrnc";

interface HomeCardProps {
  item: {
    icon: string;
    title: string;
    text: string;
    route: string;
    color: string;
    navigation: any;
  };
}

const HomeCard: FC<HomeCardProps> = ({ item, navigation }: any) => {
  const { icon, title, text, route, color } = item;
  return (
    <Pressable
      onPress={() => navigation.navigate(route)}
      style={[
        tw`rounded-xl px-3 py-3 bg-white shadow-sm border-l-4 flex-1 min-h-55`,
        { backgroundColor: color + "08", borderLeftColor: color },
      ]}
    >
      <TextPrimary
        style={tw` mt-2 font-bold opacity-80 text-base`}
        font="inter"
      >
        {title}
      </TextPrimary>
      <TextPrimary
        style={tw`mt-1.5 text-sm`}
        font="regular"
        lineHeight={18}
        color="#6B7280"
      >
        {text}
      </TextPrimary>
      <Image
        source={icon}
        resizeMode="contain"
        style={tw`h-8 w-8 ml-auto mt-auto opacity-70`}
      />
    </Pressable>
  );
};

export default HomeCard;
