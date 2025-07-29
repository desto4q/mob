import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../../lib/tailwind'
import TextPrimary from '../texts/text'

const HistoryItem = ({color}:any) => {
  return (
    <View
    style={tw`flex-row justify-between rounded-[10px] py-3 px-7 bg-[${color}] dark:bg-[#2E2F36]`}
  >
    <TextPrimary size={10}>25/05/2025</TextPrimary>
    <TextPrimary size={10}>N5000.00</TextPrimary>
    <TextPrimary size={10}>Pending</TextPrimary>
  </View>
  )
}

export default HistoryItem

const styles = StyleSheet.create({})