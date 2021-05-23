const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {

  
    const jaus1 = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setAuthor(message.author.username, message.author.avatarURL())
    .setDescription('**Bot Ping ** = **`' + client.ws.ping + '`** **ms**')
    .setFooter('Anlık Botun Pingi');
    message.react('822359346376736788')// tepki vermesini vermek istiyorsanız  emoji id girin
  
   message.channel.send(jaus1).then(m => m.delete(50000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Pingi gösterir.',
  usage: 'ping'
};

