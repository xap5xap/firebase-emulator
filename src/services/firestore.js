import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  addDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU-yejaR1ligBySvB7umMFAaWQW4P09lw",
  authDomain: "friendlychat-88adc.firebaseapp.com",
  projectId: "friendlychat-88adc",
  storageBucket: "friendlychat-88adc.appspot.com",
  messagingSenderId: "454753211612",
  appId: "1:454753211612:web:aa2eb377650b39cff4d019",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

if (process.env.NODE_ENV === "test") {
  console.log("We are on test env");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export const streamGroceryListAll = (callback) => {
  console.log("streamGroceryListAll - 1");
  const groceryDocRef = query(collection(db, "groceryLists"));
  console.log("streamGroceryListAll - 2");

  return onSnapshot(
    groceryDocRef,
    (querySnapshot) => {
      console.log("===streamGroceryListAll - 3");

      const listData = querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return data;
      });
      callback(listData);
    },
    (error) => {
      console.log("----- streamGroceryListAll error", error);
    }
  );
};

export const createNewItem = (name) => {
  const listRef = collection(db, "groceryLists");
  return addDoc(listRef, { name });
};
