import { log } from "console";
import mongoose, { Mongoose } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);

    const connection = mongoose.connection;

    connection.on("on", () => {
      console.log("Mongodb Connect Succesfully");
    });
    connection.on("error", (error) => {
      console.log("connection failed :: " + error);
      process.exit();
    });
  } catch (error) {
    console.log("====================================");
    console.log("something went wrong");
    console.log("====================================");
    console.log(error);
  }
}
