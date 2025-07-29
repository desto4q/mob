import {
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import {
  useDeleteIdCardMutation,
  useGetCardTemplatesQuery,
  useSetCardAsDefaultMutation,
} from "../../state/features/services/card/card";
import HorizontalCard from "../../components/CardTemplates/HorizontalCard";
import VerticalCard from "../../components/CardTemplates/VerticalCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseUrl } from "../../config/url";
import { RootState } from "../../state";
import ReusableBottomSheet from "../../components/shared/ReusableBottomSheet";
import Toast from "react-native-toast-message";
import PageLoader from "../../components/Loader";

const CardCategories = ({ navigation }: any) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { data, isLoading, refetch, isFetching } = useGetCardTemplatesQuery();
  const [defaultCard, setDefaultCard] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [action, setAction] = useState("");
  const handleOpen = () => {
    console.log("im pressed");
    setIsBottomSheetVisible(true);
  };
  const handleClose = () => setIsBottomSheetVisible(false);

  const { token } = useSelector((state: RootState) => state.user);

  const [setCardAsDefault, { isLoading: isSettingDefault, error }] =
    useSetCardAsDefaultMutation();
  const [deleteIdCard, { isLoading: isDeleting, error: deleteError }] =
    useDeleteIdCardMutation();

  const handleAction = async () => {
    try {
      const response = await setCardAsDefault({ templateId: defaultCard });
      console.log(response);
      if (response?.error) {
        return Alert.alert("Error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      handleClose();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteIdCard({ templateId: defaultCard });
      console.log(response);
      if (response?.error) {
        return Alert.alert("Error", response?.error?.data?.message);
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      handleClose();
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageContainer padding="0%">
        <ScrollView
          style={tw``}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={tw` flex-row justify-between px-[5%]`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              ID Card Categories
            </Header>

            <AntDesign
              name="pluscircle"
              size={24}
              color={colors.primary}
              onPress={() => navigation.navigate("CreateIdCardCategory")}
            />
          </View>

          <View style={tw` gap-5 mt-4 px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5 text-gray_light`}
            >
              All your creadted ID Card for your different categories
            </TextPrimary>

            {/* <View style={tw`bg-[#2E2F36] p-4 rounded-[15px] border  border-[#1F9433]`}>
                                <TextPrimary>Regular Staff ID</TextPrimary>
                                <CardItem image={images.card2} height={200} style={tw``} />
                            </View> */}

            {data?.data?.map((card, i) => {
              if (card.layout === "vertical") {
                return (
                  <VerticalCard
                    key={i}
                    card={card}
                    navigation={navigation}
                    onPress={() => {
                      handleOpen();
                      setDefaultCard(card.id);
                      setSelectedCard(card);
                    }}
                  />
                );
              } else {
                return (
                  <HorizontalCard
                    key={i}
                    card={card}
                    navigation={navigation}
                    onPress={() => {
                      handleOpen();
                      setDefaultCard(card.id);
                      setSelectedCard(card);
                    }}
                  />
                );
              }
            })}
          </View>
        </ScrollView>
      </PageContainer>
      <ReusableBottomSheet
        onClose={handleClose}
        snapPoints={["30%"]}
        isVisible={isBottomSheetVisible}
      >
        <View style={tw`gap-4`}>
          <PrimaryButton
            size={13}
            style={tw``}
            loading={isSettingDefault}
            onPress={() => {
              setAction("default");
              handleAction();
            }}
          >
            Set As Default
          </PrimaryButton>
          <PrimaryButton
            size={13}
            style={tw``}
            onPress={() => {
              navigation.navigate("CreateIdCardCategory", {
                selectedCard,
              });
            }}
          >
            Edit Card
          </PrimaryButton>
          <PrimaryButton
            size={13}
            style={tw``}
            loading={isDeleting}
            onPress={() => {
              handleDelete();
            }}
          >
            Delete Card
          </PrimaryButton>
        </View>
      </ReusableBottomSheet>
    </>
  );
};

export default CardCategories;

const styles = StyleSheet.create({});
