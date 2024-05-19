// Import the necessary modules and functions
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig"; // Function to connect to the database

connect();
// Export the POST function to handle POST requests
export async function GET(request: NextRequest) {
  try {
    // Create a response object
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the token by setting a cookie with an expiration date in the past
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set the cookie to expire immediately
    });

    return response;
  } catch (error: any) {
    // If an error occurs, return an error response with the error message and a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
