import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PageContainer from "../../components/PageContainer";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ShadowGradient from "../../components/ShadowGradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import tw from "twrnc";


const EmptyScreen = ({navigation}:any) => {
  const insets = useSafeAreaInsets();
  return (
    <PageContainer>
      <SafeAreaView style={{paddingTop:insets.top}}>
        {/* <View style={tw`flex-row items-center gap-4`}>
          <ShadowGradient onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
          </ShadowGradient>
          <Header font="semi_bold">i</Header>
        </View> */}
      </SafeAreaView>
    </PageContainer>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({});
