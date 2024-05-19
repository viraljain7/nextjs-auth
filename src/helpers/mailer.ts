import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //@r Todo: configure mail for usage

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (email === "VERIFY") {
      await User.findByIdAndDelete(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (email === "RESET") {
      await User.findByIdAndDelete(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: process.env.NODEMAILERHOST,
      port: process.env.NODEMAILERPORT,
      auth: {
        user: process.env.NODEMAILERUSER,
        pass: process.env.NODEMAILERPASS,
      },
    });

    const mailOption = {
      from: "veerljain1234@gmail.com", // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOption);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
