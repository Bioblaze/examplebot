const Discord = require('discord.js');
const client = new Discord.Client();

const path = require('path');

const router = require('./plugins/modules/router');

var Plugins = require('require-all')({
  dirname: path.join(__dirname, 'plugins'),
  excludeDirs: /^\.(modules|classes|data)$/,
  filter: /^.+\.js$/
});

const prefix = "!";
const token = "<PUT YOUR TOKEN HERE>";
const developers = ['165372475562000385'];
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.developers = developers;
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
