"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, senha, lembrar });
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white shadow-2xl/50 shadow-xl ring-1 ring-black/5">
          <div className="p-8 sm:p-10">
            <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900">
              Seja Bem vindo!
            </h1>
            <p className="mt-2 text-center text-sm text-gray-500">
              Faça login na sua conta para acessar a plataforma
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-full border-0 ring-1 ring-gray-200 bg-white/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full rounded-full border-0 ring-1 ring-gray-200 bg-white/80 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="********"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 text-sm text-gray-600 select-none">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={lembrar}
                    onChange={(e) => setLembrar(e.target.checked)}
                  />
                  Lembrar senha
                </label>

                <Link
                  href="/recuperar-senha"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white font-semibold shadow-lg shadow-blue-500/20 hover:opacity-95 active:scale-[0.99] transition"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
