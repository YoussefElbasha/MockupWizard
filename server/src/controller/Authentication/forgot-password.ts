import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import mjml2html from "mjml";

import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { prisma } = req.context;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).json({
        error: "No user found with that email",
      });

    const resetToken = jwt.sign(
      { userId: user.id },
      process.env.RESET_PASSWORD_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    const resetUrl = `${process.env.FRONTEND_URL}/forgot-password/${resetToken}`;

    console.log(resetUrl);

    const mjmlTemplate = fs.readFileSync(
      path.join(__dirname, "../../templates/forgot-password.mjml"),
      "utf8"
    );

    const template = Handlebars.compile(mjmlTemplate);
    const mjml = template({ resetUrl });
    const htmlOutput = mjml2html(mjml);
    const msg = {
      to: email,
      from: process.env.SENDGRID_EMAIL ?? "",
      subject: "RESET PASSWORD",
      html: htmlOutput.html,
    };

    await sgMail.send(msg);

    return res.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

export default forgotPassword;
