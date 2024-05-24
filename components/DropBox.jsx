import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DropBox = ({viewRef}) => {
  return (
    <View ref={viewRef} style={styles.dropZone}>
          <Text style={styles.dropZoneText}>Drop Here1</Text>
        </View>
  )
}

export default DropBox

const styles = StyleSheet.create({
    dropZone: {
    width: 50,
    height: 50,
    backgroundColor: "lightgray",
    marginTop: 50,
    alignSelf: "center",
  },
  dropZoneText: {
    fontSize: 16,
    color: "black",
  },
})