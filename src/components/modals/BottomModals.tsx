import React, { FC, useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import tw from "../../lib/tailwind";

interface BottomModalsProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  style?: any;
  snapPoints?: Array<string | number>;
}

const BottomModals: FC<BottomModalsProps> = ({
  children,
  open,
  handleClose,
  style,
  snapPoints = ["25%", "50%", "90%"],
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      handleClose();
    }
  };
  const renderBackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props} // Pass required props like animatedIndex and animatedPosition
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
  if (!open) return null;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={memoizedSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackDrop}
      onClose={handleClose}
      style={tw`flex-1 `}
      backgroundStyle={tw`dark:bg-gray_dark`}
    >
      <View style={tw`flex-1 p-4 rounded-t-xl`}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: "55%", // Half of the screen height
  },
});

export default BottomModals;
