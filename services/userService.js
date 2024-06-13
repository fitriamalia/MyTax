const admin = require("firebase-admin");
const db = admin.firestore();

async function createUser({ name, phone, email }) {
  const userCredential = await admin.auth().createUser({ email });
  const userId = userCredential.uid;

  await db.collection("users").doc(userId).set({
    name,
    phone,
    email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(), // Menambahkan timestamp
  });

  return userId;
}

async function updateUser({ userId, name, phone, email }) {
  const userRef = db.collection('users').doc(userId);
  const updates = {};

  if (name) updates.name = name;
  if (phone) updates.phone = phone;
  if (email) {
    updates.email = email;
  }

  await userRef.update(updates);
}

module.exports = {
  createUser,
  updateUser,
};
