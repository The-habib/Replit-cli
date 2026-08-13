import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const getFirebaseConfig = (): FirebaseClientConfig => ({
  apiKey: process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || process.env.VITE_FIREBASE_MEASUREMENT_ID,
});

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;
let firebaseStorage: FirebaseStorage | null = null;

export function initFirebaseClient(customConfig?: FirebaseClientConfig): {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
} {
  const config = customConfig || getFirebaseConfig();

  if (!getApps().length) {
    if (!config.apiKey || !config.projectId) {
      console.warn(
        "[Firebase] Mandatory environment variables FIREBASE_API_KEY and FIREBASE_PROJECT_ID are not set. " +
          "Initialize with explicit config or configure environment variables."
      );
    }
    firebaseApp = initializeApp(config as Record<string, string>);
  } else {
    firebaseApp = getApp();
  }

  firebaseAuth = getAuth(firebaseApp);
  firebaseDb = getFirestore(firebaseApp);
  firebaseStorage = getStorage(firebaseApp);

  return {
    app: firebaseApp,
    auth: firebaseAuth,
    db: firebaseDb,
    storage: firebaseStorage,
  };
}

export { firebaseApp, firebaseAuth, firebaseDb, firebaseStorage };
