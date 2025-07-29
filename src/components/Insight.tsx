import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import { useQuery } from "@tanstack/react-query";
import { newApi } from "../state/newStates/flow";
import BaseText from "./BaseText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "../utils/constants";
import { useGetEventsQuery } from "../state/features/services/events/events";
import { useGetSubscriptionQuery } from "../state/features/services/subscription/subscription";
type EventsResponse = {
  code: number;
  data: any[];
  message: string;
};
type MemberResponse = {
  code: number;
  data: {
    createdAt: string; // ISO date string
    dateJoined: string;
    designation: string;
    id: number;
    individual: any; // Replace 'any' with actual structure if available
    individualId: string;
    leftAt: string | null;
    leftReason: string | null;
    memberId: string;
    organizationEmail: string;
    organizationId: string;
    requestedBy: string;
    status: "active" | "inactive" | string;
    updatedAt: string;
  }[];
  insights?: {
    totalSubscriptions?: number;
    upcomingEvents?: number;
    // Add other insight properties if known
    [key: string]: any; // Allow for other unknown properties
  } | null;
};

const Insight = () => {
  const events_query = useGetEventsQuery<EventsResponse>();
  const subs = useGetSubscriptionQuery();
  useEffect(() => {
    console.log(JSON.stringify(subs.data), "subs");
  }, [subs.isFetching]);
  const insights_query = useQuery<MemberResponse>({
    queryKey: ["insight"],
    queryFn: async () => {
      let response = await newApi.get(
        "/api/memberships-subscriptions/organization/membership",
      );

      return response.data;
    },
  });
  useEffect(() => {
    console.log(insights_query.isFetching);
  }, [insights_query.isFetching]);
  if (insights_query.error) {
    return (
      <View
        style={[
          styles.container,
          styles.errorContainer,
          tw`dark:bg-slate-900 bg-white`,
        ]}
      >
        <MaterialCommunityIcons name="alert-circle" size={24} color="#DC362E" />
        <BaseText style={styles.errorText}>Failed to load insights</BaseText>
      </View>
    );
  }

  if (insights_query.isFetching) {
    return (
      <View
        style={[
          styles.container,
          styles.loadingContainer,
          tw`dark:bg-slate-900 bg-white`,
        ]}
      >
        <ActivityIndicator size="large" color="#6750A4" />
        <TextPrimary
          size={14}
          style={[styles.loadingText, tw`text-gray-600 dark:text-gray-400`]}
        >
          Loading insights...
        </TextPrimary>
      </View>
    );
  }

  const totalMembers = insights_query.data?.data?.length || 0;
  const activeMembers =
    insights_query.data?.data?.filter((member) => member.status === "active")
      .length || 0;
  const totalSubscriptions = subs.data?.data?.length || 0;
  const upcomingEvents = events_query.data?.data?.length || 0;

  return (
    <View style={[styles.container, tw`dark:bg-[${colors.dark}] bg-white`]}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="chart-box"
            size={24}
            color="#6750A4"
            style={styles.headerIcon}
          />
          <TextPrimary
            size={20}
            font="montserrat_medium"
            style={[styles.title, tw`text-gray-900 dark:text-gray-100`]}
          >
            Organization Insights
          </TextPrimary>
        </View>
        <View
          style={[styles.headerDivider, tw`bg-gray-200 dark:bg-gray-700`]}
        />
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricsRow}>
          <MetricCard
            icon="account-group"
            label="Total Members"
            value={totalMembers}
            color="#6750A4"
            backgroundColor="#F3F0FF"
            trend={null}
          />
          <MetricCard
            icon="account-check"
            label="Active Members"
            value={activeMembers}
            color="#2E7D0F"
            backgroundColor="#E8F5E8"
            trend={
              totalMembers > 0
                ? Math.round((activeMembers / totalMembers) * 100)
                : 0
            }
            trendSuffix="%"
          />
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            icon="credit-card-outline"
            label="Subscriptions"
            value={totalSubscriptions}
            color="#D97706"
            backgroundColor="#FEF3C7"
            trend={null}
          />
          <MetricCard
            icon="calendar-clock"
            label="Upcoming Events"
            value={upcomingEvents}
            color="#DC2626"
            backgroundColor="#FEE2E2"
            trend={null}
          />
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.summarySection}>
        <View style={[styles.summaryCard, tw`dark:bg-gray-800 bg-gray-50`]}>
          <MaterialCommunityIcons
            name="information"
            size={16}
            color="#6750A4"
          />
          <TextPrimary
            size={12}
            style={[styles.summaryText, tw`text-gray-600 dark:text-gray-400`]}
          >
            {activeMembers > 0
              ? `${Math.round((activeMembers / totalMembers) * 100)}% of members are currently active`
              : "No active members found"}
          </TextPrimary>
        </View>
      </View>
    </View>
  );
};

const MetricCard = ({
  icon,
  label,
  value,
  color,
  backgroundColor,
  trend,
  trendSuffix = "",
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
  backgroundColor: string;
  trend?: number | null;
  trendSuffix?: string;
}) => (
  <View
    style={[styles.metricCard, tw`dark:bg-[${colors.dark}] shadow-xl bg-white`]}
  >
    {/* Icon Container */}
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <MaterialCommunityIcons name={icon as any} size={20} color={color} />
    </View>

    {/* Content */}
    <View style={styles.metricContent}>
      <TextPrimary
        size={12}
        style={[styles.metricLabel, tw`text-gray-600 dark:text-gray-400`]}
      >
        {label}
      </TextPrimary>

      <View style={styles.valueContainer}>
        <TextPrimary
          size={24}
          font="bold"
          style={[styles.metricValue, { color }, tw`dark:text-gray-100`]}
        >
          {value.toLocaleString()}
        </TextPrimary>

        {trend !== null && (
          <View style={[styles.trendBadge, { backgroundColor: `${color}20` }]}>
            <TextPrimary
              size={10}
              font="medium"
              style={[styles.trendText, { color }]}
            >
              {trend}
              {trendSuffix}
            </TextPrimary>
          </View>
        )}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  // Error & Loading States
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  errorText: {
    marginLeft: 8,
    color: "#DC362E",
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  loadingText: {
    marginTop: 12,
  },

  // Header Section
  headerSection: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    flex: 1,
    letterSpacing: 0.15,
  },
  headerDivider: {
    height: 1,
    width: "100%",
  },

  // Metrics Grid
  metricsGrid: {
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },

  // Metric Card
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricValue: {
    lineHeight: 28,
    letterSpacing: -0.5,
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trendText: {
    fontWeight: "600",
  },

  // Summary Section
  summarySection: {
    marginTop: 8,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  summaryText: {
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
});

export default Insight;
