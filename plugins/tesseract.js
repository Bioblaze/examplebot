var bot = require('./modules/router');

const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, "example.js"), function(err, stats) {
  let help = {
    name: "Tesseract",
    modified: stats.mtime,
    commands: {
      process: {
        desc: "This Processes a Image Posted by someone.",
        example: "getid"
      },
      getrole: {
        desc: "This will check if the Image Posted has a Specific Set of Characters, and give them a Role for it.",
        example: "eval Number().isNaN('String')"
      }
    }
  };
  bot.emit('help', help);
});

var _Tesseract = require('tesseract.js');
var request = require('request').defaults({ encoding: null });

var Tesseract = _Tesseract.create({
  workerPath: path.join(__dirname, '../node_modules', 'tesseract.js/src/node/worker.js'),
  corePath: path.join(__dirname, '../node_modules', 'tesseract.js/src/node/index.js')
});

var _settings = {
  chars: ['$'], // Change THIS!
  server: "1341234123434123", // Change This
  channel: "123412341234124", // Change This
  role: "1234123412341234" // Change This
};

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "process") {
    if (msg.attachments.size > 0) {
      var _attachments = msg.attachments.array();
      var _options = {
        url: _attachments[0].url,
        method: "GET",
        encoding: null
      };
      request(_options, function(err, res, body) {
        if (!err) {
          Tesseract.recognize(body, { lang: path.resolve(__dirname, 'langs/eng') }).then(function(data) {
            msg.channel.send("Image 2 Text: " + data);
          }).catch(function(err) {
            msg.channel.send("There was a Error Decyphering your Image: " + err);
          });
        } else {
          msg.channel.send("There was a Error during the request: " + err);
        }
      });
    }
  } else if (cmd == 'getrole') {
    if (msg.guild.id == _settings.server) {
      if (msg.channel.id == _settings.channel) {
        if (msg.attachments.size > 0) {
          var _attachments = msg.attachments.array();
          var _options = {
            url: _attachments[0].url,
            method: "GET",
            encoding: null
          };
          request(_options, function(err, res, body) {
            if (!err) {
              Tesseract.recognize(body, { lang: path.resolve(__dirname, 'langs/eng') }).then(function(data) {
                if (_settings.chars.some(c => { return data.indexOf(c) > -1; })) {
                  msg.member.addRole(_settings.role);
                  msg.channel.send("Here is your Role!");
                } else {
                  msg.channel.send("Sorry but I couldnt find any Characters from my List! Please make sure it contains one of the Following: " + _settings.chars.join(","));
                }
              }).catch(function(err) {
                msg.channel.send("There was a Error Decyphering your Image: " + err);
              });
            } else {
              msg.channel.send("There was a Error during the request: " + err);
            }
          });
        }
      }
    }
  }
});
