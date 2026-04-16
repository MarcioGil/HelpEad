import React, { useState, useRef } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const errorRef = useRef(null);

  React.useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.focus();
    }
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Redirecionar ou mostrar mensagem de sucesso
      alert("Autenticação realizada com sucesso!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="w-full max-w-xs mx-auto bg-white p-6 rounded shadow"
      onSubmit={handleSubmit}
      aria-labelledby="auth-form-title"
    >
      <h2 id="auth-form-title" className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Entrar" : "Cadastrar"}
      </h2>
      {error && (
        <div
          ref={errorRef}
          tabIndex={-1}
          className="mb-3 p-2 bg-red-100 text-red-700 rounded"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <label htmlFor="email" className="block mb-1 font-medium">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="username"
        required
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-required="true"
      />
      <label htmlFor="password" className="block mb-1 font-medium">
        Senha
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        minLength={6}
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={e => setPassword(e.target.value)}
        aria-required="true"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Aguarde..." : isLogin ? "Entrar" : "Cadastrar"}
      </button>
      <button
        type="button"
        className="w-full mt-2 underline text-blue-700 hover:text-blue-900 focus:outline-none"
        onClick={() => setIsLogin((v) => !v)}
      >
        {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
    </form>
  );
}
