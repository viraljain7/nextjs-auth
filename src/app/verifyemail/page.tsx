"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const verifyEmailPage = () => {
  //   const router = useRouter();
  const [token, setToken] = useState("");
  const [Verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response);
      console.log(error.response.data);
    }
  };

  //using Javascript Extracting token
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  //@b using NextJs Extracting token
  //   useEffect(() => {

  //     const { query } = router;
  //     const urlToken = query.token;
  //   }, [router]);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);
  return <h1>under Processing</h1>;
};

export default verifyEmailPage;
