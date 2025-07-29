import { View, ScrollView } from "react-native";
import BaseText from "../../components/BaseText";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import BackButton from "../../components/BackButton";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "../../lib/tailwind";
import { useNavigation } from "@react-navigation/native";

const dummyTransactions = [
  // ... (dummyTransactions array remains the same)
];

export default function WalletBalance() {
  let nav = useNavigation();
  return (
    <PageContainer padding={0}>
      <View
        style={tw`px-4 pt-6 pb-2 flex flex-row border-b border-neutral-500/20 pb-4  `}
      >
        <BackButton onPress={(e) => nav.goBack()} />
        <Header style={tw`mx-auto`}>Transaction History</Header>

        {/* Balance Card */}
      </View>
      <View style={tw`p-4`}>
        <BaseText>History here</BaseText>
      </View>
    </PageContainer>
  );
}
