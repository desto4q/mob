import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "../../components/texts/header";
import TextPrimary from "../../components/texts/text";
import { useColorScheme } from "nativewind";
import CreateEventForm1 from "../../components/event/CreateEventForm1";
import CreateEventForm2 from "../../components/event/CreateEventForm2";
import BackButton from "../../components/BackButton";
import PrimaryButton from "../../components/buttons/PrimaryButtom";
import InputTextWithLabel from "../../components/inputs/InputWithLabel";
import AntDesign from "@expo/vector-icons/AntDesign";
import TicketTypeItem from "../../components/TicketTypeItem";
import tw from "../../lib/tailwind";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "../../state/features/services/events/events";
import Toast from "react-native-toast-message";
import CenterModal from "../../components/modals/CenterModal";
import BottomModals from "../../components/modals/BottomModals";

const CreateEvent3 = ({ navigation, route }) => {
  const { payload, eventDetails } = route?.params;

  const [createEvent, { isLoading }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const [ticketType, setTicketType] = useState(
    eventDetails?.ticketType ?? "Paid",
  );
  const [tickets, setTickets] = useState([
    { id: 1, name: "", price: "", ticketsAvailable: "", plusAllowed: "" },
  ]);
  // const [eventTickets, setEventTickets] = useState(
  //   eventDetails?.eventtickets ?? []
  // );

  useEffect(() => {
    if (eventDetails) {
      setTicketType(eventDetails.ticketType);
      console.log(eventDetails.eventtickets);
      setTickets(
        eventDetails.eventtickets.map((ticket) => ({
          id: ticket.id,
          name: ticket.name,
          price: ticket.price,
          ticketsAvailable: ticket.ticketsAvailable?.toString() ?? "0",
          plusAllowed: ticket.plusAllowed?.toString() ?? "0",
        })),
      );
      // setTickets(eventDetails?.eventtickets)
      // setEventTickets(eventDetails.eventtickets);
    }
  }, [eventDetails]);

  // console.log(tickets)

  const handleAddTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      name: "",
      price: "",
      ticketsAvailable: "",
      plusAllowed: "",
    };

    // Update tickets state for UI rendering
    setTickets([...tickets, newTicket]);

    // Update eventTickets array with the new ticket in the specified format
    // setEventTickets([
    //   ...eventTickets,
    //   { name: "", ticketsAvailable: 0, plusAllowed: 0, price: 0 },
    // ]);
  };

  const handleRemoveTicket = (id) => {
    // Update tickets state to remove ticket from the UI
    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id),
    );

    // Update eventTickets array to remove the ticket at the same index
    // setEventTickets((prevEventTickets) =>
    //   prevEventTickets.filter((ticket) => ticket.id !== id)
    // );
  };

  const handleTicketChange = (id, field, value) => {
    // Convert specific fields to numbers if applicable
    const parsedValue = ["price", "ticketsAvailable", "plusAllowed"].includes(
      field,
    )
      ? parseFloat(value) || 0 // Use `parseFloat` to handle decimal values, or `parseInt` for integers
      : value;

    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: parsedValue } : ticket,
      ),
    );

    // // Update eventTickets array to reflect changes in the specific ticket format
    // setEventTickets((prevEventTickets) =>
    //   prevEventTickets.map((ticket, index) =>
    //     index === id - 1
    //       ? {
    //           ...ticket,
    //           [field]: parsedValue,
    //         }
    //       : ticket
    //   )
    // );
  };

  const handleSubmit = async () => {
    console.log(tickets);
    if (tickets.length === 0) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    const sanitizedTickets = tickets.map((ticket) => {
      if (eventDetails?.eventtickets?.some((t) => t.id === ticket.id)) {
        return ticket; // Keep the id for existing tickets
      } else {
        const { id, ...rest } = ticket;
        return rest; // Remove the id for new tickets
      }
    });

    try {
      let response;
      if (eventDetails) {
        console.log("data", payload);
        response = await updateEvent({
          ...payload,
          eventId: eventDetails.id,
          // recurrenceEndDate: "",
          // recurrenceEndType: "",
          ticketType,
          tickets: sanitizedTickets,
        });
      } else {
        response = await createEvent({
          ...payload,
          // recurrenceEndDate:"",
          // recurrenceEndType:"",
          ticketType,
          tickets: sanitizedTickets,
        });
      }

      //   console.log({ ...payload, ticketType, tickets: eventTickets });

      console.log("response", response);
      if (response?.error) {
        Toast.show({
          type: "error",
          text1: response?.error?.data?.message,
        });
        return;
      }
      Toast.show({
        type: "success",
        text1: response?.data?.message,
      });
      navigation.navigate("RequestSuccess", {
        title: response?.data?.message,
        message: response?.data?.message,
      });
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "An error occurred",
      });
    }
    toggleConfirmModal();
  };

  console.log("tickets", tickets);

  return (
    <>
      <PageContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={tw``}>
            <View style={tw`flex-row justify-between`}>
              <BackButton onPress={() => navigation.goBack()} />
              <Header font="semi_bold" size={16}>
                Create Event
              </Header>
              <View />
            </View>
            <View style={tw`gap-4 my-5`}>
              <View style={tw`gap-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <TextPrimary style={tw`text-center`}>About</TextPrimary>
                  <TextPrimary style={tw`text-center`}>
                    Location & Time
                  </TextPrimary>
                  <TextPrimary style={tw`text-center`}>Tickets</TextPrimary>
                </View>
                <View style={tw`bg-gray_light rounded-3xl h-[2px] w-full`}>
                  <View
                    style={[tw`bg-[#242EF2] rounded-3xl h-[2px] w-12/12`]}
                  />
                </View>
              </View>
            </View>

            <View style={tw`mt-5 pb-10`}>
              <View style={tw`gap-4`}>
                <View>
                  <TextPrimary size={13} style={tw`pb-3`}>
                    Ticket Type
                  </TextPrimary>

                  <View style={tw`flex-row gap-4`}>
                    <TicketTypeItem
                      label="Free"
                      isSelected={ticketType === "Free"}
                      onPress={() => setTicketType("Free")}
                    />
                    <TicketTypeItem
                      label="Paid"
                      isSelected={ticketType === "Paid"}
                      onPress={() => setTicketType("Paid")}
                    />
                  </View>

                  {tickets.map((ticket) => (
                    <View
                      key={ticket.id}
                      style={tw`p-4 py-6 border border-dashed border-[#2E2F36] rounded-[10px] mt-8`}
                    >
                      <View style={tw`flex-row justify-between items-center`}>
                        <TextPrimary size={13} style={tw`pb-3`}>
                          Ticket {ticket.id}
                        </TextPrimary>
                        {tickets.length > 1 && (
                          <TouchableOpacity
                            onPress={() => handleRemoveTicket(ticket.id)}
                          >
                            <AntDesign
                              name="closecircle"
                              size={20}
                              color="red"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <InputTextWithLabel
                        label="Ticket Name"
                        placeholder="Enter the ticket name"
                        value={ticket.name}
                        onChangeText={(value) =>
                          handleTicketChange(ticket.id, "name", value)
                        }
                      />
                      {ticketType === "Paid" && (
                        <>
                          <InputTextWithLabel
                            label="Price"
                            placeholder="NGN"
                            keyboardType="number-pad"
                            value={ticket.price}
                            onChangeText={(value) =>
                              handleTicketChange(ticket.id, "price", value)
                            }
                          />
                          <InputTextWithLabel
                            label="No of Plus"
                            placeholder="Enter number of extras allowed"
                            keyboardType="number-pad"
                            value={ticket.plusAllowed}
                            onChangeText={(value) =>
                              handleTicketChange(
                                ticket.id,
                                "plusAllowed",
                                value,
                              )
                            }
                          />
                        </>
                      )}
                      <InputTextWithLabel
                        label="Available Quantity"
                        placeholder="Enter number of tickets"
                        keyboardType="number-pad"
                        value={ticket.ticketsAvailable}
                        onChangeText={(value) =>
                          handleTicketChange(
                            ticket.id,
                            "ticketsAvailable",
                            value,
                          )
                        }
                      />
                    </View>
                  ))}
                </View>

                <Pressable
                  style={tw`flex-row gap-3 items-center`}
                  onPress={handleAddTicket}
                >
                  <View
                    style={tw`bg-[#3A3A3C] w-5 h-5 justify-center items-center rounded-full`}
                  >
                    <AntDesign name="plus" size={18} color="white" />
                  </View>
                  <TextPrimary
                    size={13}
                    style={tw`pt-3 pb-3 text-[#242EF2] underline`}
                  >
                    Add Ticket
                  </TextPrimary>
                </Pressable>

                <PrimaryButton
                  loading={isLoading || isUpdating}
                  style={tw`mt-5`}
                  onPress={toggleConfirmModal}
                >
                  {eventDetails ? "Update Event" : "Create Event"}
                </PrimaryButton>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomModals
          open={showConfirmModal}
          handleClose={toggleConfirmModal}
          snapPoints={["50"]}
        >
          <View style={tw`gap-5 mt-10 flex-1`}>
            <View>
              <TextPrimary size={15} style={tw`text-center leading-6`}>
                ⚠️ Please note that event cannot be edited after submission. Do
                you confirm that all the provided information is accurate?
              </TextPrimary>
            </View>
            <View style={tw`gap-5 mt-5`}>
              <PrimaryButton
                onPress={handleSubmit}
                color="#F74D1B"
                style={tw`border border-[#FFFFFF]`}
                disabled={isLoading || isUpdating}
                loading={isLoading || isUpdating}
              >
                Proceed
              </PrimaryButton>
              <PrimaryButton
                onPress={toggleConfirmModal}
                color=""
                style={tw`border border-[#606060]`}
              >
                Cancel
              </PrimaryButton>
            </View>
          </View>
        </BottomModals>
      </PageContainer>
    </>
  );
};

export default CreateEvent3;

const styles = StyleSheet.create({});
