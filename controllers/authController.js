const { db, app } = require("../config/firebase");
const { getAuth, signInWithEmail, signOut, deleteUser } = require("firebase/auth");
const { validateEmail } = require("../utils/validation");
const { createUser, updateUser } = require("../services/userService");

exports.register = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    await createUser({ name, phone, email });
    res.status(201).json({
      message: "User registered successfully. "
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const auth = getAuth(app);
    const userCredential = await signInWithEmail(
      auth,
      email
    );
    const userId = userCredential.user.uid;

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = userDoc.data();
    }

    res.status(200).json({ message: "Login successful", userData });
  } catch (error) {
    if (
      error.code === "auth/user-not-found" ) {
      return res.status(400).json({ error: "Invalid credentials provided" });
    } else {
      return res.status(400).json({ error: error.message });
    }
  };

exports.logout = async (req, res) => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (email && !validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (phone && !validatePhone(phone)) {
      return res.status(400).json({ error: "Invalid phone format" });
    }

    await updateUser({ name, phone, email });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { npwp } = req.params;

    if (!npwp) {
      return res.status(400).json({ error: "NPWP is required" });
    }

    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
