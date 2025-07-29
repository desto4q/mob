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
import SignUpForm2 from "../../components/forms/SignUpForm2";
import tw from "twrnc";
import TextPrimary from "../../components/texts/text";
import BackButton from "../../components/BackButton";
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";

const SignUpOrganization = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (checked) => {
    setIsChecked(checked);
  };
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer padding="0%">
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
        <ScrollView className="py-4 flex-1 flex">
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            {/* <SignUpForm1 /> */}
            <SignUpForm2 navigation={navigation} />
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

export default SignUpOrganization;

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
