import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export const OffLine = () => {
  const insets = useSafeAreaInsets();
  const { isConnected, isInternetReachable } = useNetInfo();

  return (
    <>
      {isConnected || isInternetReachable ? (
        <></>
      ) : (
        <View style={[styles.offlineContainer, { top: insets.top }]}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    zIndex: 10,
    position: "absolute",
  },
  offlineText: {
    color: "#fff",
  },
});
