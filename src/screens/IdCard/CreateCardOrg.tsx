import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants/colors";
import icons from "../../utils/constants/icons";
import TextPrimary from "../../components/texts/text";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import {
  useCreateMemberIdCardMutation,
  useGetCardTemplatesQuery,
} from "../../state/features/services/card/card";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";

const CreateCardOrg = ({ navigation, route }: any) => {
  const [cardCategory, setCardCategory] = useState("");
  const { data } = useGetCardTemplatesQuery();

  const selectedMember = route?.params?.data;
  const [role, setRole] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState<"issue" | "end" | null>(
    null,
  );

  const cardName = data?.data?.map((card) => ({
    name: card.name,
    title: card.name,
    id: card.id,
  }));

  const showDatePicker = (field: "issue" | "end") => {
    setCurrentField(field);
    setPickerVisible(true);
  };

  const hideDatePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
    if (currentField === "issue") {
      setIssueDate(formattedDate);
    } else if (currentField === "end") {
      setEndDate(formattedDate);
    }
    hideDatePicker();
  };

  const [createMemberIdCard, { isLoading }] = useCreateMemberIdCardMutation();

  const handleSubmit = async () => {
    if (!role || !endDate || !cardCategory) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const selectedFontSize = [12];

    try {
      const response: any = await createMemberIdCard({
        designation: role,
        expiryDate: endDate,
        templateId,
        memberId: selectedMember.id,
      });
      if (response?.error) {
        return Alert.alert("Error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Create ID Card
            </Header>
            <View />
          </View>

          <View style={tw` gap-5 mt-4 px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5 text-gray_light`}
            >
              Fill in the details below to create your ID Card
            </TextPrimary>
            <View style={tw`gap-2 mt-4`}>
              <InputTextWithLabel
                value={role}
                onChangeText={(text) => setRole(text)}
                label="Role"
                placeholder="Enter member role"
              />
              {/* <TouchableOpacity onPress={() => showDatePicker("issue")}>
                  <InputTextWithLabel
                  onPress={() => showDatePicker("issue")}
                  editable={false}
                    label="Issue Date"
                    placeholder="Pick the date"
                    icon={icons.event}
                    value={issueDate}
                  />
                </TouchableOpacity> */}
              <TouchableOpacity onPress={() => showDatePicker("end")}>
                <InputTextWithLabel
                  onPress={() => showDatePicker("end")}
                  label="Expiry Date"
                  placeholder="Pick the date"
                  icon={icons.event}
                  value={endDate}
                />
              </TouchableOpacity>
              <CustomSelectList
                list={cardName}
                title="Select ID Category"
                func={(text) => setCardCategory(text)}
                func2={setTemplateId}
                label="Card Category"
              />
            </View>
            <View style={tw`pt-10`}>
              <PrimaryButton onPress={handleSubmit} loading={isLoading}>
                Create ID Card{" "}
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </PageContainer>
    </>
  );
};

export default CreateCardOrg;

const styles = StyleSheet.create({});
