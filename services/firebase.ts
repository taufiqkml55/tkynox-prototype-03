/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// --- IMPORTANT CONFIGURATION CHECK ---
// If you see auth/configuration-not-found errors:
// 1. Go to Firebase Console -> Project Settings
// 2. Verify that the 'apiKey' below matches the one in your Firebase Console exactly.
// 3. Verify 'projectId' matches.
// 4. Ensure Authentication is enabled in the Build -> Authentication tab.

const apiKey = "AIzaSyCicFc_2JjU11d4A3mYOJKANVMoseCmr2U";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "tkinox-68f39.firebaseapp.com",
  databaseURL: "https://tkinox-68f39-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tkinox-68f39",
  storageBucket: "tkinox-68f39.firebasestorage.app",
  messagingSenderId: "352137437778",
  appId: "1:352137437778:web:9fc1fe9fd124b25278b58b"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
// Ensure login session persists across refreshes
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth Persistence Error:", error);
});

export const db = getFirestore(app);
export const rtdb = getDatabase(app, firebaseConfig.databaseURL);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});