const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);
const { Database } = require("wio.db")
const db = new Database("Database");


const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.login(ayarlar.token).then(c => console.log(`${client.user.tag} olarak giriş yapıldı!`)).catch(err => console.error("Bota giriş yapılırken başarısız olundu!"));


client.on('guildMemberRemove', async member => {
  const altyapisunucusu = db.fetch(`altyapisunucu.${member.guild.id}`);
    const anasunucu = db.fetch(`anasunucu.${member.guild.id}`);
     const logkanal = db.fetch(`logkanal.${member.guild.id}`);
  if (client.guilds.cache.get(anasunucu)) {
    if (member.guild.id === anasunucu) {
      if (client.guilds.cache.get(altyapisunucusu)) {
        if (client.guilds.cache.get(altyapisunucusu).members.cache.get(member.id))
        {


          client.guilds.cache.get(altyapisunucusu).members.ban(member, { reason: 'Ana Sunucudan Çıktı' })
          client.channels.cache.get(logkanal).send(`<@${member.id}> **Ana Sunucudan Ayrıldığı İçin Altyapı Sunucusundan Banlandı Veya Altyapı Sunucusunda Mevcut Değil** `)
        } else {
          client.channels.cache.get(logkanal).send(`<@${member.id}> **Ana Sunucudan Ayrıldığı İçin Altyapı Sunucusundan Banlandı Veya Altyapı Sunucusunda Mevcut Değil**`)
        }
      } 
    }
  } 
})