import { api } from "../api";

const eventApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEventsPublic: builder.query<void, void>({
      query: () => "/events/get/events",
      providesTags: ["EventPublic"],
    }),
    getEvents: builder.query<void, void>({
      query: () => "/events/events",
      providesTags: ["Event"],
    }),
    getEventCategory: builder.query<void, void>({
      query: () => "/events/event/categories",
      providesTags: ["EventCategory"],
    }),
    getSingleEvent: builder.query<void, void>({
      query: (eventId) => `/events/event/details?id=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventDetails", eventId }],
    }),
    getSingleEventPublic: builder.query<void, void>({
      query: (eventId) => `/events/view/event?id=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventDetails", eventId }],
    }),
    getReceivedPending: builder.query<void, void>({
      query: () => `/events/event/inviters`,
      providesTags: ["RecievedPending"],
    }),
    getSentInvitation: builder.query<void, void>({
      query: (eventId) => `/events/event/invitees?eventId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "SentInvitation", eventId }],
      // providesTags: ["SentInvitation"],
    }),
    getEventLogs: builder.query<void, void>({
      query: (eventId) => `/events/event/logs?eventId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventLogs", eventId }],
    }),
    
    
    createEvent: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/event/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    updateEvent: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/event/update",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { data }) => [
        { type: "EventDetails", eventId: data?.eventId },
        "Event",
      ],
    }),
    claimEventTicket: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/claim/request/ticket",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    setEventInvitation: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/send/invitation",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    respondToInvitation: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/invitation/respond",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["RecievedPending"],
    }),
    getEventTicketRequest: builder.query<void, void>({
      query: (eventId ) => `/events/event/ticket-requests?eventId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventTicketRequest", eventId }],
    }),
    ticketRequestAction: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/event/ticket/request/status",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["EventTicketRequest"],
    }),
    getEventTickets: builder.query<void, void>({
      query: () => `/events/my/tickets`,
      providesTags: ["EventTickets"],
    }),
    getSingleEventTickets: builder.query<void, {eventId:string}>({
      query: (eventId) => `/events/my/tickets?eventId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventTicketsDetails", eventId }],
    }),
    // getEventRequest: builder.mutation<void, { eventId: string }>({
    //   query: ({ eventId }) => ({
    //     url: `/events/view/event/request?eventRequestId=${eventId}`,
    //     method: "GET", // If it's a GET request
    //     params: { eventId }, // Send the templateId as a query parameter
    //   }),
    //   invalidatesTags: ["EventRequest"], // Invalidate the cache if needed
    // }),
    getEventRequest: builder.query<void, {eventId:string}>({
      query: (eventId) => `/events/view/event/request?eventRequestId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventRequest", eventId }],
    }),
    deleteEvent: builder.mutation<void, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `/events/event/delete`,
        method: "DELETE", 
        params: { eventId }, 
      }),
      invalidatesTags: ["Event"], // Invalidate the cache if needed
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useGetSingleEventPublicQuery,
  useCreateEventMutation,
  useGetEventCategoryQuery,
  useGetEventLogsQuery,
  useDeleteEventMutation,
  useGetEventsPublicQuery,
  useClaimEventTicketMutation,
  useSetEventInvitationMutation,
  useGetReceivedPendingQuery,
  useGetSentInvitationQuery,
  useRespondToInvitationMutation,
  useGetEventTicketRequestQuery,
  useGetEventTicketsQuery,
  useGetSingleEventTicketsQuery,
  useTicketRequestActionMutation,
  useUpdateEventMutation,
  useGetEventRequestQuery,

} = eventApi;
