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
import TextPrimary from "../../components/texts/text";
import { colors } from "../../utils/constants/colors";
import AddCardForm from "../../components/forms/AddCardForm";
import ProfileTop from "../../components/profile/ProfileTop";
import PersonalDataForm from "../../components/profile/PersonalDataForm";
import BackIcon from "../../components/BackIcon";
import { useGetUserQuery } from "../../state/features/services/users/user";
import OrganizationPersonalDataForm from "../../components/profile/OrganizationPersonalDataForm";
import tw from "../../lib/tailwind";

const PersonalData = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { data, isLoading: isGettingUser, refetch } = useGetUserQuery();
  const { accountType } = (data?.data as any) || {};
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
              Personal Data
            </Header>
            <View />
          </View>

          <View>
            <ProfileTop />
            {accountType === "Individual" ? (
              <View>
                <PersonalDataForm navigation={navigation} />
              </View>
            ) : (
              <View>
                <OrganizationPersonalDataForm />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  );
};
export default PersonalData;
