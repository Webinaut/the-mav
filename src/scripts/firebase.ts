// src/lib/firebase.ts
import admin from "firebase-admin";
// src/lib/firebase.ts
console.log("Checking Firebase ID:", process.env.FIREBASE_PROJECT_ID);

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("FIREBASE_PRIVATE_KEY is missing from .env");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();
// Export admin so other files can see it
export { admin };
