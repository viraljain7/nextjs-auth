"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const signPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};
  return (
    <div className="flex  h-[100vh] bg-slate-400">
      <div
        className="flex flex-col border bg-black/40  rounded-xl
        justify-center items-center text-center text-white text-2xl w-[80vh] m-auto p-4"
      >
        <h1 className="m-4">Login</h1>

        <label htmlFor="username">Username: </label>
        <input
          className="p-2 border bg-red-50 rounded-lg mb-4"
          type="text"
          placeholder="Username"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <br />
        <label htmlFor="email">Email: </label>
        <input
          className="p-2 border bg-red-50 rounded-lg mb-4"
          type="email"
          placeholder="Email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <br />

        <label htmlFor="password">Password: </label>
        <input
          className="p-2 border bg-red-50 rounded-lg mb-4"
          type="password"
          placeholder="Password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          onClick={onSignup}
          className="px-4 py-3 border rounded-lg bg-slate-500"
        >
          Signup here
        </button>

        <Link
          href="/login"
          className="m-4 border rounded-md  text-white border-black px-10 py-1 text-sm"
        >
          {" "}
          Click here to login
        </Link>
      </div>
    </div>
  );
};

export default signPage;
