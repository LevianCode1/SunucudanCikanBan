const Discord = require('discord.js')
const { Database } = require("wio.db")
const db = new Database("Database");
const ms = require('parse-ms');
const delay = require('delay');
const config = require('../ayarlar.json')
exports.run = async (client, message, args) => {
    if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.author.send(
    new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**| Botu Kullanmadan Önce Lütfen \`Yönetici\` Yetkisi Veriniz**`)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()//❌ | Sunucuda sistem aktif değil.
      .setFooter(client.user.username, client.user.avatarURL())
      .setColor(message.guild.me.displayColor)).then(m => m.delete({timeout: 10000}));
//----------------------------------------------------------------------
  message.delete({timeout: 5000})


  let levian = args[0];

  if(!levian) {
       const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayColor)
      .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setDescription(`**| Hata! Lütfen Argüman Belirtin.**\n\n**Argümanlar**\n\`( ana-sunucu, altyapı-sunucu, log-kanal )\``)

      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL());
    return message.channel.send(embed);
  
  }
  if (levian == `ana-sunucu`) {
let levianarg = args.slice(1).join(' ');
if(!levianarg) return message.reply(`**Lütfen Ayarlamak İstediğiniz Ana Sunucu İDsini Yazın!**`)
db.set(`anasunucu.${message.guild.id}`, levianarg)
    return message.channel.send(`Ana Sunucusu Olarak ${levianarg} IDli Sunucuyu Ayarladınız`);
} else if (levian == `altyapı-sunucu`) {

let levianarg2 = args.slice(1).join(' ');
if(!levianarg2) return message.reply(`**Lütfen Ayarlamak İstediğiniz Altyapı Sunucu İDsini Yazın!**`)
db.set(`altyapisunucu.${message.guild.id}`, levianarg2)
    return message.channel.send(`Altyapı Sunucusu Olarak ${levianarg2} IDli Sunucuyu Ayarladınız`);


} else if (levian == `log-kanal`) {

let levianarg3 = args.slice(1).join(' ');
if(!levianarg3) return message.reply(`**Lütfen Ayarlamak İstediğiniz Log Kanalı İDsini Yazın!**`)
db.set(`logkanal.${message.guild.id}`, levianarg3)
    return message.channel.send(`Log Kanalı Olarak <#${levianarg3}> Kanalını Ayarladınız!`);
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ayarla",
  desciption: "Levian Bot List Sistemi",
  usage: "Levian Bot List Sistemi"
};
