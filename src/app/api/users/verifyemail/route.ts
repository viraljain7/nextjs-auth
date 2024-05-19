// Import the connect function to establish a database connection
import { connect } from "@/dbConfig/dbConfig";
// Import the User model to interact with the user data in the database
import User from "@/models/userModel";
// Import Next.js types for handling server requests and responses
import { NextRequest, NextResponse } from "next/server";

// Establish the database connection
connect();

//@q Export the POST function to handle POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request to get the data sent by the client
    const reqBody = await request.json();
    const { token } = reqBody; // Extract the token from the request body

    // Log the request body to the console (for debugging purposes)
    console.log(reqBody);

    // Find a user in the database with the matching verifyToken and check if the token has not expired
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // $gt stands for "greater than"
    });

    // If no user is found, return an error response
    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
    // Log the found user to the console (for debugging purposes)
    console.log(user);

    // Set the user's email verification status to true and clear the verification token and expiry date
    user.isVerified = true;
    user.verifyToken = undefined; // Remove the verifyToken
    user.verifyTokenExpiry = undefined; // Remove the verifyTokenExpiry

    // Save the updated user back to the database
    const savedUser = await user.save();

    // Return a success response indicating that the email was verified successfully
    return NextResponse.json({
      message: "Email Verified successfully",
      success: true,
    });
  } catch (error: any) {
    // If an error occurs, return an error response with the error message and a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
