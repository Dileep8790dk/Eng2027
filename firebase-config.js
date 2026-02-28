import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { getDatabase } from 
"https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js";

// Eng2027 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLHKMXn6vkbB2eUJDarBuZ4Mcs8Sjc01U",
  authDomain: "energyquantum-1e176.firebaseapp.com",
  databaseURL: "https://energyquantum-1e176-default-rtdb.firebaseio.com/",
  projectId: "energyquantum-1e176",
  storageBucket: "energyquantum-1e176.firebasestorage.app",
  messagingSenderId: "995775311078",
  appId: "1:995775311078:web:1985c30f0a222aed57df27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
