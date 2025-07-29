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
      style={tw`bg-white dark:bg-[#121212] rounded-3xl p-6 mb-4 shadow-lg border-0`}
    >
      {/* Header Section with elevated card feeling */}
      <View style={tw`flex-row justify-between items-start mb-4`}>
        <View style={tw`flex-1`}>
          {/* Amount with better typography hierarchy */}
          <BaseText
            style={tw`text-2xl font-bold text-gray-900 dark:text-white mb-1`}
          >
            ₦{amount.toLocaleString()}
          </BaseText>

          {/* Date and channel with material chips style */}
          <View style={tw`flex-row items-center`}>
            <View
              style={tw`bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mr-2`}
            >
              <BaseText
                style={tw`text-xs font-medium text-gray-600 dark:text-gray-300`}
              >
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </BaseText>
            </View>
            <View
              style={tw`bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full`}
            >
              <BaseText
                style={tw`text-xs font-medium text-blue-600 dark:text-blue-400 capitalize`}
              >
                {paystackResponse.channel}
              </BaseText>
            </View>
          </View>
        </View>

        {/* Status icon with material elevation */}
        <View
          style={tw`${isSuccessful ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"} p-3 rounded-full shadow-sm`}
        >
          <MaterialIcons
            name={isSuccessful ? "check-circle" : "error"}
            size={28}
            color={isSuccessful ? "#10B981" : "#EF4444"}
          />
        </View>
      </View>

      {/* Divider */}
      <View style={tw`h-px bg-gray-200 dark:bg-gray-700 mb-4`} />

      {/* Customer Information Section */}
      <View style={tw`mb-4`}>
        <BaseText
          style={tw`text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2`}
        >
          Subscriber
        </BaseText>
        <BaseText
          style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}
        >
          {individual.firstName} {individual.lastName}
        </BaseText>
        <BaseText style={tw`text-sm text-gray-600 dark:text-gray-300 mb-1`}>
          {individual.email}
        </BaseText>
        <BaseText style={tw`text-sm text-gray-600 dark:text-gray-300`}>
          {individual.phoneNumber}
        </BaseText>
      </View>

      {/* Footer Section */}
      <View
        style={tw`flex-row justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800`}
      >
        {/* Reference */}
        <View style={tw`flex-1`}>
          <BaseText
            style={tw`text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1`}
          >
            Reference
          </BaseText>
          <BaseText
            style={tw`text-sm font-mono text-gray-700 dark:text-gray-300`}
          >
            {reference}
          </BaseText>
        </View>

        {/* Status Badge */}
        <View
          style={tw`${isSuccessful ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"} px-3 py-2 rounded-full`}
        >
          <BaseText
            style={tw`text-xs font-bold ${isSuccessful ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"} uppercase tracking-wide`}
          >
            {status}
          </BaseText>
        </View>
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
