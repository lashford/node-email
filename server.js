'use strict';

const express = require('express');
const exit = require('exit');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Helper functions
function envVarError(name) {
  console.log("***************************");
  console.log("Environment Variable `" + name + "` not set");
  console.log("\n");
  exit(1);
}

// Validate Environment Variables
var api_key = process.env.apiKey; // Mailgun API Key
api_key ? console.log("apiKey = "+ api_key) : envVarError("apiKey");
var domain = process.env.domain; // Mailgun API Key
domain ? console.log("domain = "+ domain) : envVarError("domain");

// Start Express App and expose API
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Hello, This Is The Lashford's Wedding RSVP API\n");
});

app.post('/rsvp', (req, res) => {
  //console.log("request body %j", req.body);

  // File Append
  var fs = require('fs');
  var ts = new Date();
  fs.appendFile(`./rsvp/${ts.getTime()}.txt`, 'new data', function (err) {
    if (err) {
      console.log("request body %j", req.body);
    } else {
      console.log("RSVP Completed");
    }
  })

  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var responseData = {
    from: 'Alex & Katy <alexlashford@gmail.com>',
    to: `${req.body.email}`,
    subject: 'Thanks for the RSVP',
    text: "Hello,\n\nThanks for taking the time to RSVP, we have your responses.\n\nBe sure to check the website for more information\n\nwww.thelashfordswedding.com\n\nThanks\n\nAlex & Katy"
  };
  mailgun.messages().send(responseData, function (error, body) {
    console.log(body);
    res.send('Response Sent OK\n');
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
