import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import tw from '../../lib/tailwind'
import TextPrimary from '../texts/text'
import ScanBox from '../ScanBox'
import InputTextWithLabel from '../inputs/InputWithLabel'
import { CustomSelectList } from '../inputs/Dropdown'
import PrimaryButton from '../buttons/PrimaryButtom'

const UploadIndDoc = () => {

    const [cardName, setCardName] = useState("")

  return (
    <View>
          <CustomSelectList
        label="ID Type"
        list={[
          { name: "NIN", title: "NIN", id: "1" },
          { name: "Voters Card", title: "Voters Card", id: "2" },
          { name: "Passport", title: "Passport", id: "3" },
        ]}
        title="Select Id Card"
        func={(text) => setCardName(text)}
      />
      <View
        style={tw` justify-between p-5 py-6 border border-[#F74D1B] rounded-[10px] mt-5 `}
      >
        <TextPrimary size={13} style={tw`pb-3`}>
          Verify Account
        </TextPrimary>
        <ScanBox label="Upload Government ID Front" />
        <TextPrimary size={11} style={tw`pt-3`}>
          Upload a verified government ID to verify your account
        </TextPrimary>
      </View>
      <View
        style={tw` justify-between p-5 py-6 border border-[#F74D1B] rounded-[10px] mt-10 `}
      >
        <TextPrimary size={13} style={tw`pb-3`}>
          Verify Account
        </TextPrimary>
        <ScanBox label="Upload Government ID Back" />
        <TextPrimary size={11} style={tw`pt-3`}>
          Upload a verified government ID to verify your account
        </TextPrimary>
      </View>
      <PrimaryButton style={tw`mt-10`} >
          Upload Document
        </PrimaryButton>
    </View>
  )
}

export default UploadIndDoc

const styles = StyleSheet.create({})