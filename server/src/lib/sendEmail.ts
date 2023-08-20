import sgMail from "@sendgrid/mail";
import mjml2html from "mjml";

import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

const sendOtp = async (email: string, otp: string) => {
  const mjmlTemplate = fs.readFileSync(
    path.join(__dirname, "../templates/otp.mjml"),
    "utf8"
  );
  const template = Handlebars.compile(mjmlTemplate);
  const mjml = template({ otp });
  const htmlOutput = mjml2html(mjml);
  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL ?? "",
    subject: "OTP",
    html: htmlOutput.html,
  };
  await sgMail.send(msg);
};

export default sendOtp;
