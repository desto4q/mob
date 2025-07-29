import { api } from "../api";

const cardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCardTemplates: builder.query<void, void>({
      query: () => "/idcards/templates",
      providesTags: ["OrganizationCard"],
    }),
    getOrganizationMemberCards: builder.query<void, string>({
      query: (queryParam) =>
        `/idcards/organization/fetch/member/cards?filter=${queryParam}`,
      providesTags: ["OrganizationMemberCards"],
    }),
    getIndividualOrganizationDefaultCard: builder.query<void, string>({
      query: (id) => `/idcards/get/default/template?organizationId=${id}`,
      providesTags: (id: any) => [{ type: "DefaultCard", id }],
    }),
    getIndividualCards: builder.query<void, string>({
      query: (queryParam) => `/idcards/fetch/cards?filter=${queryParam}`,
      providesTags: ["IndividualCards"],
    }),
    getPersonalCards: builder.query<void, void>({
      query: () => `/idcards/personal/cards`,
      providesTags: ["PersonalCards"],
    }),
    getPersonalCardDetails: builder.query<void, { cardId: string }>({
      query: (cardId) => `/idcards/personal/card?id=${cardId}`,
      providesTags: (cardId: any) => [{ type: "PersonalCardDetails", cardId }],
    }),

    setCardAsDefault: builder.mutation<void, { templateId: string }>({
      query: ({ templateId }) => ({
        url: `/idcards/template/default`,
        method: "GET", // If it's a GET request
        params: { templateId }, // Send the templateId as a query parameter
      }),
      invalidatesTags: ["OrganizationCard"], // Invalidate the cache if needed
    }),
    createIdCard: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/idcards/template",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["OrganizationCard"],
    }),
    updateIdCard: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/idcards/template",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["OrganizationCard"],
    }),
    deleteIdCard: builder.mutation<void, { templateId: string }>({
      query: ({ templateId }) => ({
        url: `/idcards/template`,
        method: "DELETE", // If it's a GET request
        params: { templateId }, // Send the templateId as a query parameter
      }),
      invalidatesTags: ["OrganizationCard"], // Invalidate the cache if needed
    }),
    createMemberIdCard: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/idcards/organization/create/member/card",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["OrganizationCard"],
    }),
    createIndividualIdCard: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/idcards/personal/cards",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["PersonalCards"],
    }),
    updateIndividualIdCard: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/idcards/personal/cards",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { data }) => [
        { type: "PersonalCardDetails", id: data?.id },
        "PersonalCards",
      ],
    }),
    deleteIndividualIdCard: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/idcards/personal/cards`,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["PersonalCards"],
    }),
    updateMemberCardDetails: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/idcards/organization/update/member/card",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (result, error, { cardId }) => [
        { type: "MemberCardDetails", id: cardId },
        "OrganizationMemberCards",
        "OrganizationCard",
        "OrganizationMemberCards",
      ],
    }),
    revokeMemberCard: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/idcards/organization/change/card/status",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, { cardId }) => [
        { type: "MemberCardDetails", id: cardId },
        "OrganizationMemberCards",
        "OrganizationCard",
        "OrganizationMemberCards",
      ],
    }),
    viewMemberCardDetails: builder.query<void, void>({
      query: (id) => `/idcards/view/card?cardId=${id}`,
      providesTags: (id: any) => [{ type: "MemberCardDetails", id }],
    }),
    viewIndividualCardDetails: builder.query<void, void>({
      query: (id) => `/idcards/individual/view/card?cardId=${id}`,
      providesTags: (id: any) => [{ type: "IndividualCardDetails", id }],
    }),
  }),
});

export const {
  useGetCardTemplatesQuery,
  useUpdateIdCardMutation,
  useCreateIdCardMutation,
  useCreateMemberIdCardMutation,
  useSetCardAsDefaultMutation,
  useViewMemberCardDetailsQuery,
  useUpdateMemberCardDetailsMutation,
  useGetOrganizationMemberCardsQuery,
  useRevokeMemberCardMutation,
  useDeleteIdCardMutation,
  useGetIndividualCardsQuery,
  useViewIndividualCardDetailsQuery,
  useGetIndividualOrganizationDefaultCardQuery,
  useCreateIndividualIdCardMutation,
  useGetPersonalCardsQuery,
  useGetPersonalCardDetailsQuery,
  useDeleteIndividualIdCardMutation,
  useUpdateIndividualIdCardMutation,
} = cardApi;
