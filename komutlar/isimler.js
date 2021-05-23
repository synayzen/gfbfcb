const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, users, args) => {

if(!message.member.roles.cache.some(r => [(ayarlar.yetkilirol)].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply(`Bu komutu sadece yetkililer kullanabilir!!!`).then(x => x.delete({timeout:5000}))
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir kullanıcı belirt.`).then(x => x.delete({timeout:5000}))

let user = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let isim = message.mentions.members.first() || message.guild.members.get(args[0]);
var sayi = 1 
let data = db.get(`isim.${message.guild.id}`)
let rol = db.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new MessageEmbed()
    .setTitle("İSİM GEÇMİŞİ")
    .setColor("0x2f3136") 
    .setDescription(`
      ${isim} İsim Geçmişi.`)
    .setColor("0x2f3136"))
    let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>)\n`).join("\n")
if(isimler === null) isimler = "Bu Kullanıcının Eski İsimleri Bulunamadı"
if(isimler === undefined) isimler = "Bu Kullanıcının Eski İsimleri "


const embed = new MessageEmbed()
    .setTitle(`
     İsim Geçmişi`)
    .setColor("0x2f3136")
    .setDescription(`
    ${isimler} \n ${user} Kullanıcısının Eski İsimleri.`)
    .setColor("#e99546")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['isimler', 'eski-isim','detay'],
  permLevel: 0,
}

exports.help = {
      name: "isimler"
  
}