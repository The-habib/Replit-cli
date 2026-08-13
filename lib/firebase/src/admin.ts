import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;

export function initFirebaseAdmin(): {
  app: App;
  auth: Auth;
  db: Firestore;
  storage: Storage;
} {
  if (!getApps().length) {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (serviceAccountJson) {
      try {
        const credentials = JSON.parse(serviceAccountJson);
        adminApp = initializeApp({
          credential: cert(credentials),
          projectId,
        });
      } catch (err) {
        console.error("[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY JSON:", err);
        adminApp = initializeApp({ projectId });
      }
    } else {
      adminApp = initializeApp({ projectId });
    }
  } else {
    adminApp = getApps()[0]!;
  }

  adminAuth = getAuth(adminApp);
  adminDb = getFirestore(adminApp);
  adminStorage = getStorage(adminApp);

  return {
    app: adminApp,
    auth: adminAuth,
    db: adminDb,
    storage: adminStorage,
  };
}

export { adminApp, adminAuth, adminDb, adminStorage };
