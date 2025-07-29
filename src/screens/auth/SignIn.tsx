import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../utils/constants/colors";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import LoginForm from "../../components/forms/LoginForm";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import BackButton from "../../components/BackButton";
import tw from "../../lib/tailwind";
import images from "../../utils/constants/images";
import BaseText from "../../components/BaseText";

const SignIn = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };
  const { colorScheme } = useColorScheme();

  return (
    <PageContainer>
      <SafeAreaView>
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
        <View className="mt-6">
          <BaseText style={tw`text-xl font-bold mx-auto text-center`}>
            Login
          </BaseText>

          <View className="mt-4">
            <BaseText
              style={tw`text-base mx-auto text-center`}
              color={colors.gray_light}
              font="medium"
              weight={500}
              size={12}
            >
              Enter your details to get back in your account
            </BaseText>
          </View>
        </View>
        <ScrollView className="py-4">
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <LoginForm navigation={navigation} />
            <View className="items-center mt-6">
              <BaseText style={tw`text-base`}>
                Don’t have an account?{" "}
                <BaseText
                  style={tw`text-base text-primary`}
                  font="medium"
                  onPress={() => navigation.navigate("SelectAcctType")}
                >
                  Sign Up
                </BaseText>
              </BaseText>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </PageContainer>
  );
};

export default SignIn;

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
