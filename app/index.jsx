import { Text, View, StyleSheet, Button, TextInput, Alert, Image, SafeAreaViewm, Platform } from "react-native";
import { auth } from '../scripts/firebaseConfig';
import { useFonts, Megrim_400Regular } from '@expo-google-fonts/megrim';
import AppLoading from 'expo-app-loading';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import * as SMS from 'expo-sms';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';

//import 'firebase/storage';
//import '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';
//import '@react-native-firebase/app';  // Initialize Firebase

export default function Index() {
  
SplashScreen.preventAutoHideAsync();
  //Email login
    const [showRegister, setShowRegister] = useState(false); // State to toggle visibility
    const [isSignupPressed, setIsSignupPressed] = useState(false); // State to track if the button has been pressed
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [textResult, setTextResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUri, setImageUri] = useState(null);
//-----------------------------
  const pickImage = async() => { 
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status.granted === 'false'){
          alert('sorry we need permision');
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        });
        if (!result.cancelled){
          setImageUri(result.assets[0].uri);
          //console.log(result.assets[0].uri);AIzaSyBO3xEWNRstYos6iMdo7iv6_ZFCxsKNs-A
        } 
    }

    const recognizeText = async () => {
      const apiKey = 'AIzaSyBO3xEWNRstYos6iMdo7iv6_ZFCxsKNs-A';
      const image = await fetch(imageUri);
      const blob = await image.blob();
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
  
      const body = JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
          },
        ],
      });
  
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        }
      );
      const result = await response.json();
      const detectedText = result.responses[0]?.fullTextAnnotation?.text;
      
      console.log(detectedText);
    };
  

//-----------------------------
const loginUser = async () => {
  // if(email && password && createUserWithEmailAndPassword(auth, email, password)){

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
      window.location.href = '/upload';

    } catch (error) {
      console.error('Error signing in:', (error).message);
    }
  
};


//-----------------------------
// Register a new user with email and password
const registerUser = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
    window.location.href = '/upload';
    //await storageRef.put(Name);
    //storeUserData('Name',Name);
    //router.push('/HomeScreen');
  } catch (error) {
    alert('invalid email or password');
    console.error('Error registering user:', (error).message);
  }
};

//-----------------------------
// Sign out the current user
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', (error).message);
  }
};

//-----------------------------
const handleRegister = () => {
  setShowRegister(true); // Show the input fields when button is clicked
  setIsSignupPressed(true); //button will disapeaar after button pressed
};

//-----------------------------
const handleLogin = () =>{
  setIsLoginPressed(true);
  setShowLogin(true);
}

//-----------------------------
//Google Font
const [fontsLoaded] = useFonts({
  Megrim_400Regular 
});

if (!fontsLoaded) {
  return <AppLoading />;
}

//-----
// const [number, setNumber] = useState('');
// const [message, setMessage] = useState('');

// //Checks sms capatability
// const checkSMS = async () => {
//   const isAvaliable = await SMS.isAvailableAsync();

//   if(isAvaliable){
//     alert('SMS is avaliable on this device');
//   } else {
//     alert('SMS is not avaliable on this device');
//   }
// };

// //Message sender using native sms
//   const sendSMS = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need permission');
//       return;
//     }
//   } 

return (

  <View style={styles.container}>
{/* 
    <View style={styles.smsButton}>
    <Button title="Send SMS" onPress={sendSMS} />
    </View> */}

    <Image source={require('../assets/images/billLogo.png')} style={styles.image} />     
    <Text style={styles.text}>CheckMates</Text>


    <Button title = "Pick an image from camera roll" onPress={pickImage}/>
    {imageUri && <Image source ={{ uri:imageUri }}style = {{width:200, height:200}}/>}

    <Button title="Recognize Text" onPress={recognizeText}/>
    {isLoading ? <Text>Loading...</Text> : null}
    <View style = {styles.label}>
          <Text style = {styles.label}>Detected Text:</Text>
          <Text style = {styles.label}>{}</Text>
        </View>

    {!isSignupPressed && !isLoginPressed && (
      <Button title="Sign up" onPress={handleRegister} color="#4CAF50" />
    )}
    {!isSignupPressed && !isLoginPressed && (
      <Button title="Login" onPress={handleLogin} />
    )}
    {showRegister && (
    <>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Name"
            keyboardType="Name"
            autoCapitalize="none"
            value={Name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign Up" onPress={registerUser} />
          </>
      )}
      {showLogin && (
    <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={loginUser} />
          </>
      )}
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center', //centers vertically
      alignItems: 'center',     //centers horizontally
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 16,
      paddingHorizontal: 10,
    },
    spacer: {
      height: 20
    },

    text: {
      gap: 8,
      fontFamily: 'Megrim_400Regular',
      fontSize: 50,
      marginBottom: 16,
    },
    image: {
      width: 200,
      height: 200,
    }, 
    smsButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});


