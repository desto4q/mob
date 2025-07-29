import { Dimensions, ImageBackground, View } from "react-native";
import Header from "../texts/header";
import TextPrimary from "../texts/text";
import tw from "../../lib/tailwind";
import Carousel from "react-native-reanimated-carousel";
import images from "../../utils/constants/images";
import BaseText from "../BaseText";
const homeCarouselData = [
  {
    title: "All your ID Cards\nin one place",
    description: "Go digital with your IDs! Never lose your wallet again.",
    image: images.home_top,
  },
  {
    title: "Create & Manage\nEvents with Ease",
    description: "Streamline your event management process effortlessly.",
    image: images.home_top2,
  },
];

const { width, height } = Dimensions.get("window");
const CONTAINER_WIDTH = width;
const CONTAINER_HEIGHT = height * 0.2;
export default function Hero() {
  return (
    <Carousel
      width={width}
      height={CONTAINER_HEIGHT}
      data={homeCarouselData}
      mode="parallax"
      loop
      scrollAnimationDuration={600}
      autoPlay
      autoPlayInterval={3000}
      style={tw`mb-4`}
      pagingEnabled
      modeConfig={{
        parallaxScrollingScale: 0.85,
        parallaxScrollingOffset: 60,
        parallaxAdjacentItemScale: 0.75,
      }}
      renderItem={({ item }) => (
        <View style={[tw`items-center justify-center`, { width: width }]}>
          <ImageBackground
            source={item.image}
            style={[
              tw`rounded-3xl overflow-hidden`,
              {
                width: CONTAINER_WIDTH,
                height: CONTAINER_HEIGHT,
              },
            ]}
            resizeMode="cover"
          >
            <View style={tw`absolute inset-0 bg-black/40`} />
            <View style={tw`flex-1  p-6 `}>
              <BaseText
                font="bold"
                size={24}
                style={tw`text-white mb-3 leading-tight justify-start font-bold text-xl`}
              >
                {item.title}
              </BaseText>
              <TextPrimary
                font="medium"
                size={14}
                style={tw`text-white/90 leading-relaxed`}
              >
                {item.description}
              </TextPrimary>
            </View>
          </ImageBackground>
        </View>
      )}
    />
  );
}
