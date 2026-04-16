import React, { useState } from "react";


import AuthForm from "./src/AuthForm";
import Dashboard from "./src/Dashboard";
import { auth } from "./src/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

function useAuthUser() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);
  return user;
}

function App() {
  const user = useAuthUser();

  function handleLogout() {
    signOut(auth);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center" tabIndex={0}>
        Plataforma de Apoio ao Estudante EAD
      </h1>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthForm />
      )}
    </main>
  );
}

export default App;
