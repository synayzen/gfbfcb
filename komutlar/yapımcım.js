//----------------YAPIMCIM-----------------------------//
const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  const davet = new Discord.MessageEmbed()
  .setColor("#2baa05")
  .setTitle("Yapımcılar")
  .setDescription("[**Yapımcım = <@595903529898737664>**]() \n [**Developed by Synayzen İvar 💖 **]()")
  message.channel.send(davet)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: '',
  usage: ''
};