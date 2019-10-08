const cron = require("node-cron");
const nodemailer = require("nodemailer");

const chosenMail = {
  subject: "You are team lead",
  html: `<h1>Congratulations! </h1> <p>You've been chosen as team lead for one week.</p>`
};

const expiredMail = {
  subject: "And now your watch has ended",
  html: `<h1>Hello! </h1> <p>You had a good run, let someone else take the mantle</p>`
};

const sendMail = (user, message) => {
  const transporter = nodemailer.createTransport({
    service: "yahoo",
    auth: {
      user: "***********",
      pass: "***********"
    }
  });

  const mailOptions = {
    from: "sijuajagun@ymail.com",
    to: user.mail,
    ...message
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Mail sent");
    }
  });
};

const users = [
  {
    name: "Ali",
    mail: "***********"
  },
  {
    name: "Johnbull",
    mail: "***********"
  },
  {
    name: "Timaya",
    mail: "***********"
  },
  {
    name: "Timaya",
    mail: "***********"
  }
];

let usersCopy = [...users];

const activeUsers = [];

const randomize = () => {
  const random = Math.floor(Math.random() * usersCopy.length);
  const lead = usersCopy.splice(random, 1)[0];
  if (activeUsers.length == 0) {
    sendMail(lead, chosenMail);
  }

  activeUsers.push(lead);

  if (usersCopy.length === 0) {
    usersCopy = [...users];
  }

  console.log(lead);

  if (activeUsers.length == 2) {
    sendMail(activeUsers[0], expiredMail);
    sendMail(activeUsers[1], chosenMail);
    activeUsers.shift();
  }
};

cron.schedule("0 */2 * * * *", () => {
  randomize();
});
