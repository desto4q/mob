import { api } from "../api";
// import { IUser, TransactionResponse, UserUpdateParam } from "./types";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<void, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    uploadProfilePicture: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/profile/photo/upload",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePersonalData: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/profile/update/individual",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePersonalDataOrg: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/profile/update/organization",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/profile/update/password",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadOrganizationDoc: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/business-document",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User", "OrgDoc"],
    }),
    uploadIndividualDoc: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/upload/verified/IDCard",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["OrgDoc", "User"],
    }),
    orgGeneralsubscribe: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/organization/subscribe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllSubscription", "User", "SingleSubscription"],
    }),
    getOrganizationSubDetails: builder.query<void, {SubId:string}>({
      query: (SubId) => `/users/organization/subscription/plan?id=${SubId}`,
      providesTags: (SubId: any) => [{ type: "SingleSubscription", SubId }, "AllSubscription"],
    }),
    getIndividualSubDetails: builder.query<void, {SubId:string}>({
      query: (SubId) => `/users/individual/subscription/plan?id=${SubId}`,
      providesTags: (SubId: any) => [{ type: "SingleSubscription", SubId }, "AllIndSubscription"],
    }),
    indGeneralsubscribe: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/individual/subscribe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllIndSubscription", "User", "SingleSubscription"],
    }),
    getOrgDoc: builder.query<void, void>({
      query: () => "/users/get/business-document",
      providesTags: ["OrgDoc"],
    }),
    getIndDoc: builder.query<void, void>({
      query: () => "/users/upload/verified/IDCard",
      providesTags: ["IndDoc"],
    }),
    getAllSubscriptionPlans: builder.query<void, void>({
      query: () => "/users/organization/subscription/plans",
      providesTags: ["AllSubscription"],
    }),
    getAllIndSubscriptionPlans: builder.query<void, void>({
      query: () => "/users/individual/subscription/plans",
      providesTags: ["AllIndSubscription"],
    }),
    getNotifications: builder.query<void, void>({
      query: () => "/users/get/notifications",
      providesTags: ["Notification"],
    }),
    getSingleNotification: builder.query<void, {notificationId:string}>({
      query: (notificationId) => `/users/view/notification?id=${notificationId}`,
      providesTags: (notificationId: any) => [{ type: "SingleNotification", notificationId }],
    }),
    getPaymentGateway: builder.query<void, void>({
      query: () => `/users/fetch/subscription/payment/gateway`,
      providesTags: ["PaymentGateway"],
    }),
    listBank: builder.query<void, void>({
      query: () => `https://api.paystack.co/bank`,
      providesTags: ["BankList"],
    }),
    createIndSubAccount: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/create/individual/subaccount",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllIndSubscription", "User", "SingleSubscription"],
    }),
    createOrgSubAccount: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/users/create/subaccount",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllIndSubscription", "User", "SingleSubscription"],
    }),
    markNotification: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/users/notification/read?id=${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Notification"],
    }),
    submitContactUs: builder.mutation<any, any>({
      query: (data) => {
        console.log("Data being sent to API:", data); // Log the data here
        return {
          url: "/admins/public/submit/contact-us",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["User"],
    }),
    getFaqs: builder.query<void, void>({
      query: () => `/admins/public/faq-categories`,
      providesTags: ["Faqs"],
    }),
    getSupportContacts: builder.query<void, void>({
      query: () => `/admins/public/support-contacts`,
      providesTags: ["Support"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserQuery,
  useGetOrgDocQuery,
  useGetIndDocQuery,
  useUploadProfilePictureMutation,
  useUpdatePersonalDataMutation,
  useUpdatePersonalDataOrgMutation,
  useUpdatePasswordMutation,
  useUploadOrganizationDocMutation,
  useUploadIndividualDocMutation,
  useGetAllSubscriptionPlansQuery,
  useOrgGeneralsubscribeMutation,
  useGetAllIndSubscriptionPlansQuery,
  useIndGeneralsubscribeMutation,
  useGetNotificationsQuery,
  useGetSingleNotificationQuery,
  useMarkNotificationMutation,
  useGetPaymentGatewayQuery,
  useGetOrganizationSubDetailsQuery,
  useGetIndividualSubDetailsQuery,
  useListBankQuery,
  useCreateIndSubAccountMutation,
  useCreateOrgSubAccountMutation,
  useSubmitContactUsMutation,
  useGetFaqsQuery,
  useGetSupportContactsQuery,
} = userApi;
