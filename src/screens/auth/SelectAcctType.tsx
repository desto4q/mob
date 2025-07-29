import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import GradientText from "../../components/texts/GradientText";
import images from "../../utils/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import { useColorScheme } from "nativewind";
import BaseText from "../../components/BaseText";

const { width, height } = Dimensions.get("window");
const SelectAcctType = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };
  const { colorScheme } = useColorScheme();
  return (
    <PageContainer>
      <SafeAreaView>
        <View style={{ marginTop: height * 0.02, paddingBottom: 5 }}>
          {/* <MaterialIcons
            name="arrow-back-ios-new"
            size={24}
            color={colors.gray_light}
            onPress={() => navigation.goBack()}
          /> */}
          <View style={tw`flex-row items-center `}>
            <BackButton />
            <Image
              source={
                colorScheme === "dark" ? images.logo_light : images.logo_dark
              }
              style={[styles.logo, tw`w-[140px] h-[32px]  mx-auto`]}
              resizeMode="contain"
            />
            <View></View>
          </View>
        </View>
        <View className="mt-6 ">
          <BaseText style={tw`mx-auto text-center`}>
            <GradientText text="What are you signing up as ?" />
          </BaseText>

          <View className="mt-4 text-center mx-auto">
            <BaseText
              color={colors.gray_light}
              font="medium"
              weight={500}
              style={tw`mx-auto text-center`}
            >
              Welcome on board, choose the type of user you want to be
            </BaseText>
          </View>
        </View>
        <View className=" flex-row gap-5 mt-0">
          <Pressable onPress={() => navigation.navigate("SignUpIndividual")}>
            <Image
              source={images.ind}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SignUpOrganization")}>
            <Image
              source={images.org}
              style={styles.image}
              resizeMode="contain"
            />
          </Pressable>
        </View>
        <View className="items-center mt-6">
          <BaseText style={tw`text-base`}>
            Already have an account ? Proceed to{" "}
            <Text
              onPress={() => navigation.navigate("SignIn")}
              style={[tw`text-primary`, { fontFamily: "medium" }]}
            >
              Login
            </Text>
          </BaseText>
        </View>
      </SafeAreaView>
    </PageContainer>
  );
};

export default SelectAcctType;
const styles = StyleSheet.create({
  image: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
