
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ClerkNavbar from "./components/ClerkNavbar";
import MainPage from "./components/pages/MainPage";
import Dashboard from "./components/pages/Dashboard";
import CenterPage from "./components/pages/CenterPage";
import BookingComponent from "./components/Booking";
import UserComponent from "./components/User";
import AdminPage from "./components/pages/AdminPage";
import { SignIn, SignUp, SignedIn } from "@clerk/clerk-react";

function App() {
  return (
    <BrowserRouter>
      <ClerkNavbar />

      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />

        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />

        <Route path="/centers" element={<CenterPage />} />

        <Route
          path="/book"
          element={
            <SignedIn>
              <BookingComponent />
            </SignedIn>
          }
        />

        <Route
          path="/profile"
          element={
            <SignedIn>
              <UserComponent />
            </SignedIn>
          }
        />

        <Route
          path="/admin"
          element={
            <SignedIn>
              <AdminPage /> 
            </SignedIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

