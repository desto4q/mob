import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../utils/constants/images'
import tw from "twrnc"
import CardItem from './CardItem'

const CardListing = ({navigation}) => {
  return (
    <View style={tw`flex-1 mt-5`}>
       <CardItem navigation={navigation}/>
    </View>
  )
}

export default CardListing

const styles = StyleSheet.create({})