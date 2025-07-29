import { api } from "../api";

const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<void, void>({
      query: () => "/memberships-subscriptions/subscription/plans",
      providesTags: ["Subscription"],
    }),
    getOrgSubById: builder.query<void, {eventId:string}>({
      query: (orgId) => `/memberships-subscriptions/organization/subscription/plans?organizationId=${orgId}`,
      providesTags: (orgId: any) => [{ type: "OrgPlan", orgId }],
    }),
    getIndGateWay: builder.query<void, {eventId:string}>({
      query: (orgId) => `/memberships-subscriptions/organization/payment-gateway?organizationId=${orgId}`,
      providesTags: (orgId: any) => [{ type: "IndGateway", orgId }],
    }),
    subscribeToOrganization: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/subscribe",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["OrgPlan"],
    }),
    createSubscription: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/subscription/plan/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Subscription"],
    }),
    updateSubscription: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/subscription/plan/update",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Subscription"],
    }),
    deleteSubscription: builder.mutation<any, any>({
      query: (data) => {
        console.log('Data being sent to API:', data); // Log the data here
        return {
          url: `memberships-subscriptions/subscription/plan/delete?planId=${data.planId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useGetOrgSubByIdQuery,
  useGetIndGateWayQuery,
  useSubscribeToOrganizationMutation
} = subscriptionApi;
