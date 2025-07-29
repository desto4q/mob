import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import tw from "twrnc";
import ProfileTop from "../../components/profile/ProfileTop";
import AccountInfoForm from "../../components/profile/AccountInfoForm";
import BackIcon from "../../components/BackIcon";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import { newApi } from "../../state/newStates/flow";
import BaseText from "../../components/BaseText";
import { useAppDispatch } from "../../state/hooks";
import { setLogout, setToken } from "../../state/features/slices/userSlice";
import { useTokenStore } from "../../state/newStates/auth";
import Toast from "react-native-toast-message";

const AccountInfo = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const token = useTokenStore((state) => state.setValue);
  const dispatch = useAppDispatch();
  const handleDeleteAccount = async () => {
    console.log("delete account");
    try {
      console.log("deleting");
      let resp = await newApi.put("/api/users/delete-account");
      dispatch(setLogout());
      dispatch(setToken(""));
      token("");
      console.log(resp.data);
    } catch (err) {
      console.log(err);
      Toast({
        type: "error",
      });
    }
    console.log(resp.data);
  };

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
              Account Info
            </Header>
            <View />
          </View>

          <View>
            <ProfileTop />

            <View>
              <AccountInfoForm />
            </View>
            <PrimaryButton
              style={tw`bg-red-500`}
              onPress={() => setShowDeleteModal(true)}
            >
              Delete Account
            </PrimaryButton>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDeleteModal(false)}>
          <View style={tw`flex-1 justify-center items-center bg-black/50 `}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={tw`bg-neutral-900  p-6 rounded-lg mx-4 w-80`}>
                <BaseText style={tw`text-lg font-semibold mb-4 text-center`}>
                  Delete Account
                </BaseText>
                <BaseText style={tw`mb-6 text-center`}>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </BaseText>
                <View style={tw`flex-row justify-between`}>
                  <PrimaryButton
                    style={tw`bg-gray-300 flex-1 mr-2`}
                    onPress={() => setShowDeleteModal(false)}
                  >
                    <Text style={tw`text-gray-700`}>Cancel</Text>
                  </PrimaryButton>
                  <PrimaryButton
                    style={tw`bg-red-500 flex-1 ml-2`}
                    onPress={handleDeleteAccount}
                  >
                    <Text style={tw`text-white`}>Delete</Text>
                  </PrimaryButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </PageContainer>
  );
};
export default AccountInfo;
