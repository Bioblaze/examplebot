var bot = require('./modules/router');

var _help = {};

bot.on('help', function(help) {
  _help = Object.assign(help.commands, _help);
});

bot.on('cmd', function(cmd, args, msg, client) {
  if (cmd == "help") {
    if (_help[args[1]] != undefined) {
      msg.channel.send(`Command: ${args[1]}\nDescription: ${_help[args[1]].desc}\nExample: ${_help[args[1]].example}`);
    }
  }
});
