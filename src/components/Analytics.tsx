import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from '../lib/tailwind'
import TextPrimary from './texts/text'
import ImageComp from './ImageComp'
import icons from '../utils/constants/icons'
import images from '../utils/constants/images'

const Analytics = () => {
    return (
        <View style={tw`dark:bg-gray_dark bg-light rounded-[10px] p-4`}>
            <TextPrimary
                size={15}
                font="montserrat_medium"
            >
                Subscription Analysis
            </TextPrimary>
            <ImageComp image={images.pie_chart} size={224} style={tw`mx-auto mt-2`} />

            <View style={tw`mt-5 gap-2`}>

                <View style={tw`flex-row gap-4 justify-between items-center`}>
                    <View style={tw`flex-row gap-1`} >
                        <TextPrimary size={12}>Premium Plan :</TextPrimary>
                        <TextPrimary size={9} style={tw``}>700 Members </TextPrimary>
                    </View>
                    <View style={tw`h-[15px] w-[15px] bg-primary`} />
                </View>
                <View style={tw`flex-row gap-2 justify-between items-center`}>
                    <View style={tw`flex-row gap-1`} >
                        <TextPrimary size={12}>Standard Plan :</TextPrimary>
                        <TextPrimary size={9} style={tw``}>300 Members </TextPrimary>
                    </View>
                    <View style={tw`h-[15px] w-[15px] bg-green`} />
                </View>
                <View style={tw`flex-row gap-2 justify-between items-center`}>
                    <View style={tw`flex-row gap-1`} >
                        <TextPrimary size={12}>Basic Plan :</TextPrimary>
                        <TextPrimary size={9} style={tw``}>300 Members </TextPrimary>
                    </View>
                    <View style={tw`h-[15px] w-[15px] bg-blue`} />
                </View>

            </View>
        </View>
    )
}

export default Analytics

const styles = StyleSheet.create({})