const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const { Database } = require("wio.db");
const  db  = new Database("Database");
let red = ayarlar.red
let onay = ayarlar.onay
let renk = ayarlar.renk
const prefix = ayarlar.prefix
const desteksunucum = ayarlar.desteksunucum
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await ayarlar.prefix || db.fetch(`prefix_${message.guild.id}`)
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {

    if (perms < cmd.conf.permLevel) return;

    cmd.run(client, message, params, perms);
  }
};


