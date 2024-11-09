import { Text, View, StyleSheet } from "react-native";
import { auth } from '../scripts/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
export default function Index() {
  //Email login
  const loginUser = async (email:string, password:string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', (error as Error).message);
    }
  };

  // Register a new user with email and password
const registerUser = async (email:string, password:string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered:', userCredential.user);
  } catch (error) {
    console.error('Error registering user:', (error as Error).message);
  }
};
// Sign out the current user
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', (error as Error).message);
  }
};
//Google login
const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error during Google sign-in:', (error as Error).message);
  }
};
  return (
    <View
    >
      <Text style = {styles.text}>Edit app/index.tsx to edit this screen.</Text>
      
    </View>

  );
}
const styles = StyleSheet.create({
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    fontSize: 100,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});