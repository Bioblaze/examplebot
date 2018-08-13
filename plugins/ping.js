var bot = require('./modules/router');

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "ping") {
    msg.reply('Pong!');
  }
});
