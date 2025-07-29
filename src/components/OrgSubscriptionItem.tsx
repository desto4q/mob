// import {
//   ActivityIndicator,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React from "react";
// import tw from "../lib/tailwind";
// import TextPrimary from "./texts/text";
// import { useDeleteSubscriptionMutation } from "../state/features/services/subscription/subscription";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import Toast from "react-native-toast-message";
// import { Swipeable } from "react-native-gesture-handler";
// import { useNavigation } from "@react-navigation/native";

// const OrgSubscriptionItem = ({ item }) => {
//   const navigation = useNavigation();
//   const [deleteSub, { isLoading: isDeleting }] =
//     useDeleteSubscriptionMutation();

//   const handleDelete = async () => {
//     try {
//       const result: any = await deleteSub({
//         planId: item.id,
//       });
//       if (result?.error) {
//         console.log("result error", result?.error);
//         return Toast.show({
//           type: "error",
//           text1: result?.error?.data?.message,
//         });
//       }
//       Toast.show({
//         type: "success",
//         text1: result?.data?.message,
//       });
//       // Call delete API or remove from state
//     } catch (error) {
//       console.error("Error deleting lesson:", error);
//     }
//   };

//   const renderRightActions = () => (
//     <View style={styles.actionsContainer}>
//       {/* Edit Button */}
//       <Pressable
//         style={[styles.actionButton, tw` bg-blue`]}
//         onPress={() => navigation.navigate("AddSubscriptionPlan", { item })}
//       >
//         <MaterialCommunityIcons name="pencil" size={20} color="white" />
//         <Text style={styles.actionText}>Edit</Text>
//       </Pressable>
//       {/* Delete Button */}
//       <>
//         {isDeleting ? (
//           <ActivityIndicator size="small" color="#6200EE" />
//         ) : (
//           <Pressable
//             style={[styles.actionButton, tw`bg-red-500`]}
//             onPress={handleDelete}
//           >
//             <MaterialCommunityIcons name="trash-can" size={20} color="white" />
//             <Text style={styles.actionText}>Delete</Text>
//           </Pressable>
//         )}
//       </>
//     </View>
//   );

//   return (
//     <Swipeable renderRightActions={renderRightActions}>
//       <View
//         style={tw`dark:bg-gray_dark gap-3 bg-light p-4 rounded-[10px] relative min-h-[100px]`} // Added relative and min-h
//       >
//         {isDeleting ? (
//           <View
//             style={tw`absolute inset-0 flex-row items-center justify-center`}
//           >
//             <ActivityIndicator size="large" color="#6200EE" />
//           </View>
//         ) : (
//           <>
//             <TextPrimary font="medium" size={14} style={tw` uppercase`}>
//               {item?.name}
//             </TextPrimary>
//             <TextPrimary
//               size={11}
//               lineHeight={13.3}
//               style={tw`text-gray_light`}
//             >
//               {item?.description}
//             </TextPrimary>
//             <View style={tw`flex-row items-center justify-between`}>
//               <TextPrimary size={14} font="medium">
//                 {item?.validity} Month
//               </TextPrimary>
//               <TextPrimary size={14}>N{item?.price}</TextPrimary>
//             </View>
//           </>
//         )}
//       </View>
//     </Swipeable>
//   );
// };

// export default OrgSubscriptionItem;

// const styles = StyleSheet.create({
//   actionsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   actionButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 70,
//     height: "100%",
//   },
//   actionText: {
//     color: "white",
//     fontSize: 12,
//     marginTop: 4,
//   },
// });

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import tw from "../lib/tailwind";
import TextPrimary from "./texts/text";
import { useDeleteSubscriptionMutation } from "../state/features/services/subscription/subscription";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Toast from "react-native-toast-message";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BaseText from "./BaseText";

