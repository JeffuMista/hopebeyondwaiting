import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  // useUser
} from "@clerk/clerk-react";

function App() {
  // const { user } = useUser();
  return (
    <>
      <header className="flex flex-column">
        <Navbar />
        <div className="flex items-center gap-3 p-4 bg-purple-600 text-white px-20 text-xl font-bold">
          <SignedOut>
            <SignInButton mode="modal"/>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <SignedOut>
        <Body />
        <Footer />
      </SignedOut>
      <SignedIn>
        <Dashboard />
        <Footer />
      </SignedIn>
    </>
  );
}

export default App;
