import React from 'react';
import { Button, Alert } from 'react-native';
import * as SMS from 'expo-sms';



const SendSMS = () => {
  const sendMessage = async () => {
    try {
      const { result } = await SMS.sendSMSAsync(
        ['+19292897218'],  // Replace with the recipient's phone number
        'Hello, this is a test message from my React Native app!'
      );
      
      // Log the result to see what is being returned
      console.log('SMS result:', result);

      if (result === 'sent') {
        Alert.alert('Message Sent!', 'Your message has been sent successfully.');
      } else if (result === 'cancelled') {
        Alert.alert('Message Cancelled', 'You cancelled the message sending.');
      }
    } catch (error) {
      console.error('Error sending SMS', error);
      Alert.alert('Error', 'An error occurred while sending the message.');
    }
  };

  return (
    <Button title="Send SMS" onPress={sendMessage} />
  );
};

export default SendSMS;


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Optional: process.exit(1); // Exit the app if needed
  });