// Import the necessary modules and functions
import { connect } from "@/dbConfig/dbConfig"; // Function to connect to the database
import User from "@/models/userModel"; // User model to interact with user documents in MongoDB
import { NextRequest, NextResponse } from "next/server"; // Types for handling Next.js server requests and responses
import bcryptjs from "bcryptjs"; // Library for hashing passwords
import { sendEmail } from "@/helpers/mailer"; // Function to send emails

// Establish the database connection
connect();

// Export the POST function to handle POST requests
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body of the request to get the data sent by the client
    const reqBody = await request.json();
    const { username, email, password } = reqBody; // Extract the username, email, and password from the request body

    // Log the request body to the console (for debugging purposes)
    console.log(reqBody);

    // Check if a user with the given email already exists in the database
    const user = await User.findOne({ email });

    // If a user with the given email already exists, return an error response
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the user's password for secure storage
    const salt = await bcryptjs.genSalt(10); // Generate a salt for hashing
    const hashedPassword = await bcryptjs.hash(password, salt); // Hash the password with the salt

    // Create a new user document with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    // Log the saved user to the console (for debugging purposes)
    console.log(savedUser);

    // Send a verification email to the new user
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return a success response with the message and the saved user data
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    // If an error occurs, return an error response with the error message and a 500 status code
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
