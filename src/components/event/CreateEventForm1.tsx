import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import Textarea from "../inputs/Textarea";
import { CustomSelectList } from "../inputs/Dropdown";
import TextPrimary from "../texts/text";
import ScanBox from "../ScanBox";
import tw from "twrnc";
import PrimaryButton from "../buttons/PrimaryButtom";
import UploadEventImage from "./UploadEventImage";
import Checkbox from "../inputs/Checkbox";
import { Controller, useForm } from "react-hook-form";
import { useGetEventCategoryQuery } from "../../state/features/services/events/events";

const CreateEventForm1 = ({ navigation, eventDetails }) => {
  const [isChecked, setIsChecked] = useState(eventDetails?.allowVerifierRequests ?? false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const {data:eventCategory, error} = useGetEventCategoryQuery();

  const formateCategory = eventCategory?.data?.map((item) => ({
    name: item.name,
    title: item.name,
    id: item.id,
  }))

  const [categoryId, setCategoryId] = useState(eventDetails?.category?.id ??"");

  const [image, setImage] = useState(eventDetails?.image ?? "");

  const validateFields = () => {
    if (!image.trim()) {
      Alert.alert("Validation Error", "Image is required");
      return false;
    }

    return true;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: eventDetails?.name ?? "",
      description: eventDetails?.description ?? "",
      category: categoryId,
      accessType: eventDetails?.accessType ?? "",
      image: eventDetails?.image ?? "",
      allowVerifierRequests: eventDetails?.allowVerifierRequests ?? false,
    },
  });

  const handleNext = (data) => {
    if (validateFields()) {
      // All fields are valid, proceed with navigation
      const eventData = {
        ...data,
        image,
        allowVerifierRequests: isChecked,
        category:categoryId
      };
      console.log(categoryId)
      navigation.navigate("CreateEvent2", {
        data: eventData,
        eventDetails
      });
    }
  };

  return (
    <View style={tw`gap-1`}>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Event name is required" }}
        render={({ field: { onChange, value } }) => (
          <InputTextWithLabel
            label="Event Name"
            placeholder="Enter the event name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        rules={{ required: "Event description is required" }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder="Tell us about your event"
            label="Description"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.description?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        rules={{ required: "Select a category" }}
        render={({ field: { onChange, value } }) => (
          <CustomSelectList
            label="Event Category"
            list={formateCategory}
            title={eventDetails?.category ? eventDetails?.category?.name : "Select Event Category"}
            func={onChange}
            func2={setCategoryId}
            errorMessage={errors?.category?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="accessType"
        rules={{ required: "Select a accessType" }}
        render={({ field: { onChange, value } }) => (
          <CustomSelectList
            label="Access Type"
            list={[{ name: "Public", title: "Public", id: "1" },
              { name: "Semi-private", title: "Semi-private", id: "2" },
              { name: "Private", title: "Private", id: "3" }
            ]}
            title={eventDetails?.accessType ? eventDetails?.accessType  : "Choose Access Type"}
            func={onChange}
            errorMessage={errors?.accessType?.message}
          />
        )}
      />
      {/* <CustomSelectList
        label="Access Type"
        list={[{ name: "Private", title: "Private", id: "1" }]}
        title="Choose Access Type"
        func={(text) => setAccessType(text)}
      /> */}

      <UploadEventImage setImage={setImage} image={image} />
      <View style={tw`flex-row items-center gap-2 mt-4`}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <TextPrimary
          style={tw`text-gray_light`}
          font="montserrat_medium"
          size={11}
        >
          Mark event as Open for Verifiers
        </TextPrimary>
      </View>
      <PrimaryButton onPress={handleSubmit(handleNext)} style={tw`mt-5`}>
        Next
      </PrimaryButton>
    </View>
  );
};

export default CreateEventForm1;

const styles = StyleSheet.create({});
