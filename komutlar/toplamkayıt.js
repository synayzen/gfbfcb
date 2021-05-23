const Discord = require("discord.js");
const db = require('quick.db');


exports.run = async (client, message, args) => {//splashen
  let yetkili = message.author
let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`)
let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`)
let toplam = erkek+kız
var embed = new Discord.MessageEmbed()
.setTitle(`• \`Kayıt Bilgileri\``)
 .setFooter(`𒋝 BİENVENİDOS Developed by Synayzen İvar`)
.setDescription(`

➠  **Yetkili :** ${yetkili}   \`  \`

➠  **Toplam üye kayıt sayısı :** \` ${toplam} \`

➠  **Toplam kız kayıt sayısı :** \` ${kız} \`

➠  **Toplam erkek kayıt sayısı :** \` ${erkek} \`



`)
.setThumbnail(yetkili.avatarURL)
.setImage('')
message.reply(embed)

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ks', 'kayıtsayısı'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtlarım'
};//splashen