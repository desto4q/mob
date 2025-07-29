import { ScrollView, View } from "react-native";
import PageContainer from "../../components/PageContainer";
import BackButton from "../../components/BackButton";
import Header from "../../components/texts/header";
import tw from "../../lib/tailwind";
import BaseText from "../../components/BaseText";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageLoader from "../../components/Loader";
import MaterialErrorComponent from "../../components/errors/ErrorComp";

interface APIResponse {
  code: number;
  message: string;
  data: {
    id: string;
    name: string;
    bankName: string;
    accountNumber: string;
  }[];
}
export default function SubAccounts() {
  const subs = useQuery<APIResponse>({
    queryKey: ["subAccount"],
    queryFn: async () => {
      let response = await newApi.get("/api/users/payment/subaccounts");
      return response.data;
    },
  });

  if (subs.isFetching) return <PageLoader />;
  if (subs.isError)
    return (
      <PageContainer>
        <MaterialErrorComponent onRetry={subs.refetch} showRetryButton={true} />
      </PageContainer>
    );
  return (
    <PageContainer padding={0}>
      <View style={tw`flex-1`}>
        {/* Header Section */}
        <View
          style={tw`flex-row px-2 flex items-center border-b py-2 border-neutral-500/30`}
        >
          <BackButton />
          <Header style={tw`ml-4 items-center `}>
            <BaseText
              style={tw`text-xl font-semibold text-gray-900 bg-green-500 p-2`}
            >
              Saved Accounts
            </BaseText>
          </Header>
        </View>

        {/* Accounts List */}
        <View style={tw`flex-1`}>
          {subs.data?.data.length === 0 ? (
            <View style={tw`flex-1 justify-center items-center p-2`}>
              <BaseText style={tw`text-gray-500 text-base`}>
                No saved accounts found
              </BaseText>
            </View>
          ) : (
            <ScrollView style={tw`space-y-3`} contentContainerStyle={tw`px-2`}>
              {subs.data?.data.map((account) => (
                <View
                  key={account.id}
                  style={tw`bg-white rounded-xl shadow-sm border border-gray-100 p-4 mx-1`}
                >
                  {/* Account Name */}
                  <View style={tw`mb-3`}>
                    <BaseText style={tw`text-lg font-semibold text-gray-900`}>
                      {account.name}
                    </BaseText>
                  </View>

                  {/* Bank Details */}
                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-1`}>
                      <BaseText style={tw`text-sm text-gray-500 mb-1`}>
                        Bank Name
                      </BaseText>
                      <BaseText style={tw`text-base font-medium text-gray-800`}>
                        {account.bankName}
                      </BaseText>
                    </View>

                    <View style={tw`flex-1 ml-4`}>
                      <BaseText style={tw`text-sm text-gray-500 mb-1`}>
                        Account Number
                      </BaseText>
                      <BaseText style={tw`text-base font-medium text-gray-800`}>
                        {account.accountNumber}
                      </BaseText>
                    </View>
                  </View>

                  {/* Optional: Add action buttons */}
                  <View
                    style={tw`flex-row justify-end mt-4 pt-3 border-t border-gray-100`}
                  >
                    <BaseText style={tw`text-blue-600 text-sm font-medium`}>
                      Select
                    </BaseText>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </PageContainer>
  );
}
