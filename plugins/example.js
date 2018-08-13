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
      },
      eval: {
        desc: "Only people who are Developers on the Bot can use this!",
        example: "eval Number().isNaN('String')"
      }
    }
  };
  bot.emit('help', help);
});

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "getid") {
    msg.channel.send(`Your Discord ID is **${msg.author.id}**`);
  } else if (cmd == 'eval') {
    if (client.developers.indexOf(msg.author.id) > -1) {
      try {
        msg.channel.send(`Eval:\n\`\`\`${eval(args.join(" ").replace(/(token)|(client)|(process)/ig, "dick"))}\`\`\``);
      } catch (e) {
        msg.channel.send(`Eval Error:\n\`\`\`${e}\`\`\``);
      }
    }
  }
});
