module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: [
//       "nativewind/babel",
//       [
//         "module-resolver",
//         {
//           alias: {
//             "@assets": "./assets",
//             "@components": "./src/components",
//             "@screens": "./src/screens",
//             "@utils": "./src/utils",
//             // Add any other aliases as needed
//           },
//         },
//       ],
//       "react-native-reanimated/plugin", // must be last
//     ],
//   };
// };
