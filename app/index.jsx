import { Text, View, StyleSheet, Button,TextInput, Alert, Image } from "react-native";
import { auth } from '../scripts/firebaseConfig';
import { useFonts, Megrim_400Regular } from '@expo-google-fonts/megrim';
import AppLoading from 'expo-app-loading';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
//import 'firebase/storage';
//import '@react-native-firebase/storage';
//import firestore from '@react-native-firebase/firestore';
//import '@react-native-firebase/app';  // Initialize Firebase

export default function Index() {
  
  //Email login
    const [showRegister, setShowRegister] = useState(false); // State to toggle visibility
    const [isSignupPressed, setIsSignupPressed] = useState(false); // State to track if the button has been pressed
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [image,setImage] = useState(null);


//-----------------------------
  const pickImage = async() => {
      if(Platform.OS !== 'web'){
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status.granted === 'false'){
          alert('sorry we need permision');
          return;
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.all,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
        });
        if (!result.cancelled){
          setImage(result.uri);
        }
    }

//-----------------------------
  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
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
//-----------------------------


return (

  
  <View style={styles.container}>

    <Image source={require('../assets/images/billLogo.png')} style={styles.image} />     
    <Text style={styles.text}>CheckMates</Text>


    <Button title = "Pick an image from camera roll" onPress={pickImage}/>
    {image && <Image source ={{ uri:image }}style = {{width:200, height:200}}/>}

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
  }
);


