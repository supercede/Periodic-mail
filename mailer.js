const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: "sijuajagun@ymail.com",
    pass: "superced110"
  }
});

const mailOptions = {
  from: "sijuajagun@ymail.com",
  to
};
