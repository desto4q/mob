import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import tw from "../../lib/tailwind";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CenterModalProps {
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  style?: any;
  containerStyle?: any;
}

const CenterModal: FC<CenterModalProps> = ({
  children,
  open,
  handleClose,
  style,
  containerStyle,
}) => {
  const { mode: colorScheme } = useSelector((state: RootState) => state.user);
  return (
    <Modal
      style={[styles.modalContainer, containerStyle]}
      onSwipeComplete={handleClose}
      swipeDirection={["down"]}
      isVisible={open}
    >
      <View>
        <View
          style={[
            styles.modalContent,
            tw`bg-white dark:bg-[#2E2F36] relative`,
            style,
          ]}
        >
          <AntDesign
            onPress={handleClose}
            name="close"
            size={24}
            style={tw`absolute top-4 left-4 text-black dark:text-white`}
          />

          <View style={tw`mt-8`}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    borderRadius: 30,
    minHeight: 180,
  },
});

export default CenterModal;
