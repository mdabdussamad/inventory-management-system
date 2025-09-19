"use client"
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import Login from "../login/page";
import { useSession } from "next-auth/react";

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)
  const { data: session, status } = useSession();    
    if (status === "loading") {
      return <p>Loading User Please Wait...</p>;
    }
    if (status === "unauthenticated") {  
      <Login />
    }
  return (
    <div className="flex">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className="lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen">
        <Header setShowSidebar={setShowSidebar} />
        {children}
        </main>
    </div>
  );
}
