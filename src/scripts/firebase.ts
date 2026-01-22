// src/lib/firebase.ts
import admin from "firebase-admin";
// src/lib/firebase.ts
console.log("Checking Firebase ID:", import.meta.env.FIREBASE_PROJECT_ID);

if (!import.meta.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("FIREBASE_PRIVATE_KEY is missing from .env");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
// Export admin so other files can see it
export { admin };
