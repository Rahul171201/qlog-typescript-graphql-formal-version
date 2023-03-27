import { useEffect } from "react";
import Router from "next/router";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Home() {
  useEffect(() => {
    Router.push("/login");
  }, []);

  return (
   <LoadingPage></LoadingPage>
  );
}
