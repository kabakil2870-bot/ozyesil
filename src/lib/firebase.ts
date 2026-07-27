import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

// Exact Firebase configuration provided by user
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyC-WY3smozL141e1SKNIQgZTGz2gmG2ldU",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "ozyesilkozmetik.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "ozyesilkozmetik",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "ozyesilkozmetik.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "374928253105",
  appId: env.VITE_FIREBASE_APP_ID || "1:374928253105:web:70284b49b153c62a234290",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-TPV6LLJGCW"
};

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

/**
 * Fetch products from Firestore 'products' collection.
 * If collection is empty or fails (e.g. offline/unconfigured), returns null.
 */
export async function fetchProductsFromFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    if (querySnapshot.empty) {
      return null;
    }
    const products: any[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() });
    });
    return products;
  } catch (error) {
    console.warn('Firebase Firestore fetch warning (falling back to local stock data):', error);
    return null;
  }
}
