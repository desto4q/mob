import { View, FlatList } from "react-native";
import BaseText from "../../components/BaseText";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageLoader from "../../components/Loader";
import PageContainer from "../../components/PageContainer";
import tw from "../../lib/tailwind";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";
import { colors } from "../../utils/constants";
import moment from "moment";
import { RefreshControl } from "react-native-gesture-handler";
import MaterialErrorComponent from "../../components/errors/ErrorComp";

interface ApiResponse {
  code: number;
  message: string;
  data: Subscription[];
}

export interface Subscription {
  id: number;
  individualId: string;
  organizationId: string;
  plan: Plan;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  transactions: Transaction[];
}

export interface Plan {
  id: number;
  name: string;
  price: string;
  validity: number;
  description: string;
}

export interface Transaction {
  id: number;
  individualId: string;
  organizationId: string;
  subscriptionId: number;
  plan: Plan;
  amount: string;
  paystackResponse: PaystackResponse;
  status: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaystackResponse {
  amount: number;
  paidAt: string;
  status: string;
  channel: string;
  currency: string;
  customer: string;
  reference: string;
}

export default function AllSubscriptions() {
  const query = useQuery<ApiResponse>({
    queryKey: ["subscriptions"],
    queryFn: async () => {
      const resp = await newApi.get(
        "/api/memberships-subscriptions/individual/subscriptions",
      );
      return resp.data;
    },
  });
  if (query.error)
    return (
      <MaterialErrorComponent
        message={query.error.response.data.message}
        backButton
      />
    );
  if (query.isLoading) return <PageLoader />;

  return (
    <PageContainer padding={0}>
      {/* Header */}
      <View
        style={tw`flex flex-row py-2 shadow-md rounded-b-xl dark:bg-[${colors.dark}] bg-white`}
      >
        <BackButton />
        <Header style={tw`ml-auto`}>All Subscriptions</Header>
      </View>

      {/* Content */}
      <View style={tw`px-4 mt-4`}>
        <BaseText style={tw`text-xl font-bold mb-2`}>
          Subscriptions ({query.data?.data?.length ?? 0})
        </BaseText>

        <FlatList
          data={query.data?.data}
          refreshControl={
            <RefreshControl
              refreshing={query.isLoading}
              onRefresh={query.refetch}
            />
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={tw`bg-white dark:bg-gray-900 mb-4 p-4 rounded-2xl shadow-sm`}
            >
              <BaseText style={tw`text-base font-semibold mb-1`}>
                {item.plan.name}
              </BaseText>

              <BaseText>Status: {item.status}</BaseText>
              <BaseText>
                Period: {moment(item.startDate).format("MMM D, YYYY")} -{" "}
                {moment(item.endDate).format("MMM D, YYYY")}
              </BaseText>

              {item.transactions.length > 0 && (
                <View style={tw`mt-2`}>
                  <BaseText style={tw`font-semibold text-sm`}>
                    Transaction
                  </BaseText>
                  {item.transactions.map((tx) => (
                    <View key={tx.id} style={tw`mt-1`}>
                      <BaseText>
                        💰 {tx.amount} {tx.paystackResponse.currency} -{" "}
                        {tx.status}
                      </BaseText>
                      <BaseText style={tw`text-xs text-gray-500`}>
                        {moment(tx.paystackResponse.paidAt).format(
                          "MMM D, YYYY [at] h:mm A",
                        )}
                      </BaseText>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      </View>
    </PageContainer>
  );
}
