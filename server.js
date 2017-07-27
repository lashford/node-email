'use strict';

const express = require('express');
const exit = require('exit');

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
app.get('/', (req, res) => {
  res.send("Hello, this is the Lashford's Wedding RSVP API\n");
});

app.get('/rsvp', (req, res) => {
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var data = {
    from: 'Alex & Katy <alexlashford@gmail.com>',
    to: 'alexlashford@gmail.com',
    subject: 'Thanks for the RSVP',
    text: "Hello,\n\nThanks for taking the time to RSVP, we have your responses.\n\nBe sure to check the website for more information\n\nwww.thelashfordswedding.com\n\nThanks\n\nAlex & Katy"
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    res.send('OK\n');
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
