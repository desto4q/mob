import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import InputTextWithLabel from "../inputs/InputWithLabel";
import TextPrimary from "../texts/text";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import PrimaryButton from "../buttons/PrimaryButtom";
import TicketTypeItem from "../TicketTypeItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import Textarea from "../inputs/Textarea";
import ScanBox from "../ScanBox";
import UploadVenueImage from "./UploadVenueImage";
import ChooseDate from "./ChooseDate";
import ChooseTime from "./ChooseTime";
import { CustomSelectList } from "../inputs/Dropdown";
import Checkbox from "../inputs/Checkbox";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

const CreateEventForm2 = ({ navigation, eventData, eventDetails }) => {
  console.log("form 2", eventData);
  const [isChecked, setIsChecked] = useState(
    eventDetails?.isRecurring ?? false
  );
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const eventVenue = eventDetails?.venue ? eventDetails?.venue : [];
  const venueImageUploaded = eventDetails?.venueImage
    ? eventDetails?.venueImage
    : [];

  const [venueImage, setVenueImage] = useState(venueImageUploaded ?? []);

  console.log("venueImageUploaded", venueImageUploaded);
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      venueName: eventVenue?.name ?? "",
      venueAddress: eventVenue?.address ?? "",
      startDate: moment(eventDetails?.startDate).format("YYYY-MM-DD") ?? "",
      endDate: moment(eventDetails?.endDate).format("YYYY-MM-DD") ?? "",
      startTime: moment(eventDetails?.startDate).format("HH:mm") ?? "",
      endTime: moment(eventDetails?.endDate).format("HH:mm") ?? "",
      frequency: eventDetails?.frequency ?? "",
      reoccurrenceEndDate:
        moment(eventDetails?.recurrenceEndDate).format("YYYY-MM-DD") ?? "",
      reoccurrenceCount: eventDetails?.recurrenceCount ?? "",
      reoccurenceEndType: eventDetails?.recurrenceEndType ?? "",
    },
  });
  console.log(venueImage);

  function combineDateAndTime(date, time, format = "YYYY-MM-DD HH:mm") {
    const combinedDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    return combinedDateTime.format(format);
  }

  const handleNextEvent = (data) => {
    console.log("startTime: " + data.startTime);
    console.log("endTime: " + data.endTime);
    console.log("startDate: " + data.startDate);
    console.log("endDate: " + data.endDate);
    // Validation checks

    // Check if the end date is after the start date
    if (new Date(data.endDate) < new Date(data.startDate)) {
      Alert.alert("Validation Error", "End date must be after start date.");
      return;
    }
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const startTime = new Date(`1970-01-01T${data.startTime}:00`);
    const endTime = new Date(`1970-01-01T${data.endTime}:00`);

    if (
      startDate.toDateString() === endDate.toDateString() &&
      endTime <= startTime
    ) {
      Alert.alert(
        "Validation Error",
        "End time should be greater than start time for same day event"
      );
      return;
    }

    // if (isChecked && !frequency) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Please select the frequency for recurring events."
    //   );
    //   return;
    // }

    // if (
    //   isChecked &&
    //   !reoccurrenceEndDate &&
    //   !reoccurrenceCount &&
    //   !reoccurenceEndType
    // ) {
    //   Alert.alert("Validation Error", "Please provide recurrence end details.");
    //   return;
    // }

    // if (
    //   isChecked &&
    //   data.reoccurrenceEndDate &&
    //   new Date(data.reoccurrenceEndDate) <= new Date(data.startDate)
    // ) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Recurrence end date must be after the start date."
    //   );
    //   return;
    // }

    // if (venueImage.length === 0) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Please upload at least one venue image."
    //   );
    //   return;
    // }

    const result = combineDateAndTime(data.startDate, data.startTime);

    console.log("Combined DateTime:", result);

    const payload = {
      ...eventData,
      venue: {
        name: data.venueName,
        address: data.venueAddress,
      },
      ...data,
      venueImage,
      startDate: combineDateAndTime(data.startDate, data.startTime),
      endDate: combineDateAndTime(data.endDate, data.endTime),
      isRecurring: isChecked,
      frequency: data.frequency ? data.frequency : undefined,
      recurrenceEndDate:
        data.reoccurenceEndType === "Date"
          ? data.reoccurrenceEndDate
          : undefined,
      recurrenceCount:
        data.reoccurenceEndType === "Count"
          ? data.reoccurrenceCount
          : undefined,
      recurrenceEndType: data.reoccurenceEndType
        ? data.reoccurenceEndType
        : undefined,
    };

    navigation.navigate("CreateEvent3", { payload, eventDetails });
  };
  const reoccurenceEndType = watch("reoccurenceEndType");

  return (
    <View style={tw`gap-4`}>
      <Controller
        control={control}
        name="venueName"
        rules={{ required: "Venue name is required" }}
        render={({ field: { onChange, value } }) => (
          <InputTextWithLabel
            label="Venue Name"
            placeholder="Enter the venue name"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.venueName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="venueAddress"
        rules={{ required: "Venue name is required" }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            placeholder="Enter the venue of your event"
            label="Venue Address"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.venueAddress?.message}
          />
        )}
      />
      {/* <Textarea
        placeholder="Enter the venue of your event"
        label="Venue Address"
        value={venueAddress}
        onChangeText={(text) => setVenueAddress(text)}
      /> */}

      <UploadVenueImage setImages={setVenueImage} venueImage={venueImage} />
      <View style={tw`flex-row  items-center gap-4 mt-4`}>
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "Start Date is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <ChooseDate
                label="Enter Start Date"
                placeholder="Choose Start date"
                value={value}
                errorMessage={errors?.startDate?.message}
                onChange={onChange}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="endDate"
          rules={{ required: "End Date is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <ChooseDate
                placeholder="Enter End Date"
                label="End Date"
                value={value}
                errorMessage={errors?.endDate?.message}
                onChange={onChange}
              />
            </>
          )}
        />
      </View>

      <View style={tw`flex-row items-center gap-4 mt-4`}>
        <Controller
          control={control}
          name="startTime"
          rules={{ required: "Start Time is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <ChooseTime
                label="Time (Start)"
                placeholder="Choose start time"
                value={value}
                errorMessage={errors?.startTime?.message}
                onChange={onChange}
              />
            </>
          )}
        />
        <Controller
          control={control}
          name="endTime"
          rules={{ required: "End Time is required" }}
          render={({ field: { onChange, value } }) => (
            <>
              <ChooseTime
                placeholder="Choose end time"
                label="Time (End)"
                value={value}
                errorMessage={errors?.endTime?.message}
                onChange={onChange}
              />
            </>
          )}
        />
      </View>
      <View style={tw`flex-row items-center gap-2 mt-4`}>
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <TextPrimary
          style={tw`text-gray_light`}
          font="montserrat_medium"
          size={11}
        >
          Reoccurrence (Optional)
        </TextPrimary>
      </View>

      {isChecked && (
        <View style={tw`gap-3`}>
          <Controller
            control={control}
            name="reoccurenceEndType"
            rules={{ required: "Select a ReoccurenceEndType" }}
            render={({ field: { onChange, value } }) => (
              <CustomSelectList
                label="Select Reoccurence End type"
                list={[
                  { name: "Count", title: "Count", id: "3" },
                  { name: "Date", title: "Date", id: "2" },
                  { name: "Never", title: "Never", id: "1" },
                ]}
                title={
                  eventDetails?.recurrenceEndType
                    ? eventDetails?.recurrenceEndType
                    : "Select Reoccurence End type"
                }
                func={onChange}
                errorMessage={errors?.reoccurenceEndType?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="frequency"
            rules={{ required: "Select a frequency" }}
            render={({ field: { onChange, value } }) => (
              <CustomSelectList
                label="Reoccurrence frequency"
                list={[
                  { name: "Daily", title: "Daily", id: "3" },
                  { name: "Weekly", title: "Weekly", id: "2" },
                  { name: "Monthly", title: "Monthly", id: "1" },
                ]}
                title={
                  eventDetails?.frequency
                    ? eventDetails?.frequency
                    : "Select reoccurrence frequency"
                }
                func={onChange}
                errorMessage={errors?.frequency?.message}
              />
            )}
          />

          {/* getValues */}
          {reoccurenceEndType === "Date" && (
            <Controller
              control={control}
              name="reoccurrenceEndDate"
              rules={{ required: "Start Date is required" }}
              render={({ field: { onChange, value } }) => (
                <ChooseDate
                  label="Reoccurance End Date"
                  placeholder="Choose the date"
                  value={value}
                  errorMessage={errors?.reoccurrenceEndDate?.message}
                  onChange={onChange}
                />
              )}
            />
          )}

          {reoccurenceEndType === "Count" && (
            <Controller
              control={control}
              name="reoccurrenceCount"
              rules={{ required: "Select a reoccurrenceCount" }}
              render={({ field: { onChange, value } }) => (
                <InputTextWithLabel
                  label="Reoccurrence Count"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Enter a reoccurrence Count"
                  keyboardType="number-pad"
                  errorMessage={errors?.reoccurrenceCount?.message}
                />
              )}
            />
          )}
        </View>
      )}

      <PrimaryButton style={tw`mt-5`} onPress={handleSubmit(handleNextEvent)}>
        Next
      </PrimaryButton>
    </View>
  );
};

export default CreateEventForm2;

const styles = StyleSheet.create({});
