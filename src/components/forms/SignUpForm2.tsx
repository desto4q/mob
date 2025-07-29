// SignUpForm2.tsx
import { Dimensions, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider, Controller, set } from "react-hook-form";
import Header from "../texts/header";
import TextPrimary from "../texts/text";
import { colors } from "../../utils/constants/colors";
import PrimaryButton from "../buttons/PrimaryButtom";
import Toast from "react-native-toast-message"; // Toast for error messages
import InputText from "../inputs/InputText";
import Textarea from "../inputs/Textarea";
import icons from "../../utils/constants/icons";
import { CustomSelectList } from "../inputs/Dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment"; // import moment for date formatting
import { country_list } from "../../utils/constants";
// import NaijaStates from 'naija-state-local-government';
import BottomModals from "../modals/BottomModals";
import AntDesign from "@expo/vector-icons/AntDesign";
import Checkbox from "../inputs/Checkbox";
import tw from "../../lib/tailwind";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CenterModal from "../modals/CenterModal";
import { DateInput } from "../shared/DateInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useQuery } from "@tanstack/react-query";
import NewCountrySelect from "../inputs/NewCountrySelect";
import PageLoader from "../Loader";
import BaseText from "../BaseText";
export type COUNTRY = {
  country: string;
  region: string;
};
interface COUNTRIES {
  status: "OK";
  "status-code": number;
  version: "1.0";
  access: string;
  total: number;
  offset: 0;
  limit: number;
  data: {
    [key: string]: COUNTRY;
  };
}
const SignUpForm2 = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");
  const [tab, setTab] = useState("first");
  const [accessType, setAccessType] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  // console.log(NaijaStates.states());

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false); // Hide the picker
    if (selectedDate) {
      setDate(selectedDate); // Set the selected date
    }
  }; // Local state to track accessType
  const handleConfirm = (selectedDate: any, onChange: any) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setDate(selectedDate);
    onChange(formattedDate); // Update the value in the Controller
    setShowPicker(false); // Close the picker
  };

  const methods = useForm({
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = methods;

  // const state_list = NaijaStates.states().map((state: string, index: number) => ({
  //   name: state,
  //   title: state,
  //   id: (index + 1).toString()
  // }));

  const onSubmit = (data: any) => {
    if (!accessType) {
      Toast.show({
        type: "error",
        text1: "Access Type Required",
        text2: "Please select an access type before proceeding.",
      });
      return;
    }
    if (!country) {
      Toast.show({
        type: "error",
        text1: "Country field is required",
        text2: "Please select an access type before proceeding.",
      });
      return;
    }

    const formData = {
      ...data,
      dateOfBirth: moment(date).format("YYYY-MM-DD"),
      natureOfOrganization: accessType,
      companyAddress: {
        country,
        state: data.state,
        street: data.street,
      },
    };

    console.log(formData);
    navigation.navigate("SignUpOrganization2", { data: formData });
  };

  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const handleCheckType = (item: any) => {
    setShowContent(true);
    setContent(item);
    setModal(false);
  };

  let [countryFilter] = useState<string>("");
  let countries = useQuery<COUNTRIES>({
    queryKey: ["countries", countryFilter],
    queryFn: async () => {
      let resp = await fetch(
        "https://api.first.org/data/v1/countries?limit=200",
      );
      if (!resp.ok) throw new Error("failed ");
      return resp.json();
    },
  });

  // const { width, height } = Dimensions.get("window");

  if (countries.isFetching)
    return (
      <View style={tw`flex-1  h-[${height}px] `}>
        <PageLoader />
      </View>
    );
  return (
    <>
      <FormProvider {...methods}>
        <View style={[{ paddingBottom: 100 }, tw`px-[5%] flex-1  `]}>
          <View style={tw`mt-2`}>
            <BaseText size={21}>Sign Up as Organization</BaseText>
            <View style={tw`mt-4`}>
              <BaseText
                color={colors.gray_light}
                font="medium"
                weight={500}
                size={12}
              >
                Not an organization? Sign up as{" "}
                <BaseText
                  textColor={colors.primary}
                  font="semi_bold"
                  style={{ textDecorationLine: "underline" }}
                  onPress={() => navigation.navigate("SignUpIndividual")}
                >
                  Individual
                </BaseText>
              </BaseText>
            </View>
            <View style={tw`flex-row gap-3 mt-5`}>
              <View style={tw`h-1 bg-[#242EF2] rounded-[20px] flex-1`} />
              <View
                style={tw`h-1 rounded-[20px] flex-1 ${
                  tab === "second" ? "bg-[#242EF2]" : "bg-[#B4B4B4]"
                }`}
              />
            </View>
          </View>

          <View style={{ marginTop: 40, gap: 10 }}>
            {/* Company Name */}
            <Controller
              control={control}
              name="companyName"
              rules={{ required: "Company name is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputText
                  icon={icons.company}
                  placeholder="Company name"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="companyEmail"
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputText
                  icon={icons.mail}
                  placeholder="Company email (optional)"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
            {/* <Text>{JSON.stringify(countries.isFetching)}</Text> */}
            {!countries.isFetching ? (
              countries.data && (
                <Controller
                  control={control}
                  name="country"
                  rules={{ required: "Country is required" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <NewCountrySelect
                        onChangeText={onChange}
                        value={value}
                        items={countries.data.data as any}
                      />
                    );
                  }}
                ></Controller>
              )
            ) : (
              <Text style={tw`p-2 w-full`}> loading</Text>
            )}

            <Controller
              control={control}
              name="state"
              rules={{ required: "Company state is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputText
                  icon={icons.location}
                  placeholder="Enter the state "
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
            {/* <InputText placeholder="Select Country"></InputText> */}
            {/* Username */}
            {/* <Controller
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.user_icon}
                placeholder="Username"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          /> */}
            {/* Country */}
            {/* <Controller
            control={control}
            name="country"
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputText
                icon={icons.location}
                placeholder="Country"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
              />
            )}
          /> */}
            {/* {!countries.isFetching && (
              <NewCountrySelect item={countries.data?.data} />
            )} */}
            {/* <CustomSelectList
              list={countries.data}
              title="select your country"
              func={(text) => setCountry(text)}
            />
            <Controller
              control={control}
              name="state"
              rules={{ required: "Company state is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputText
                  icon={icons.location}
                  placeholder="Enter the state "
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            /> */}
            <Controller
              control={control}
              name="street"
              rules={{ required: "Company street is required" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputText
                  icon={icons.location}
                  placeholder="Enter the street"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="aboutCompany"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Textarea
                  placeholder="About company (optional)"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={error?.message}
                  style={tw`mb-0`}
                />
              )}
            />

            <Controller
              control={control}
              name="dateOfBirth"
              defaultValue={moment(date).format("YYYY-MM-DD")}
              render={({ field: { onChange, value } }) => (
                <>
                  <DateInput
                    placeholder="Company Registered Date (Optional)"
                    onPress={togglePicker}
                    value={value}
                    // errorMessage={errors?.dateOfBirth?.message}
                  />
                  <DateTimePickerModal
                    isVisible={showPicker}
                    mode="date"
                    onConfirm={(date) => handleConfirm(date, onChange)} // Pass onChange here
                    onCancel={togglePicker}
                    date={date || new Date()}
                    maximumDate={new Date()}
                  />
                </>
              )}
            />
            {/* Access Type - CustomSelectList */}
            <InputText
              placeholder="Choose Access Type"
              value={accessType}
              onPress={toggleModal}
              editable={false}
              iconRight={icons.dropdown}
            />
            <View style={{ marginTop: 30 }}>
              {/* Submit Button */}
              <PrimaryButton
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                Next
              </PrimaryButton>
            </View>
          </View>
          <View style={tw`items-center mt-6`}>
            <BaseText>
              Already have an account?{" "}
              <BaseText
                textColor={colors.secondary}
                font="medium"
                onPress={() => navigation.navigate("SignIn")}
              >
                Login
              </BaseText>
            </BaseText>
          </View>
        </View>
      </FormProvider>
      <BottomModals open={modal} handleClose={toggleModal} snapPoints={["50"]}>
        <View style={tw``}>
          <View
            style={tw`flex-row justify-between items-center p-5 pt-0 border-b border-[#848383]`}
          >
            <AntDesign
              onPress={toggleModal}
              name="closecircleo"
              size={22}
              color="white"
            />
            <TextPrimary font="semi_bold">Select Access Type</TextPrimary>
            <View />
          </View>
          <View style={tw`gap-5 mt-5 px-5`}>
            <View style={tw`flex-row gap-4 items-center`}>
              <Checkbox
                onChange={() => setAccessType("Open")}
                checked={accessType === "Open"}
              />
              <TextPrimary font="medium" size={13}>
                Open
              </TextPrimary>
              <MaterialIcons
                onPress={() =>
                  handleCheckType(
                    "The profile of the organization would be accessible to all users on the platform and they can join directly without approval",
                  )
                }
                name="info"
                size={24}
                style={tw`dark:text-white text-black ml-auto`}
              />
            </View>
            <View style={tw`flex-row gap-4 items-center`}>
              <Checkbox
                onChange={() => setAccessType("Semi-Open")}
                checked={accessType === "Semi-Open"}
              />
              <TextPrimary font="medium" size={13}>
                Semi-Open
              </TextPrimary>
              <MaterialIcons
                onPress={() =>
                  handleCheckType(
                    "The profile of the organization would be accessible to all users on the platform but they cannot join directly without an approval",
                  )
                }
                name="info"
                size={24}
                style={tw`dark:text-white text-black ml-auto`}
              />
            </View>
            <View style={tw`flex-row gap-4 items-center`}>
              <Checkbox
                onChange={() => setAccessType("Closed")}
                checked={accessType === "Closed"}
              />
              <TextPrimary font="medium" size={13}>
                Closed
              </TextPrimary>
              <MaterialIcons
                onPress={() =>
                  handleCheckType(
                    "The profile of the organization would be inaccessible, except via invite.",
                  )
                }
                name="info"
                size={24}
                style={tw`dark:text-white text-black ml-auto`}
              />
            </View>
          </View>
        </View>
      </BottomModals>
      <CenterModal
        style={tw` p-4 justify-center items-center z-20 w-full`}
        open={showContent}
        handleClose={() => setShowContent(!showContent)}
      >
        <TextPrimary>{content}</TextPrimary>
      </CenterModal>
    </>
  );
};

export default SignUpForm2;
