import { ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import tw from "twrnc";
import BackIcon from "../../components/BackIcon";
import DrawerIcon from "../../components/DrawerIcon";
import icons from "../../utils/constants/icons";
import { useGetSupportContactsQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";
import { Linking } from "react-native";

const Support = ({ navigation }: any) => {
  const { data: support, isLoading } = useGetSupportContactsQuery();

  if (isLoading) return <PageLoader />;

  const supportData = support?.data;

  console.log("support", supportData[0]);

  const email = supportData[0].email;
  const phone = supportData[0].phoneNumber;

  return (
    <PageContainer>
      <ScrollView style={tw``}>
        <View style={tw` flex-row justify-between mb-8`}>
          <BackIcon onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            Support
          </Header>
          <View />
        </View>

        <View style={tw`gap-8`}>
          <DrawerIcon
            label="Email"
            icon={icons.mail}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          />
          <DrawerIcon
            label="Call Us"
            icon={icons.help}
            onPress={() => Linking.openURL(`tel:${phone}`)}
          />
          <DrawerIcon
            label="FAQs"
            icon={icons.help}
            onPress={() => navigation.navigate("FaqScreen")}
          />
          <DrawerIcon
            label="Contact Us"
            icon={icons.help}
            onPress={() => navigation.navigate("ContactUsScreen")}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};
export default Support;
