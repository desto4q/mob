import { TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";
import BaseText from "../BaseText";
import PrimaryButton from "../buttons/PrimaryButtom";
import ReactNativeModal from "react-native-modal";
import { useState } from "react";
import InputText from "../inputs/InputText";
import Toast from "react-native-toast-message";
import { newApi } from "../../state/newStates/flow";
import { Query, useQueryClient } from "@tanstack/react-query";

interface DesignationItemProps {
  id: number;
  organizationId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function DesignationItem({
  id,
  name,
  description,
  createdAt,
  updatedAt,
  onEdit,
  onDelete,
}: DesignationItemProps) {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [visible, setIsVisible] = useState<boolean>(false);
  const [newName, setName] = useState<string>(name || "");
  const [newDescription, setDescription] = useState<string>(description || "");
  const client = useQueryClient();
  return (
    <View style={tw`bg-white dark:bg-gray_dark rounded-2xl p-4 m-2 shadow-md`}>
      {/* Title */}
      <BaseText style={tw`text-lg font-semibold text-primary mb-2`}>
        {name}
      </BaseText>

      {/* Description */}
      {description && (
        <BaseText style={tw`text-sm text-gray-700 dark:text-gray-300 mb-3`}>
          {description}
        </BaseText>
      )}

      {/* Metadata */}
      <View style={tw`mb-4`}>
        {createdAt && (
          <BaseText style={tw`text-xs text-gray-500 dark:text-gray-400`}>
            Created: {dateFormatter.format(new Date(createdAt))}
          </BaseText>
        )}
        {updatedAt && createdAt !== updatedAt && (
          <BaseText style={tw`text-xs text-gray-500 dark:text-gray-400`}>
            Updated: {dateFormatter.format(new Date(updatedAt))}
          </BaseText>
        )}
      </View>

      {/* Action Buttons */}
      <View style={tw`flex-row justify-end gap-3`}>
        <PrimaryButton
          style={tw`px-4 py-2`}
          onPress={(e) => {
            setIsVisible(!visible);
          }}
        >
          Edit
        </PrimaryButton>
        <PrimaryButton
          style={tw`bg-red-500 px-4 py-2`}
          onPress={async () => {
            try {
              console.log(id);
              let resp = await newApi.delete(
                `/api/memberships-subscriptions/designation/delete?id=${id}`,
              );
              Toast.show({
                type: "success",
                text1: "deleted succesfully",
              });
              setTimeout(() => {
                client.invalidateQueries({
                  queryKey: ["designations"],
                });
              }, 800);
            } catch (err) {
              console.log(err.response.data);
              Toast.show({
                type: "error",
                text1: err.response.data.message,
              });
            }
          }}
        >
          Delete
        </PrimaryButton>
      </View>
      <ReactNativeModal
        isVisible={visible}
        onBackdropPress={() => setIsVisible(false)}
      >
        <Toast></Toast>
        <View style={tw`dark:bg-slate-900 bg-white p-4 rounded-xl shadow-xl`}>
          <View style={tw`flex-row items-center mb-4`}>
            <BaseText style={tw` text-xl font-bold`}>Edit Designation</BaseText>
            <TouchableOpacity
              onPress={(e) => {
                setIsVisible(false);
              }}
              style={tw`items-center justify-center ml-auto rounded-full bg-red-600/80 h-8 w-8`}
            >
              <BaseText style={tw`text-white text-xl`}>x</BaseText>
            </TouchableOpacity>
          </View>
          <View style={tw`gap-3`}>
            <InputText
              placeholder="Designation..."
              value={newName}
              onChangeText={setName}
            ></InputText>
            <InputText
              placeholder="Description... (optional)"
              value={newDescription}
              onChangeText={setDescription}
            ></InputText>
          </View>
          <View style={tw`mt-3 gap-3`}>
            <PrimaryButton
              onPress={async () => {
                try {
                  console.log("id", id);
                  let resp = await newApi.put(
                    `/api/memberships-subscriptions/designation/update`,
                    {
                      name: newName,
                      description: newDescription,
                      designation_id: String(id),
                    },
                  );

                  Toast.show({
                    type: "success",
                    text1: "updated successfully",
                  });
                  client.invalidateQueries({
                    queryKey: ["designations"],
                  });
                  return await resp.data;
                } catch (err) {
                  console.log(err);
                  Toast.show({
                    type: "error",
                    text1: "error occured",
                  });
                }
              }}
            >
              Update
            </PrimaryButton>
            <PrimaryButton
              onPress={(e) => {
                setIsVisible(false);
              }}
              style={tw`bg-transparent border border-neutral-500/50`}
            >
              <BaseText>Cancel</BaseText>
            </PrimaryButton>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
}
