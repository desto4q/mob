import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import tw from "twrnc"
import TextPrimary from './texts/text'

interface CardTagProps {
  color: string;
  bgColor: string;
  text: string;
}

const CardTag: FC<CardTagProps> = ({ color, bgColor, text }) => {
  return (
    <View style={[tw`border border-[${color}] bg-[${bgColor}] rounded-[3px] px-4 py-[4px]`, { alignSelf: 'flex-start' }]}>
      <TextPrimary color={color}>{text}</TextPrimary>
    </View>
  )
}

export default CardTag

const styles = StyleSheet.create({})
