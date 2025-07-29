// import React, { useState } from "react";
// import {
//   View,
//   Pressable,
//   StyleSheet,
//   Modal,
//   Text,
//   ScrollView,
// } from "react-native";
// import TextPrimary from "../texts/text";
// import tw from "../../lib/tailwind";
// import { HueSlider, SaturationSlider } from "reanimated-color-picker";
// import ColorPicker from "reanimated-color-picker";

// const presetColors = [
//   "#000000",
//   "#A78BFA",
//   "#fff",
//   "#6D28D9",
//   "#E9D5FF",
//   "#FFAB01",
//   "#FF8C82",
//   "#FF4015",
//   "#FE6250",
//   "#1F9433",
// ];

// interface ColorPickerProps {
//   label?: string;
//   color: string;
//   onColorSelect: (color: string) => void;
// }

//  const ColorPickerComponent = ({
//   onColorSelect,
//   label,
//   color,
// }: ColorPickerProps) => {
//   const [selectedColor, setSelectedColor] = useState(color || presetColors[0]);
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const handleColorChange = (color: { hex: string }) => {
//     setSelectedColor(color.hex);
//     onColorSelect(color.hex);
//   };

//   return (
//     <View style={styles.container}>
//       {label && (
//         <View style={styles.labelContainer}>
//           <TextPrimary size={12}>{label}</TextPrimary>
//         </View>
//       )}

//       <View style={tw`flex-row gap-5`}>
//         <View
//           style={tw`h-[72px] w-[72px] rounded-[10px] bg-[${selectedColor}]`}
//         />
//         <ScrollView
//           horizontal
//           contentContainerStyle={[styles.colorsContainer, tw`gap-x-3`]}
//           showsHorizontalScrollIndicator={false}
//         >
//           {presetColors.map((c, index) => (
//             <View
//               key={index}
//               style={[
//                 tw`p-[2px] rounded-full border-2 border-transparent`,
//                 selectedColor === c && { borderColor: c },
//               ]}
//             >
//               <Pressable
//                 style={[
//                   styles.colorCircle,
//                   { backgroundColor: c },
//                   selectedColor === c && styles.selectedCircle,
//                 ]}
//                 onPress={() => {
//                   setSelectedColor(c);
//                   onColorSelect(c);
//                 }}
//               />
//             </View>
//           ))}

//           {/* Trigger flexible color picker */}
//           <Pressable
//             style={[
//               styles.colorCircle,
//               tw`bg-gray-300 items-center justify-center`,
//             ]}
//             onPress={() => setShowColorPicker(true)}
//           >
//             <Text style={{ fontSize: 16, color: "#000" }}>+</Text>
//           </Pressable>
//         </ScrollView>
//       </View>

//       {/* Modal with Reanimated Color Picker */}
//       <Modal visible={showColorPicker} transparent={true} animationType="slide">
//         <View
//           style={tw`flex-1 justify-center items-center bg-black/50 px-5 py-10`}
//         >
//           <View style={tw`bg-white rounded-xl p-5 w-full`}>
//             <TextPrimary style={tw`text-base mb-2`}>Pick any color</TextPrimary>

//             <ColorPicker
//               style={{ height: 200 }}
//               value={selectedColor}
//               onComplete={handleColorChange}
//               boundedThumb
//             />

//             <HueSlider style={{ marginTop: 20 }} />
//             <SaturationSlider style={{ marginTop: 10 }} />

//             <Pressable
//               onPress={() => setShowColorPicker(false)}
//               style={tw`mt-4 bg-gray-200 py-2 rounded-md items-center`}
//             >
//               <TextPrimary>Done</TextPrimary>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     marginVertical: 10,
//   },
//   labelContainer: {
//     marginBottom: 5,
//   },
//   colorsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   colorCircle: {
//     width: 30,
//     height: 30,
//     borderRadius: 100,
//   },
//   selectedCircle: {
//     borderWidth: 2,
//     borderColor: "#000",
//   },
// });

// export default ColorPickerComponent;
