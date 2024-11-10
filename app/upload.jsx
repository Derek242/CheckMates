import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const upload = () => {
  return (
    <View style={styles.container}>
      <Text>upload</Text>
    </View>
  )
}

export default upload

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center', //centers vertically
      alignItems: 'center',     //centers horizontally
    }
  }
);
