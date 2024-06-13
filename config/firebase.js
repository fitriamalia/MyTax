const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if the environment supports Firebase Analytics
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const analytics = getAnalytics(app);
}

module.exports = {
  admin, 
  db,
  app,
};
