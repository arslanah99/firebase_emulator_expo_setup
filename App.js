import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase/compat";
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import 'firebase/database';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'placeholder',
  authDomain: 'placeholder',
  projectId: 'placeholder',
  storageBucket: 'placeholder',
  messagingSenderId: 'placeholder',
  appId: 'placeholder',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Use a local emulator in development
if (__DEV__) {
  // If you are running on a physical device, replace http://localhost with the local IP of your PC.

  const auth = getAuth();
  connectAuthEmulator(auth, 'http://10.0.2.2:6969/');

  const db = getDatabase();
  connectDatabaseEmulator(db, '10.0.2.2', 9000);  // Change port to match your setup
}
// Now you can safely perform database operations
firebase.database().ref('messages/').set({
  message: "Hello, World!"
});


export default function App() {
  firebase.database().ref('messages/').once('value').then((snapshot) => {
    const message = snapshot.val().message;
    console.log("messages from db ", message)
  }).catch((err) => {
    console.log('error', err);
  })

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
