import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import SignUpForm1 from "../../components/forms/SignUpForm1";
import tw from "twrnc"; // Import twrnc
import BackButton from "../../components/BackButton";
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";

const SignUpIndividual = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView style={tw`flex-1`}>
      <PageContainer>
        <View style={tw`mt-[${height * 0.02}px] pb-0 flex-row items-center`}>
          <BackButton />
          <Image
            source={
              colorScheme === "dark" ? images.logo_light : images.logo_dark
            }
            style={[tw`w-[140px] h-[32px]  mx-auto`]}
            resizeMode="contain"
          />
          <View></View>
        </View>
        <ScrollView style={tw`pb-4`}>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <SignUpForm1 navigation={navigation} />
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

export default SignUpIndividual;

const styles = StyleSheet.create({
  inlineText: {
    textDecorationLine: "underline",
    color: colors.pink,
  },
  inlineText2: {
    textDecorationLine: "underline",
    paddingBottom: 5,
    fontSize: 11,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
});
