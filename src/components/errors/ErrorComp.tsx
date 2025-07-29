import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../../lib/tailwind";
import BackButton from "../BackButton";

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  backButton?: boolean;
  showRetryButton?: boolean;
}

export default function MaterialErrorComponent({
  title = "Something went wrong",
  message = "We encountered an error while loading your data. Please try again.",
  onRetry,
  showRetryButton = true,
  backButton,
}: ErrorComponentProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={tw`flex-1 flex `}>
      {backButton && (
        <View style={tw`px-3`}>
          <BackButton />
        </View>
      )}
      <View
        style={[
          tw`flex-1  dark:bg-gray-900 justify-center items-center px-6`,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* Error Icon */}
        <View
          style={tw`w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full justify-center items-center mb-6`}
        >
          <View
            style={tw`w-12 h-12 bg-red-500 rounded-full justify-center items-center`}
          >
            <Text style={tw`text-white text-2xl font-bold`}>!</Text>
          </View>
        </View>

        {/* Error Title */}
        <Text
          style={tw`text-gray-900 dark:text-white text-xl font-semibold text-center mb-3`}
        >
          {title}
        </Text>

        {/* Error Message */}
        <Text
          style={tw`dark:text-white text-black text-base text-center leading-6 mb-8 max-w-sm`}
        >
          {message}
        </Text>

        {/* Retry Button */}
        {showRetryButton && (
          <TouchableOpacity
            onPress={onRetry}
            style={tw`bg-red-500 px-8 py-3 rounded-full shadow-lg active:bg-red-600`}
            activeOpacity={0.8}
          >
            <Text style={tw`text-white font-semibold text-base`}>
              Try Again
            </Text>
          </TouchableOpacity>
        )}

        {/* Additional Help Text */}
        <Text
          style={tw`text-black dark:text-white text-sm text-center mt-6 max-w-xs mb-12`}
        >
          If the problem persists, please contact support
        </Text>
      </View>
    </View>
  );
}
