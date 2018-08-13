const Discord = require('discord.js');
const client = new Discord.Client();

const router = require('./plugins/modules/router');

const prefix = "!";
const token = "<PUT YOUR TOKEN HERE>"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
  let args = msg.content.split(/ +/);
  if (args[0].indexOf(prefix) > -1) {
    router.emit('cmd', args[0].slice(prefix.length).toLowerCase(), args.shift(), msg, client);
  } else {
    router.emit('chat', msg, client);
  }
});

client.login(token);
