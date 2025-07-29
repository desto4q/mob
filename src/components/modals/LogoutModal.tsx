import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import { useRef } from "react";
import tw from "../../lib/tailwind";
import { useAppSelector } from "../../state/hooks";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function LogoutModal() {
  const { colorScheme } = useColorScheme();
  // const { isLoggedIn, role } = useAppSelector((state) => state.user);
  // if (!isLoggedIn) return null;
  //
  // const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChanges = () => {};
  const { ref: bottomSheetRef } = useBottomSheetRef();
  return (
    <View>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={[500, 500]}
          index={1}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export let useBottomSheetRef = () => {
  let ref = useRef<BottomSheet>(null);
  let open = () => ref.current?.expand();
  let close = () => ref.current?.close();
  return { ref, open, close };
};
