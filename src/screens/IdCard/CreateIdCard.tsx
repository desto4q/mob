import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/constants/colors";
import InputText from "../../components/inputs/InputText";
import icons from "../../utils/constants/icons";
import TextPrimary from "../../components/texts/text";
import { useColorScheme } from "nativewind";
import images from "../../utils/constants/images";
import VerifiersItem from "../../components/verifcation/VerifiersEventItem";
import EventVerifiersItem from "../../components/verifcation/EventVerifiersItem";
import BackButton from "../../components/BackButton";
import BottomModals from "../../components/modals/BottomModals";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import tw from "../../lib/tailwind";
import CardItem from "../../components/CardItem";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { ColorPickerComponent, UploadLogo } from "../../components/iDcards";
import { CustomSelectList } from "../../components/inputs/Dropdown";
import {
  useCreateIdCardMutation,
  useUpdateIdCardMutation,
} from "../../state/features/services/card/card";
import Toast from "react-native-toast-message";
import ColorPicker, {
  HueCircular,
  SaturationSlider,
} from "reanimated-color-picker";
import {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import { ScrollView as ColorPickerScroller } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

const CreateIdCardCategory = ({ navigation, route }: any) => {
  const selectedCard = route?.params?.selectedCard;
  console.log(selectedCard);
  const [layout, setLayout] = useState(selectedCard?.layout ?? "horizontal");
  const [modal, setModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<
    "background" | "text" | ""
  >("");
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };
  const [isSelect, setIsSelect] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(
    selectedCard?.backgroundColor ?? "#fff",
  );
  const [logo, setLogoUrl] = useState(
    selectedCard?.logo ? selectedCard?.logo : null,
  );
  const [name, setName] = useState(selectedCard?.name ?? "");
  const [textColor, setTextColor] = useState(
    selectedCard?.textColor ?? "#000000",
  );
  const [fontSize, setFontSize] = useState("");

  const [createIdCard, { isLoading }] = useCreateIdCardMutation();
  const [updateIdCard, { isLoading: isUpdating }] = useUpdateIdCardMutation();

  const handleBackgroundColor = (color: string) => {
    console.log("Selected Color:", color);
    setBackgroundColor(color);
  };
  const handleTextColor = (color: string) => {
    console.log("Selected Color:", color);
    setTextColor(color);
  };
  const selectedFontSize = [12];

  const handleSubmit = async () => {
    console.log(layout, fontSize, backgroundColor, selectedFontSize);

    if (!layout || !backgroundColor || !fontSize || !textColor || !name) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const payload = {
      templateId: selectedCard ? selectedCard.id : undefined,
      layout,
      backgroundColor,
      logo,
      name,
      textColor,
      fontSize: selectedFontSize,
    };

    try {
      let response;
      if (selectedCard) {
        // Call updateIdCard if selectedCard exists
        response = await updateIdCard(payload);
      } else {
        // Call createIdCard if selectedCard does not exist
        response = await createIdCard(payload);
      }

      console.log("response", response);

      if (response?.error) {
        Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
        return;
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
  const onSelectColor = (color) => {
    "worklet";

    if (!color?.hex) return;

    if (isSelect === "background") {
      runOnJS(setBackgroundColor)(color.hex);
    } else if (isSelect === "text") {
      runOnJS(setTextColor)(color.hex);
    }
  };

  console.log("background", backgroundColor);

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView style={tw`flex-1`}>
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              Create ID Card Category
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
              Lets create an ID structure for a category of your members{" "}
            </TextPrimary>

            <InputTextWithLabel
              placeholder="Enter category name "
              label="Name of Category"
              value={name}
              onChangeText={(text) => setName(text)}
              style={tw``}
            />
            <CustomSelectList
              label="fontsize"
              list={[
                { name: "12", title: "12", id: "3" },
                { name: "14", title: "14", id: "2" },
                { name: "16", title: "16", id: "1" },
              ]}
              title="Select size"
              func={(text) => setFontSize(text)}
              style={tw``}
            />
          </View>
          <View style={tw`px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5 text-gray_light`}
            >
              Choose Layout
            </TextPrimary>
            <View style={tw`flex-row justify-between mt-4`}>
              <Pressable
                onPress={() => setLayout("horizontal")}
                style={tw`p-1 border rounded-2xl w-[159px] h-[98px] overflow-hidden ${
                  layout === "horizontal"
                    ? "border-primaryLight"
                    : "border-transparent"
                }`}
              >
                <Image
                  source={images.horizontal_card}
                  style={tw`h-full w-full  rounded-2xl`}
                />
              </Pressable>
              <Pressable
                onPress={() => setLayout("vertical")}
                style={tw`w-[119px] h-[167px] rounded-2xl border overflow-hidden p-1 ${
                  layout === "vertical"
                    ? "border-primaryLight"
                    : "border-transparent"
                }`}
              >
                <Image
                  source={images.vertical_card}
                  style={tw`h-full w-full  rounded-2xl`}
                />
              </Pressable>
            </View>

            <View>
              <ColorPickerComponent
                color={backgroundColor}
                label="Background Color"
                onColorSelect={handleBackgroundColor}
                openPicker={() => {
                  toggleModal();
                  setIsSelect("background");
                }}
              />
              <ColorPickerComponent
                color={textColor}
                label="Text Color"
                onColorSelect={handleTextColor}
                openPicker={() => {
                  toggleModal();
                  setIsSelect("text");
                }}
              />
              {/* <UploadLogo
                  selectedImage={selectedCard?.logo}
                  setImage={setLogoUrl}
                /> */}
            </View>

            <View style={{ marginTop: 30 }}>
              <PrimaryButton
                onPress={handleSubmit}
                loading={isLoading || isUpdating}
              >
                {selectedCard ? "Update Card" : "Create ID Card Category"}
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </PageContainer>
      {/* <Modal visible={showModal} animationType="slide" style={tw`bg-gray_dark`}>
        <View style={tw``}>
          <View>
            <ColorPicker
              style={{ width: "80%" }}
              value="red"
              onComplete={onSelectColor}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </View>

          <PrimaryButton onPress={() => setShowModal(false)}>
            Proceed
          </PrimaryButton>
        </View>
      </Modal> */}
      <BottomModals open={modal} handleClose={closeModal} snapPoints={["70"]}>
        <ColorPickerScroller>
          <View style={tw` items-center p-5 w-full`}>
            <TextPrimary style={tw`text-base mb-2`}>Pick any color</TextPrimary>

            <ColorPicker
              style={{ width: "80%" }}
              value="red"
              onComplete={onSelectColor}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </View>
        </ColorPickerScroller>
        <PrimaryButton
          onPress={() => {
            closeModal();
            handleBackgroundColor(backgroundColor);
            handleTextColor(textColor);
          }}
        >
          Done
        </PrimaryButton>
      </BottomModals>
    </>
  );
};

export default CreateIdCardCategory;

const styles = StyleSheet.create({});
