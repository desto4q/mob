import { api } from "../api";

const membershipApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserMembership: builder.query<void, string>({
      query: (queryParam) =>
        `/memberships-subscriptions/individual/membership?filter=${queryParam}`,
      providesTags: ["Membership"],
    }),
    getUserOrganizationMembership: builder.query<void, string>({
      query: (queryParam) =>
        `/memberships-subscriptions/organization/membership?filter=${queryParam}`,
      providesTags: ["Org_Membership"],
    }),
    getAllOrganizations: builder.query<void, void>({
      query: () => "/users/all/organizations",
      providesTags: ["Organization"],
    }),
    joinOrganization: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/join/organization",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Organization", "Membership", "Org_Membership"],
    }),
    inviteMember: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/send/membership/request",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Organization", "Membership", "Org_Membership"],
    }),
    deleteMemberInvite: builder.mutation<any, {requestId: string}>({
      query: ({requestId}) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: `/memberships-subscriptions/organization/membership/pending/delete`,
          method: "DELETE",
          params: {requestId},
        };
      },
      invalidatesTags: ["Organization", "Membership", "Org_Membership"],
    }),
    requestAction: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/organization/update/membership/status",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Org_Membership", "Membership"],
    }),
    individualRequestAction: builder.mutation<any, any>({
      query: (data) => {
        // console.log('Data being sent to API:', data); // Log the data here
        return {
          url: "/memberships-subscriptions/individual/update/membership/status",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Membership", "Org_Membership"],
    }),
    getOrganization: builder.query<void, void>({
      query: (id) =>
        `memberships-subscriptions/organization/designations?organizationId=${id}`,
      providesTags: (id: any) => [{ type: "id", id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserMembershipQuery,
  useGetUserOrganizationMembershipQuery,
  useIndividualRequestActionMutation,
  useInviteMemberMutation,
  useGetAllOrganizationsQuery,
  useRequestActionMutation,
  useJoinOrganizationMutation,
  useGetOrganizationQuery,
  useDeleteMemberInviteMutation,
} = membershipApi;
