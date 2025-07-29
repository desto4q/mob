import { StyleSheet, View } from 'react-native';
import React from 'react';

const DashedLines = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dashedLine} />
    </View>
  );
};

export default DashedLines;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashedLine: {
    width: '90%',           // Adjust line width as needed
    borderBottomWidth: 2,   // Line thickness
    borderColor: 'black',   // Line color
    borderStyle: 'dashed',  // Makes the line dashed
  },
});
