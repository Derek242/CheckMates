
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../scripts/firebaseConfig';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from 'react';

export default function Index() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSignUp = async (): Promise<void> => {
    try {
      await signUpWithEmail(email, password);
      setMessage('User signed up successfully!');
    } catch (error) {
      setMessage((error as Error).message);
    }
  };

  const handleLogIn = async (): Promise<void> => {
    try {
      await logInWithEmail(email, password);
      setMessage('User logged in successfully!');
    } catch (error) {
      setMessage((error as Error).message);
    }
  };
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', (error as Error).message);
    }
  };
  const logInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
    } catch (error) {
      console.error('Error logging in:', (error as Error).message);
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
  
    },
  });
  return (
    
    <View>
       <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogIn} />
      {message ? <Text>{message}</Text> : null}
      
    </View>
    
  );
};
  


