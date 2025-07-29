import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../config/url";
import { RootState } from "../../store";
import { navigate, navigationRef } from "../../../navigation/navigationRef";
import { Alert } from "react-native";
import { setLogout } from "../slices/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: async (headers, { getState }) => {
    console.warn(BaseUrl);
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    Alert.alert("Session Expired", "Your session has expired. Please log in again.");
    api.dispatch(setLogout());
    setTimeout(() => {
      if (navigationRef.isReady()) {
        navigate("SignIn");
      }
    }, 500);
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  refetchOnFocus: true,
  keepUnusedDataFor: 60 * 5, //5 minutes state time
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Membership",
    "Org_Membership",
    "Organization",
    "Subscription",
    "Event",
    "id",
    "OrgDoc",
    "IndDoc",
    "OrganizationCard",
    "MemberCardDetails",
    "OrganizationMemberCards",
    "IndividualCards",
    "IndividualCardDetails",
    "DefaultCard",
    "EventDetails",
    "EventCategory",
    "OrganizationVerificationRequest",
    "EventVerifiers",
    "IndividualVerificationRequest",
    "EventPublic",
    "RecievedPending",
    "SentInvitation",
    "EventLogs",
    "EventTicketRequest",
    "EventTickets",
    "EventTicketsDetails",
    "PersonalCards",
    "PersonalCardDetails",
    "AllSubscription",
    "AllIndSubscription",
    "Notification",
    "SingleNotification",
    "PaymentGateway",
    "SingleSubscription",
    "BankList",
    "EventRequest",
    "Faqs",
    "MemberOrg",
    "OrgPlan",
    "IndGateway",
    "Support"
  ],
  endpoints: () => ({}),
});
