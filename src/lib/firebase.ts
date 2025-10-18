import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

/**
 * Firebase Configuration
 * 
 * Handles Firebase initialization for authentication and analytics
 * Uses singleton pattern to avoid multiple initializations
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBh04GVONeNfgvK5uR_8U9wDJ5oy2QqhiQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "giftedsolutions-53124.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "giftedsolutions-53124",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "giftedsolutions-53124.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "708765156733",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:708765156733:web:3a830c02e784575c6a7814",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-FNVVZLRNRD"
};

/**
 * Initialize Firebase app (singleton)
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Firebase Analytics instance (client-side only)
 */
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

/**
 * Firebase Auth instance
 */
export const auth = getAuth(app);

/**
 * Export analytics instance
 */
export { analytics };

/**
 * Admin email whitelist
 * Only these emails can access admin panel
 */
export const ADMIN_EMAILS = [
  'peternondo1@gmail.com',
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@giftedsolutions.com',
];

/**
 * Check if email is an admin
 */
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

