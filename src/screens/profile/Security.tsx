import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import tw from "twrnc";
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants/colors";
import AddCardForm from "../../components/forms/AddCardForm";
import ProfileTop from "../../components/profile/ProfileTop";
import PersonalDataForm from "../../components/profile/PersonalDataForm";
import AccountInfoForm from "../../components/profile/AccountInfoForm";
import SecurityForm from "../../components/profile/SecurityForm";
import BackIcon from "../../components/BackIcon";

const Security = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <PageContainer>
      <ScrollView style={tw``}>
        <KeyboardAvoidingView
          //   behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={tw` flex-row justify-between mb-8`}>
            <BackIcon onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Security
            </Header>
            <View />
          </View>

          <View>
            <ProfileTop icon={false} />

            <View>
              <SecurityForm />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  );
};
export default Security;
