import { View, ScrollView } from "react-native";
import BaseText from "../../components/BaseText";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import BackButton from "../../components/BackButton";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "../../lib/tailwind";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import MaterialErrorComponent from "../../components/errors/ErrorComp";
import PageLoader from "../../components/Loader";
import { FlashList } from "@shopify/flash-list";
interface Transaction {
  id: number;
  individualId: string;
  organizationId: string;
  subscriptionId: number;
  plan: {
    id: number;
    name: string;
    price: string;
    validity: number;
    description: string;
  };
  amount: string;
  paystackResponse: {
    amount: number;
    paidAt: string;
    status: string;
    channel: string;
    currency: string;
    customer: string;
    reference: string;
  };
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  individual: {
    isVerified: boolean;
    id: string;
    mobiHolderId: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerifiedAt: string;
    username: string;
    phoneNumber: string;
    dateOfBirth: null;
    companyName: null;
    companyAddress: null;
    companyEmail: null;
    aboutCompany: null;
    natureOfOrganization: null;
    isSuperAdmin: boolean;
    accountType: string;
    acceptedTnC: boolean;
    photo: null;
    wallet: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}
const dummyTransactions = [
  // ... (dummyTransactions array remains the same)
];

interface API_RESPONSE {
  code: number;
  message: string;
  data: any[];
}
export default function WalletBalance() {
  let nav = useNavigation();
  const query = useQuery<API_RESPONSE>({
    queryKey: ["transactions"],
    queryFn: async () => {
      let resp = await newApi.get(
        "/api/memberships-subscriptions/get/transactions",
      );
      return resp.data;
    },
  });
  if (query.isError)
    return <MaterialErrorComponent backButton></MaterialErrorComponent>;
  if (query.isFetching) return <PageLoader />;
  console.log(JSON.stringify(query.data?.data[0]));
  return (
    <PageContainer padding={0}>
      <View
        style={tw`px-4  pb-2 flex flex-row border-b border-neutral-500/20 pb-4  `}
      >
        <BackButton onPress={(e) => nav.goBack()} />
        <Header style={tw`mx-auto`}>Transaction History</Header>

        {/* Balance Card */}
      </View>
      <View style={tw`p-4 px-0 flex-1`}>
        {/* <BaseText>History here</BaseText> */}
        <FlashList
          contentContainerStyle={tw`px-3`}
          data={query.data?.data}
          renderItem={({ index, item }) => {
            return <TransactionItem transaction={item} key={item.id} />;
          }}
        ></FlashList>
      </View>
    </PageContainer>
  );
}

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { amount, createdAt, status, paystackResponse, reference, individual } =
    transaction;

  const isSuccessful = status.toLowerCase() === "success";

  return (
    <View
      style={tw`bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 mb-4 border border-gray-800 shadow-sm`}
    >
      {/* Top: Amount + Status Icon */}
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-1`}>
          <BaseText style={tw`text-base font-semibold`}>₦{amount}</BaseText>
          <BaseText style={tw`text-xs mt-1`}>
            {new Date(createdAt).toLocaleDateString()} •{" "}
            {paystackResponse.channel}
          </BaseText>
        </View>
        <MaterialIcons
          name={isSuccessful ? "check-circle" : "cancel"}
          size={24}
          color={isSuccessful ? "#4CAF50" : "#F44336"}
        />
      </View>

      {/* Individual Info */}
      <View style={tw`mt-3`}>
        <BaseText style={tw`text-sm font-medium`}>
          {individual.firstName} {individual.lastName}
        </BaseText>
        <BaseText style={tw`text-xs`}>
          {individual.email} • {individual.phoneNumber}
        </BaseText>
      </View>

      {/* Reference + Status */}
      <View style={tw`mt-3`}>
        <BaseText style={tw`text-xs`}>Ref: {reference}</BaseText>
        <BaseText style={tw`text-xs mt-1`}>
          Status:{" "}
          <BaseText
            style={tw`text-xs ${isSuccessful ? "text-green-500" : "text-red-500"}`}
          >
            {status.toUpperCase()}
          </BaseText>
        </BaseText>
      </View>
    </View>
  );
};

// const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
//   const { amount, createdAt, status, paystackResponse, reference } =
//     transaction;
//   const isSuccessful = status.toLowerCase() === "success";

//   return (
//     <View
//       style={tw`bg-white dark:bg-[#1C1C1E] rounded-2xl p-4 mb-3 border border-gray-800 shadow-sm`}
//     >
//       <View style={tw`flex-row justify-between items-center`}>
//         <View style={tw`flex-1`}>
//           <BaseText style={tw`text-base font-semibold `}>₦{amount}</BaseText>
//           <BaseText style={tw`text-xs text-gray-400 mt-1`}>
//             {new Date(createdAt).toLocaleDateString()} •{" "}
//             {paystackResponse.channel}
//           </BaseText>
//         </View>
//         <MaterialIcons
//           name={isSuccessful ? "check-circle" : "cancel"}
//           size={24}
//           color={isSuccessful ? "#4CAF50" : "#F44336"}
//         />
//       </View>

//       <View style={tw`mt-3`}>
//         <BaseText style={tw`text-xs text-gray-400`}>Ref: {reference}</BaseText>
//         <BaseText style={tw`text-xs text-gray-400 mt-1`}>
//           Status:{" "}
//           <BaseText
//             style={tw`text-xs ${
//               isSuccessful ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {status.toUpperCase()}
//           </BaseText>
//         </BaseText>
//       </View>
//     </View>
//   );
// };