const OrgSubscriptionItem = ({ item }) => {
  const navigation = useNavigation();
  const [deleteSub, { isLoading: isDeleting }] =
    useDeleteSubscriptionMutation();

  const handleDelete = async () => {
    try {
      const result: any = await deleteSub({
        planId: item.id,
      });
      if (result?.error) {
        console.log("result error", result?.error);
        return Toast.show({
          type: "error",
          text1: result?.error?.data?.message,
          visibilityTime: 1000, // Reduced duration
        });
      }
      Toast.show({
        type: "success",
        text1: result?.data?.message,
        visibilityTime: 1000, // Reduced duration
      });
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      {/* Edit Button */}
      <Pressable
        style={[styles.actionButton, styles.editButton]}
        onPress={() => navigation.navigate("AddSubscriptionPlan", { item })}
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      >
        <View style={styles.actionIconContainer}>
          <MaterialCommunityIcons name="pencil" size={20} color="white" />
        </View>
        <BaseText style={styles.actionText}>Edit</BaseText>
      </Pressable>

      {/* Delete Button */}
      <Pressable
        style={[styles.actionButton, styles.deleteButton]}
        onPress={handleDelete}
        disabled={isDeleting}
        android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
      >
        <View style={styles.actionIconContainer}>
          {isDeleting ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <MaterialCommunityIcons name="trash-can" size={20} color="white" />
          )}
        </View>
        <BaseText
          style={[styles.actionText, isDeleting && styles.disabledText]}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </BaseText>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <Swipeable renderRightActions={renderRightActions}>
        <View
          style={[
            styles.card,
            tw`dark:bg-gray_dark bg-white  border border-gray/5`,
            // isDeleting && styles.cardDeleting,
          ]}
        >
          {/* Material Design 3 State Layer for Loading */}
          {isDeleting && (
            <View style={styles.loadingOverlay}>
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6750A4" />
                <BaseText style={styles.loadingText}>
                  Deleting subscription...
                </BaseText>
              </View>
            </View>
          )}

          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.planBadge}>
              <MaterialCommunityIcons
                name="crown"
                size={16}
                color="#6750A4"
                style={styles.crownIcon}
              />
              <BaseText style={[styles.planName, tw`text-black`]}>
                {item?.name?.toUpperCase()}
              </BaseText>
            </View>
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            <BaseText
            // lineHeight={18}
            // style={[styles.description, tw`text-gray-600 dark:text-gray-300`]}
            >
              {item?.description}
            </BaseText>
          </View>

          {/* Footer Section with Enhanced Layout */}
          <View style={styles.footerSection}>
            <View style={styles.validityContainer}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={16}
                color="#6750A4"
              />
              <BaseText size={14} font="medium" style={tw`text-black`}>
                {" "}
                {item?.validity} {item?.validity === 1 ? "Month" : "Months"}
              </BaseText>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextPrimary
                size={18}
                font="bold"
                style={[styles.price, tw`text-green-600 dark:text-green-400`]}
              >
                {item?.price?.toLocaleString()}
              </TextPrimary>
            </View>
          </View>

          {/* Material Design 3 Divider */}
          <View style={[styles.divider, tw`bg-gray-200 dark:bg-gray-700`]} />
        </View>
      </Swipeable>
    </View>
  );
};

export default OrgSubscriptionItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    marginHorizontal: 0,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    minHeight: 120,
    elevation: 3,
    position: "relative",
    overflow: "hidden",
  },
  cardDeleting: {
    opacity: 0.7,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 16,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6750A4",
    fontWeight: "500",
  },
  headerSection: {
    marginBottom: 12,
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F0FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  crownIcon: {
    marginRight: 6,
  },
  planName: {
    letterSpacing: 0.5,
  },
  contentSection: {
    marginBottom: 16,
  },
  description: {
    lineHeight: 20,
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  validityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  validityText: {
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currencySymbol: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D0F",
    marginRight: 2,
  },
  price: {
    letterSpacing: -0.5,
  },
  divider: {
    height: 1,
    width: "100%",
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "transparent",
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  editButton: {
    backgroundColor: "#6750A4",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  deleteButton: {
    backgroundColor: "#DC362E",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  actionText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  disabledText: {
    opacity: 0.7,
  },
});
