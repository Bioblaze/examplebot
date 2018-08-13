var bot = require('./modules/router');

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "getid") {
    msg.reply(`Your Discord ID is **${msg.author.id}**`);
  }
});
