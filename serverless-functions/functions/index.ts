import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
// import { logger } from "firebase-functions";

// Initialize Firebase Admin SDK
admin.initializeApp();

export const helloWorld = onRequest((req, res) => {
//   logger.info("Hello from Firebase Functions!", { structuredData: true });
  res.send("Hello, world!");
});
