// import { doc, getDoc } from "firebase/firestore";
// import { create } from "zustand";
// import { db } from "./firebase";

// export const useUserStore = create((set) => ({
//   CurrentUser: null,
//   isLoading: true,
//   fetchUserInfo: async (uid) => {
//     if (!uid) return set({ CurrentUser: null, isLoading: false });
//     try {
//       const docRef = doc(db, "users", uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         //console.log("Document data:", docSnap.data());
//         set({ CurrentUser: docSnap.data(), isLoading: false });
//       } else {
//         set({ CurrentUser: null, isLoading: false });
//       }
//     } catch (err) {
//       console.log(err);
//       return set({ CurrentUser: null, isLoading: false });
//     }
//   },
// }));

import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) {
      console.log("No UID found, setting user to null");
      return set({ currentUser: null, isLoading: false });
    }

    try {
      console.log("Fetching user data for UID:", uid);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User found in Firestore:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        console.log("No user found in Firestore for UID:", uid);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
