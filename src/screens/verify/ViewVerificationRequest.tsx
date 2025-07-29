import {
  FlatList,
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
import BackButton from "../../components/BackButton";

const ViewVerificationRequest = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [filterModal, setFilterModal] = useState(false);
  const toggleFilterModal = () => setFilterModal(!filterModal);
  const [filterData, setfilterData] = useState({
    active: false,
    inActive: false,
    me: false,
    organization: false,
  });

  console.log(filterData.active);
  return (
    <>
      <PageContainer>
        <ScrollView style={tw``}>
          <View style={tw` flex-row justify-between`}>
            <BackButton onPress={() => navigation.goBack()} />
            <Header font="semi_bold" size={16}>
              View Verification Request
            </Header>
            <AntDesign
              name="pluscircle"
              size={24}
              color={colors.primary}
              onPress={() => navigation.navigate("")}
            />
            <View />
          </View>

          <TextPrimary
            size={13}
            font="medium"
            color={colors.gray_light}
            style={tw`mt-5`}
          >
            See all your verification requests and status
          </TextPrimary>

          <View style={tw`flex-row gap-5 mt-4`}>
            <View style={tw`flex-1`}>
              <InputText
                icon={icons.search}
                placeholder="Search"
                style={tw`border border-[#484848] rounded-[10px] h-[36px]`}
              />
            </View>
            {/* <Pressable
                onPress={toggleFilterModal}
                style={tw` border border-[#484848] w-[38px] h-[36px] justify-center items-center rounded-[10px] bg-[${colors.gray_dark}]`}
              >
                <MaterialIcons name="filter-list" size={24} color="#A3A3A4" />
              </Pressable> */}
          </View>

          <FlatList
            data={[...Array(4)]}
            renderItem={({}) => (
              <View style={tw`my-1`}>
                <VerifiersItem
                  onPress={() => navigation.navigate("")}
                  image={images.subscriptionItem}
                />
              </View>
            )}
          />
        </ScrollView>
      </PageContainer>
    </>
  );
};

export default ViewVerificationRequest;

const styles = StyleSheet.create({});
