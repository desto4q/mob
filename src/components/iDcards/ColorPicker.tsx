import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";

const colors = [
  "#000000",
  "#fff",
  "#6D28D9",
  "#E9D5FF",
  "#FFAB01",
  "#FF4015",
  "#FE6250",
  "#1F9433",
];

interface ColorPickerProps {
  label?: string;
  color: string;
  onColorSelect: (color: string) => void;
  openPicker: () => void;
}

export const ColorPickerComponent = ({
  onColorSelect,
  label,
  color,
  openPicker,
}: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(color ?? colors[0]);

  // 🟡 Sync state when prop changes
  useEffect(() => {
    setSelectedColor(color ?? colors[0]);
  }, [color]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <TextPrimary size={12}>{label}</TextPrimary>
      </View>
      <View style={tw`flex-row gap-5`}>
        <View
          style={tw` h-[72px] w-[72px] rounded-[10px] bg-[${selectedColor}]`}
        />
        <View
          style={[
            styles.colorsContainer,
            tw`flex-wrap gap-x-3 gap-y-[2px] flex-1`,
          ]}
        >
          {colors.map((clr, index) => (
            <View
              key={index}
              style={[
                tw`p-[2px] rounded-full border-2 border-transparent`,
                selectedColor === clr && { borderColor: clr },
              ]}
            >
              <Pressable
                style={[
                  styles.colorCircle,
                  { backgroundColor: clr },
                  selectedColor === clr && styles.selectedCircle,
                ]}
                onPress={() => handleColorSelect(clr)}
              />
            </View>
          ))}
          <TouchableOpacity
            onPress={openPicker}
            style={tw`bg-gray p-1 rounded-xl`}
          >
            <TextPrimary font="bold">Use Picker</TextPrimary>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  labelContainer: {
    marginBottom: 5,
  },
  colorsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 10000,
  },
  selectedCircle: {},
});

export default ColorPickerComponent;
