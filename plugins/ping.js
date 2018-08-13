var bot = require('./modules/router');

const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, "ping.js"), function(err, stats) {
  let help = {
    name: "Ping",
    modified: stats.mtime,
    commands: {
      ping: {
        desc: "Replys with Pong.",
        example: "ping"
      }
    }
  };
  bot.emit('help', help);
});

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "ping") {
    msg.channel.send('Pong!');
  }
});
