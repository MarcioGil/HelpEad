import React from "react";
import { auth } from "./firebaseConfig";

export default function Dashboard({ user, onLogout }) {
  return (
    <section className="w-full max-w-md mx-auto bg-white p-6 rounded shadow mt-6" aria-label="Painel do Usuário">
      <h2 className="text-2xl font-bold mb-2">Bem-vindo(a)!</h2>
      <p className="mb-4">Você está autenticado como:</p>
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <span className="block font-medium">{user.displayName || "Usuário"}</span>
        <span className="block text-gray-700">{user.email}</span>
      </div>
      <button
        onClick={onLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Sair
      </button>
    </section>
  );
}
