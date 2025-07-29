import { api } from "../api";

const verificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizationVerificationRequest: builder.query<
      ResponseType,
      Record<string, any>
    >({
      query: (filterParams) => {
        const params = new URLSearchParams(filterParams).toString();
        return `/verifications/organization/verification/requests?${params}`;
      },
      providesTags: (result, error, filterParams) => [
        {
          type: "OrganizationVerificationRequest",
          id: JSON.stringify(filterParams),
        },
      ],
    }),
    getIndividualVerificationRequest: builder.query<
      ResponseType,
      Record<string, any>
    >({
      query: (filterParams) => {
        const params = new URLSearchParams(filterParams).toString();
        return `/verifications/individual/verification/requests?${params}`;
      },
      providesTags: (result, error, filterParams) => [
        {
          type: "IndividualVerificationRequest",
          id: JSON.stringify(filterParams),
        },
      ],
    }),
  
    // getEventCategory: builder.query<void, void>({
    //   query: () => "/events/event/categories",
    //   providesTags: ["EventCategory"],
    // }),
    getEventVerifiers: builder.query<void, void>({
      query: (eventId) =>
        `/verifications/verification/request/by/event?eventId=${eventId}`,
      providesTags: (eventId: any) => [{ type: "EventVerifiers", eventId }],
    }),
    createVerification: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/verifications/create/verification/request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["OrganizationVerificationRequest"],
    }),
    sendVerificationRequest: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/events/event/verification/request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Event"],
    }),
    passTicket: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/verifications/scan/event/request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["EventTickets"],
    }),
    updateVerificationStatus: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/verifications/verification/requests/update/status",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["OrganizationVerificationRequest", "IndividualVerificationRequest"],
    }),
    deleteVerificationRequest: builder.mutation<void, { requestId: string }>({
      query: ({ requestId }) => ({
        url: `/verifications/delete/verification/request`,
        method: "DELETE",
        params: { requestId },
      }),
      invalidatesTags: ["OrganizationVerificationRequest"], // Invalidate the cache if needed
    }),
  }),
});

export const {
  useGetOrganizationVerificationRequestQuery,
  useGetIndividualVerificationRequestQuery,
  useGetEventVerifiersQuery,
  useCreateVerificationMutation,
  useDeleteVerificationRequestMutation,
  useUpdateVerificationStatusMutation,
  useSendVerificationRequestMutation,
  usePassTicketMutation
} = verificationApi;
