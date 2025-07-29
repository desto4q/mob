import React, { useRef, useMemo, useCallback } from "react";
import { View } from "react-native";
import BottomSheet, {  BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import tw from "../../lib/tailwind";


interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: Array<string | number>;
}

const ReusableBottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  snapPoints = ["25%", "50%", "90%"], // Default snap points
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
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
    []
  );

  const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  if (!isVisible) return null;

  return (
    
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={memoizedSnapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackDrop}
        onClose={onClose}
        style={tw`flex-1 `}
        backgroundStyle={tw`dark:bg-gray_dark`}
      >
        <View style={tw`flex-1 p-4 rounded-t-xl`}>{children}</View>
      </BottomSheet>
  
  );
};

export default ReusableBottomSheet;
