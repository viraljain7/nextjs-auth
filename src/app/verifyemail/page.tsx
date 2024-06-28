"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extract token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    // Set token state
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  useEffect(() => {
    // Function to verify email using the token
    const verifyUserEmail = async () => {
      try {
        await axios.post("/api/users/verifyemail", { token });
        setIsVerified(true);
      } catch (error) {
        setError(null);
      }
    };

    // Call verifyUserEmail if token is available
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {!error && !isVerified && <p>Verifying email...</p>}
      {isVerified && <p>Email verified successfully!</p>}
    </div>
  );
};

export default VerifyEmailPage;
