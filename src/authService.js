import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./api";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore/lite";
import { redirect } from "react-router-dom";

// ✅ Register new User
export const registerUser = async (name, email, password) => {
  try {
    // Create user in firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date().toString(),
      uid: user.uid,
    });
    return user;
  } catch (err) {
    console.error("Error registering user", err);
    throw new Error(err.message);
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredentail = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentail.user;
  } catch (err) {
    console.error("Error logging in:", err.message);
    throw new Error(err.message);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Error Logging out:", err.message);
    throw new Error(err.message);
  }
  redirect("/");

  // localStorage.removeItem("user");
};

// User delete their own account
export const deleteCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Delete user from firestore
      await deleteDoc(doc(db, "users", user.uid));

      // Delete user from firebase Authentication
      await user.delete();
      console.log("user deleted successfully");
    }
  } catch (err) {
    console.log("Error deleting user:", err.message);
    throw new Error(err.message);
  }
};

export async function getUser() {
  const user = auth.currentUser || JSON.parse(localStorage.getItem("user"));
  const userRef = doc(db, "users", user.uid); // Reference to the document
  const userSnap = await getDoc(userRef);
  return userSnap.data();
}
