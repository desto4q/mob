import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../../components/PageContainer";
import Header from "../../components/texts/header";
import BackIcon from "../../components/BackIcon";
import tw from "twrnc";
import TextPrimary from "../../components/texts/text";
import { useGetFaqsQuery } from "../../state/features/services/users/user";
import PageLoader from "../../components/Loader";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const categories = [
  {
    id: "c6b32b2b-1dc5-4f30-9836-d8b06f302b52",
    name: "General",
    faqs: [
      {
        id: "7a43bd75-35da-4808-81c2-a4a91caadf07",
        question: "How can I reset my password?",
        answer: "Click on 'Forgot Password' at login page.",
      },
      {
        id: "9d8aaed8-80a9-45b5-8b33-ddbf1ae40070",
        question: "How do I book an event through your platform?",
        answer:
          "You can book events by navigating to the Events section and following the instructions.",
      },
    ],
  },
  {
    id: "sample-category-2",
    name: "Account & Access",
    faqs: [
      {
        id: "faq-1",
        question: "How do I access the solution?",
        answer:
          "You can access the solution by logging in with your registered email and password.",
      },
      {
        id: "faq-2",
        question: "Why do I need to submit verification documents?",
        answer:
          "Mobiholder is an identity management platform and requires verified user authenticity.",
      },
      {
        id: "faq-3",
        question: "How long does verification take?",
        answer: "Verification typically takes 2–3 working days.",
      },
    ],
  },
];

const FaqScreen = ({ navigation }: any) => {
  const { data: faq, isLoading } = useGetFaqsQuery();
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  if (isLoading) return <PageLoader />;

  const faqData = faq?.data;

  return (
    <PageContainer>
      <ScrollView style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <BackIcon onPress={() => navigation.goBack()} />
          <Header font="semi_bold" size={16}>
            FAQ
          </Header>
          <View style={{ width: 24 }} />
        </View>

        {faqData.map((category: any) => (
          <View key={category.id} style={tw`mb-6`}>
            <TextPrimary style={tw`text-lg font-bold mb-2`}>
              {category.name}
            </TextPrimary>
            {category.faqs.map((faq: any) => (
              <View key={faq.id} style={tw`mb-2 border-b border-gray-300`}>
                <TouchableOpacity
                  onPress={() => toggleQuestion(faq.id)}
                  style={tw`py-3 flex-row justify-between items-center`}
                >
                  <TextPrimary style={tw`text-base font-medium text-light`}>
                    {faq.question}
                  </TextPrimary>
                  <TextPrimary style={tw`text-xl`}>
                    {activeQuestion === faq.id ? "−" : "+"}
                  </TextPrimary>
                </TouchableOpacity>
                {activeQuestion === faq.id && (
                  <TextPrimary style={tw`text-sm text-gray-400 pb-3`}>
                    {faq.answer}
                  </TextPrimary>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </PageContainer>
  );
};

export default FaqScreen;
