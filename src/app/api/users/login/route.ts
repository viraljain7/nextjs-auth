// Import the necessary modules and functions
import { connect } from "@/dbConfig/dbConfig"; // Function to connect to the database
import User from "@/models/userModel"; // User model to interact with user documents in MongoDB
import { NextRequest, NextResponse } from "next/server"; // Types for handling Next.js server requests and responses
import bcryptjs from "bcryptjs"; // Library for hashing and comparing passwords
import jwt from "jsonwebtoken"; // Library to generate JWT tokens

// Establish the database connection
connect();

// Export the POST function to handle POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request to get the data sent by the client
    const reqBody = await request.json();
    const { email, password } = reqBody; // Extract the email and password from the request body

    // Log the request body to the console (for debugging purposes)
    console.log(reqBody);

    // Check if a user with the given email exists in the database
    const user = await User.findOne({ email });

    // If no user with the given email exists, return an error response
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("User exists in DB");

    // Compare the provided password with the stored hashed password
    const validPassword = await bcryptjs.compare(password, user.password);

    // If the password is incorrect, return an error response
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Prepare token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Generate a JWT token with the user data
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d", // Token expiration time
    });

    // Return a success response with a message and user data (and token if generated)
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set the token in an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true, // Cookie can only be accessed by the server
    });

    return response;
  } catch (error: any) {
    // If an error occurs, return an error response with the error message and a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
