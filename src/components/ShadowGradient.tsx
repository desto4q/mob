import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

interface ShadowGradientProps{
    children: React.ReactNode;
    onPress?: () => void;
}

const ShadowGradient:FC<ShadowGradientProps> = ({children, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.box}>
      {children}
    </Pressable>
  )
}

export default ShadowGradient

const styles = StyleSheet.create({
    box: {
        backgroundColor: "#0A0909",
        padding: 10,
        height:44,
        width:44,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10000,
        shadowColor: "#A026F1", // Shadow color
        shadowOffset: { width: -4, height: 0 }, // X-axis offset (-2) and no Y-axis offset
        shadowRadius: 4, // Spread of the shadow (similar to blur)
        shadowOpacity: 0.6, // Opacity of the shadow
        elevation: 4, // Add this for Android shadows
      },
})