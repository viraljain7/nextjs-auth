// Import the necessary modules and functions
import { connect } from "@/dbConfig/dbConfig"; // Function to connect to the database
import User from "@/models/userModel"; // User model to interact with user documents in MongoDB
import { NextRequest, NextResponse } from "next/server"; // Types for handling Next.js server requests and responses
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Establish the database connection
connect();

// Export the POST function to handle POST requests
export async function POST(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    //invalid User
    return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }
  return NextResponse.json({ message: "user found", data: user });
}
