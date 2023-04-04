//====required modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const { log } = require("console");
const wordlist = require("wordlist-english");
const rn = require("random-number");
let date_ob = new Date();
const cron = require("node-cron");
const app = express();

//const variables
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const hours = date_ob.getHours();
const minutes = date_ob.getMinutes();

function sleep() {
  // setTimeout(sleep, 24 * 60 * 60 * 1000);
}

app.use(bodyParser.urlencoded({ extended: true }));

// below is the code for  N O D E M A I L E R
function nodeMailer() {
  var transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: "vasishtpranav.udathu@gmail.com,vasishtpranav_hari@srmap.edu.in",//mails here
    subject: "Your word for today",
    text: "hai!!!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
// everything about N O D E M A I L E R  ends here

app.get("/", (req, res) => {
  cron.schedule(
    "45 12 * * 0-7",
    () => {
      var options = {
        min: 2,
        max: 4000,
        integer: true,
      };
      ran = rn(options);
      var bizarreEnglishWords = wordlist["english/70"];
      var commonEnglishWords = wordlist["english/70"];
      eng = bizarreEnglishWords.slice(ran, ran + 1);
      def = url + eng;
      res.send(eng + def);
      console.log(eng + def + "\n" + hours + ":" + minutes);
      nodeMailer();
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata",
    }
  );
});

app.listen(3000, () => {
  console.log("running on the web");
});
