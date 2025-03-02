import { useEffect, useState } from "react";
import { Chat, Detail, List, Login } from "./components";
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        await fetchUserInfo(user?.uid); // Fetch user data
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unSub();
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {isLoggedIn && currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
