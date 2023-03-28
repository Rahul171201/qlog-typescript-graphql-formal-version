import styles from "../styles/Feed.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect } from "react";
import Router from "next/router";
import FeedBox from "@/components/FeedBox/FeedBox";
import { useReactiveVar } from "@apollo/client";
import { user } from "@/reactive-var/user";
import { theme } from "@/reactive-var/theme";

const Feed = () => {
  
  //current logged in user
  const currentUser = useReactiveVar(user);

  //current theme
  const currentTheme = useReactiveVar(theme);
  
  useEffect(() => {
    if (!currentUser) Router.push("/login");
  }, [currentUser]);

  console.log(currentUser, 'mein hi hun bhai');

  return (
    <main className={styles.main}  style={{backgroundImage: `url(${currentTheme.backgroundImage})`, backgroundColor: currentTheme.backgroundColor}}>
      <Navbar></Navbar>
      <div className={styles.feedWrapper}>
        {currentUser ? <FeedBox></FeedBox> : <></>}
        <Sidebar></Sidebar>
      </div>
    </main>
  );
};

export default Feed;
