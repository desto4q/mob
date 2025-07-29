import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
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
import tw from "twrnc";
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
import {
  useGetEventVerifiersQuery,
  useUpdateVerificationStatusMutation,
} from "../../state/features/services/verification/verification";
import PageLoader from "../../components/Loader";
import Toast from "react-native-toast-message";

const ViewEventVerifiers = ({ navigation, route }: any) => {
  const { eventId } = route?.params;
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });
  const [modal, setModal] = useState(false);
  const toggleModal = (verifier) => {
    setSelected(verifier);
    setModal(!modal);
  };

  const { data, isLoading, refetch, isFetching, isError, error } =
    useGetEventVerifiersQuery(eventId);
  const verifiers = data?.data;
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateVerificationStatusMutation();

  useEffect(() => {
    console.log(isFetching, isError, error);
  }, [isFetching, isError, error]);
  if (isFetching) return <PageLoader />;
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

  const handleRevoke = async () => {
    try {
      const response = await updateStatus({
        requestId: selected?.id,
        status: selected?.status === "active" ? "declined" : "active",
      });
      console.log(response?.error);
      if (response?.error) {
        console.log("error", response.error);
        return Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      setModal(false);
    } catch (error: any) {
      console.log(error);
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    } finally {
      setModal(false);
    }
  };

  return (
    <>
      <PageContainer padding="0%">
        <View style={tw` flex-row justify-between px-[5%]`}>
          <BackButton onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Event Verifiers
          </Header>
          <AntDesign
            name="pluscircle"
            size={24}
            color={colors.primary}
            onPress={() =>
              navigation.navigate("AddVerifiersScreen", { eventId })
            }
          />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw` gap-5 mt-4 px-[5%]`}>
            <TextPrimary
              size={13}
              font="medium"
              color={colors.gray_light}
              style={tw`mt-5`}
            >
              List of all event verifiers for : Google Event
            </TextPrimary>
            <View style={tw`flex-1`}>
              <InputText
                icon={icons.search}
                placeholder="Search for verifier "
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
              />
            </View>
          </View>

          <FlatList
            data={verifiers}
            renderItem={({ item }) => (
              <View style={tw`mt-5 ml-[5%] flex-1`}>
                <EventVerifiersItem toggleModal={toggleModal} item={item} />
              </View>
            )}
            numColumns={2}
            style={tw`mr-[5%]  mt-8`}
            refreshControl={
              <RefreshControl
                refreshing={refreshing || isFetching}
                onRefresh={onRefresh}
              />
            }
          />
        </View>
      </PageContainer>
      <BottomModals
        open={modal}
        handleClose={() => setModal(false)}
        snapPoints={["50"]}
      >
        <View style={tw`p-5`}>
          {/* <View style={tw`h-[2px] w-[80px] rounded-sm bg-[#606060] mx-auto`} /> */}
          <TextPrimary font="medium" size={15} style={tw`text-center mt-5`}>
            Revoke Verification Access ?
          </TextPrimary>
          <View style={tw`gap-5 mt-6`}>
            <View style={tw`flex-col gap-2 items-center`}>
              <Image
                source={{ uri: selected?.user?.photo }}
                resizeMode="cover"
                style={tw`h-[66px]  w-[66px] rounded-full ]`}
              />
              <View style={tw`gap-1 items-center`}>
                <TextPrimary font="semi_bold" size={14}>
                  {selected?.user?.firstName} {selected?.user?.lastName}
                </TextPrimary>

                <TextPrimary font="semi_bold" size={11} color="#696767">
                  {selected?.user?.email}
                </TextPrimary>
              </View>
            </View>

            <PrimaryButton
              onPress={handleRevoke}
              size={13}
              style={tw``}
              loading={isUpdating}
            >
              Revoke
            </PrimaryButton>
          </View>
        </View>
      </BottomModals>
    </>
  );
};

export default ViewEventVerifiers;

const styles = StyleSheet.create({});
