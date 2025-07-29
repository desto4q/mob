import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import PageLoader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../../state/newStates/flow";
import PageContainer from "../../components/PageContainer";
import BackButton from "../../components/BackButton";
import MaterialErrorComponent from "../../components/errors/ErrorComp";
import tw from "../../lib/tailwind";
import Header from "../../components/texts/header";
import BaseText from "../../components/BaseText";
import DesignationItem from "../../components/designations/DesignationItem";
import { FlashList } from "@shopify/flash-list";
import ReactNativeModal from "react-native-modal";
import Toast from "react-native-toast-message";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import { useState } from "react";
import InputText from "../../components/inputs/InputText";
import { RefreshControl } from "react-native-gesture-handler";
interface API_RESPONSE {
  code: number;
  message: string;
  data: DESIGNATONS[];
}
interface DESIGNATONS {
  id: number;
  organizationId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export default function ViewDesignations() {
  const query = useQuery<API_RESPONSE>({
    queryKey: ["designations"],
    queryFn: async () => {
      let resp = await newApi.get(
        "/api/memberships-subscriptions/designations",
      );

      return resp.data;
    },
  });
  const [showModal, setModal] = useState<boolean>(false);
  const [designation, setDesignation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  if (query.isError)
    return (
      <MaterialErrorComponent
        message={query.error?.response?.data?.mesage}
        backButton
      />
    );
  if (query.isFetching) return <PageLoader></PageLoader>;
  return (
    <PageContainer>
      <View style={tw`flex-1 py-2`}>
        <View style={tw`flex flex-row`}>
          <BackButton />
          <Header>
            <BaseText style={tw`text-xl font-semibold`}>Designations</BaseText>
          </Header>
          <TouchableOpacity
            onPress={(e) => setModal(true)}
            style={tw`h-8 w-8 items-center justify-center rounded-full bg-primary ml-auto`}
          >
            <BaseText style={tw`xl text-white`}>+</BaseText>
          </TouchableOpacity>
        </View>
        <FlashList
          refreshControl={
            <RefreshControl
              onRefresh={query.refetch}
              refreshing={query.isFetching}
            ></RefreshControl>
          }
          estimatedItemSize={163}
          data={query?.data?.data || []}
          renderItem={(item) => {
            console.log(item);
            return <DesignationItem {...item.item} key={item.item.id} />;
          }}
          style={tw`flex-1`}
          contentContainerStyle={tw`gap-2`}
        >
          {/* {query.data?.data.map((item) => {

          })} */}
        </FlashList>
      </View>
      <ReactNativeModal
        isVisible={showModal}
        onBackdropPress={() => {
          setModal(false);
        }}
      >
        <View
          style={tw`elevation-2 bg-white p-3 px-4 gap-2 py-8  pt-4 rounded-xl`}
        >
          <View style={tw`flex-row`}>
            <TouchableOpacity
              onPress={(e) => {
                setModal(false);
              }}
              style={tw`bg-red-500 rounded-full h-8 w-8 items-center justify-center s-12 ml-auto  w-fit`}
            >
              <BaseText style={tw`text-lg text-white `}>x</BaseText>
            </TouchableOpacity>
          </View>
          <BaseText style={tw`mb-3 text-lg font-semibold`}>
            Create New Designation
          </BaseText>
          <View style={tw`gap-2 mb-4`}>
            <InputTextWithLabel
              value={designation}
              onChangeText={setDesignation}
              label="Input new designation"
              placeholder="Input Designation Here"
            ></InputTextWithLabel>
            <InputText
              value={description}
              onChangeText={setDescription}
              placeholder="Description..(optional)"
            ></InputText>
          </View>
          <PrimaryButton
            style={tw`text-xl`}
            size={22}
            onPress={async (e) => {
              try {
                if (designation.length < 1)
                  return Toast.show({
                    type: "error",
                    text1: "designation invalid",
                  });
                let resp = newApi.post(
                  "/api/memberships-subscriptions/designation/create",
                  {
                    name: designation,
                    description: description,
                  },
                );
                Toast.show({
                  type: "success",
                  text1: "created successfully",
                });
                query.refetch();
                setDesignation("");
                setDescription("");
                setTimeout(() => {
                  // setModal(false);
                }, 1000);
              } catch (err) {
                Toast.show({
                  type: "error",
                  text1: "error occured",
                });
              }
            }}
          >
            <BaseText textColor="white">Create</BaseText>
          </PrimaryButton>
        </View>
      </ReactNativeModal>
    </PageContainer>
  );
}
