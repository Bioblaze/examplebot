var bot = require('./modules/router');

const fs = require('fs');
const path = require('path');

fs.stat(path.join(__dirname, "example.js"), function(err, stats) {
  let help = {
    name: "Example",
    modified: stats.mtime,
    commands: {
      getid: {
        desc: "Gets your Discord ID",
        example: "getid"
      }
    }
  };
  bot.emit('help', help);
});

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "getid") {
    msg.channel.send(`Your Discord ID is **${msg.author.id}**`);
  }
});
