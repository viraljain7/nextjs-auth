import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// NextRequest
// JsonWebTokenError
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    //refer api/login/route.ts --> tokenData
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
