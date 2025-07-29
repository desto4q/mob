import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import PageContainer from "../../components/PageContainer";
import images from "../../utils/constants/images";
import { slides } from "./slides";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import tw from "twrnc";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToggleMode } from "../../utils/helpers";

const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }: any) => {
  const { toggleColorMode, mode: colorScheme } = useToggleMode();
  const [page, setpage] = useState(0);
  const slider = useRef<any>();
  const handleNextPress = () => {
    if (page < slides.length - 1) {
      const nextPage = page + 1;
      slider.current?.goToSlide(nextPage, true);
      setpage(nextPage);
    } else {
      navigation.navigate("SelectAcctType");
    }
  };

  // return (
  //   <View style={tw`bg-red-200 flex-1`}>
  //     {/* <Image
  //       style={tw`h-full w-full`}
  //       source={require("/home/destiny/Documents/projects/mobiholder-app/assets/splash.png")}
  //     /> */}
  //   </View>
  // );
  return (
    <PageContainer>
      <View style={tw` items-center flex-row justify-center  z-50 relative `}>
        <View style={tw`flex-row justify-between  w-full items-center mt-8`}>
          <View></View>
          <Image
            source={
              colorScheme === "dark" ? images.logo_light : images.logo_dark
            }
            style={[styles.logo, tw``]}
            resizeMode="contain"
          />
          <View>
            <Pressable style={tw`p-2 right-5`} onPress={toggleColorMode}>
              <MaterialIcons
                name="sunny"
                size={24}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={tw`   `}>
        <View style={[tw`h-[352px]`]}>
          <AppIntroSlider
            data={slides}
            showNextButton={false}
            showDoneButton={false}
            onSlideChange={(index, last) => {
              setpage(index);
            }}
            ref={(ref) => (slider.current = ref)}
            dotStyle={{ backgroundColor: "transparent" }}
            activeDotStyle={{ backgroundColor: "transparent" }}
            renderItem={({ item }) => (
              <View style={tw`justify-center flex flex-row items-center`}>
                <Image
                  source={item.image}
                  style={tw`h-[300px] w-[300px]`}
                  resizeMode="contain"
                />
              </View>
            )}
          />

          <View className="mx-auto flex items-center justify-center flex-row  gap-2 w-full mb-[10%]">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`w-[7.7px] h-[7.7px] rounded-full ${
                  page === index ? "bg-[#FF6EB4]" : "bg-[#FF6EB44D]"
                }`}
              />
            ))}
          </View>
        </View>

        <View style={styles.textWrapper}>
          <Header size={17} className="text-center">
            {slides[page].title}
          </Header>
          <TextPrimary className="text-center text-gray-light mt-5 leading-[22.2px] px-[6%]">
            {slides[page].description}
          </TextPrimary>
        </View>
        <View className="flex flex-row items-center w-full justify-between mt-8 pl-3">
          <Pressable
            onPress={() => navigation.navigate("SelectAcctType")}
            style={tw`p-2`}
          >
            <TextPrimary font="semi_bold" size={14}>
              Skip
            </TextPrimary>
          </Pressable>
          <Pressable onPress={handleNextPress}>
            <Image
              source={slides[page].arrow}
              resizeMode="contain"
              style={{ width: 70, height: 70 }}
            />
          </Pressable>
        </View>
      </View>
    </PageContainer>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  logo: {
    width: 140,
    height: 30,
  },
  slide: {
    justifyContent: "flex-start",
    height: height * 0.55,
    marginTop: height * 0,
  },
  image: {
    width: width * 0.9,
    height: height * 0.58,
  },
  textWrapper: {
    paddingHorizontal: width * 0.0,
  },
});
