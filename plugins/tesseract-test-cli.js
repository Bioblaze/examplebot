

const url = "https://cdn.discordapp.com/attachments/481227815577059353/484411949182877706/DSuznu1VQAEO_fG.png";
const fs = require('fs');
const path = require('path');

var _Tesseract = require('tesseract.js');
var request = require('request').defaults({ encoding: null });

var Tesseract = _Tesseract.create({
  workerPath: path.join(__dirname, '../node_modules', 'tesseract.js/src/node/worker.js'),
  langPath: path.join(__dirname, 'langs/'),
  corePath: path.join(__dirname, '../node_modules', 'tesseract.js/src/node/index.js')
});

var _options = {
  url: url,
  method: "GET",
  encoding: null
};
request(_options, function(err, res, body) {
  if (!err) {
    Tesseract.recognize(body, { lang: path.resolve(__dirname, 'langs/eng') }).then(function(data) {
      console.log("Image 2 Text: " + data.text);
    }).catch(function(err) {
      console.log("There was a Error Decyphering your Image: " + err);
    });
  } else {
    console.log("There was a Error during the request: " + err);
  }
});
