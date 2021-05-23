const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const fs = require('fs');
const DBL = require('dblapi.js');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const ytdl = require('ytdl-core');
const generator = require('generate-password');
const math = require('math-expression-evaluator')
const db = require('quick.db')
const moment = require('moment');
const ms = require('parse-ms');
const GIFEncoder = require('gifencoder');
require('moment-duration-format')
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: [Artemus] > ${props.help.name}.`);
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.login(process.env.TOKEN);

//----------------GİRİŞ-------------------//

  client.on("guildMemberAdd", member => { 
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const tarih = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
  let yetkiliROL = ayarlar.yetkiliROL
 member.roles.add(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:Assassins_tehlikeli:820061702870925342>  \` Hesap Güvenli Değil! \`'
if (tarih > 1296000000) kontrol = '<a:Assassins_guvenilir:820061737868853298>  \` Hesap Güvenli! \`'
  moment.locale("tr");
  let kanal1 = client.channels.cache.get(kanal);
    let giris = new Discord.MessageEmbed()
    .setTitle (`  \ 𒋝 BİENVENİDOS  \  `)
    .setDescription(`
<:Balksz8:837753310899208223>    **Sunucuya Hoş Geldin! ${member} ** **Seninle birlikte  __${member.guild.memberCount}__** ** Kişiyiz! **

<:assassins_d:822360043315920896>   **Öncelikle sunucumuzda kimliğini oluşturmak için** 
                                     \`.profil-kurulum \` **yazarak kimliğinizi oluşturunuz.**
                                    (__Bu komutu <#843264840230764582> kanalında yapınız.__) <a:nlemm:842300606815535115>

<:Balksz9:837753348153147412>   ** Ses kanalına girerek kayıt olabilirsiniz. **

<:assassins_f:822359346376736788>  ** Kayıt için bekleyin ** <@&${yetkiliROL}>  ** kayıt edecektir. **

<:Balksz233:837754623707840623> \` 𒋝 \` ** Tagımızı alarak ekibimize katılabilirsin. **

<:Balksz14:842012152511725639> ** Hesabın oluşturulma tarihi: ** \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \` 

${kontrol} 

`) //splashen
    

    .setImage('https://cdn.discordapp.com/attachments/801730953813688340/803663058366103562/orjin.gif')
    .setFooter(`𒋝 BİENVENİDOS Developed by Synayzen İvar`)
    .setTimestamp()
kanal1.send(giris)
kanal1.send("<@&844277645880590375>")
  }); 

//-------------------------GİRİŞ_SON--------------------------//
//splashen<@&800629483865899008>


//----------------TAGLI_ALIM------------------------------//


client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "𒋝";
    const sunucu = "844277645683195935";
    const log = "844277649521377323";
    const rol = "844277645880590371";
    const elisa = "844277645880590370";
    const pier = "844277645880590369";
    const kız = "844277645855293500";
    const erkek = "844277645814661199";
    const assas = "844277645683195938";
    const isimyaş = "844277645683195936";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(log)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `**${newUser} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim.** **Ailemize hoşgeldin** <a:Assassins_pixelkalp:800605439322488872>`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `**Selam ${
              newUser.username
            }**, **Sunucumuzda Tagımızı Aldığın İçin** ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } **Rolünü Sana Verdim.** **Ailemize hoşgeldin** <a:Assassins_pixelkalp:800605439322488872>`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(log)
          .send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(
                `**${newUser} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);

//-------------------------elisa---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(elisa)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(elisa);
          
//-------------------------elisa---------------------//
//-------------------------pier---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(pier)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(pier);
          
//-------------------------pier---------------------//
//-------------------------kız---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(kız)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(kız);
          
//-------------------------kız-------------------//
//-------------------------erkek---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(erkek)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(erkek);
          
//------------------------erkek--------------------//
//-------------------------assassins---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(assas)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(assas);
          
//------------------------assassins-------------------//
//-------------------------isimyaş---------------------//
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(isimyaş)
      

        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(isimyaş);
          
//------------------------isimyaş-------------------//

     await client.guilds.cache   
      .roles.add(isimyaş);
        
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `**Selam **${
              newUser.username
            }**, **Sunucumuzda Tagımızı Çıkardığın İçin** ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!**`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});


//---------------------TAG_ROL-----------------------//

//---------------TAG_MESAJI------------------------//

client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tagal') {
    msg.channel.send('** 𒋝 **')  // bunu düzeltirsiniz normalde otomatik siliyordu ama böyle daha olur diye düzeltim : D  veya cimrilik yaptım
   }
}); 
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tektag') {
    msg.channel.send('** 𒋝 **')  // bunu düzeltirsiniz normalde otomatik siliyordu ama böyle daha olur diye düzeltim : D  veya cimrilik yaptım
   }
}); 
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tektag hocam') {
    msg.channel.send('** 𒋝 **')  // bunu düzeltirsiniz normalde otomatik siliyordu ama böyle daha olur diye düzeltim : D  veya cimrilik yaptım
   }
}); 
client.on("message", async msg => {
  if (msg.content.toLowerCase() === 'tag') {
    msg.channel.send('** 𒋝 **')  // bunu düzeltirsiniz normalde otomatik siliyordu ama böyle daha olur diye düzeltim : D  veya cimrilik yaptım
   }
}); 


//-------------MESAJ_LOG-----------------------------//

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let slog = newMessage.guild.channels.cache.find(c => c.name === "844277649165123643") // idli şekle getirirsin istiyorsan düzeltirsin
  if (oldMessage.content == newMessage.content) return;
  let sikerimemreyi = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL())
  .addField("Kullanıcı", newMessage.author)
  .addField("Eski Mesaj", oldMessage.content, true)
  .addField("Yeni Mesaj", newMessage.content, true)
  .addField("Kanal Adı", newMessage.channel.name, true)
  .addField("Mesaj ID", newMessage.id, true)
  .setThumbnail(newMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  slog.send(sikerimemreyi)
});
client.on("messageDelete", async (deletedMessage) => {
if(deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let slog = deletedMessage.guild.channels.cache.find(c => c.name === "844277649165123643")// idli şekle getirirsin istiyorsan düzeltirsin
  let jauscoolama = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
  .addField("Kullanıcı", deletedMessage.author)
  .addField("Silinen Mesaj", deletedMessage.content, true)
  .addField("Kanal Adı", deletedMessage.channel.name, true)
  .addField("Mesaj ID", deletedMessage.id, true)
  .setThumbnail(deletedMessage.author.avatarURL)
  .setFooter(`Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours()+3}:${deletedMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  slog.send(jauscoolama)
});

//-----------FOTO_CHAT_LOG---------------------//

function extension(attachment) {

    let imageLink = attachment.split('.');

    let typeOfImage = imageLink[imageLink.length - 1];

    let image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);

    if (!image) return '';

    return attachment;

}

client.on('message', async message => {

if(message.channel.id === 'foto-chat-log') {

  let image = message.attachments.size > 0 ? await extension(message.attachments.array()[0].url) : '';

 if (message.attachments.size < 1) return;

const jausss = new Discord.RichEmbed()

.setImage(image)

client.channels.get('log-kanalı').send(jausss)

}})




client.on("ready", () => {
  client.channels.cache.get("844277647344533545").join();
});

//-----------------BOTUN_SESLİDE_KALMASI

const Discord1 = require('discord.js');
const client2 = new Discord.Client();
client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("Streamstatus AKIYORR")

client.user.setActivity(`Synayzen lvar 💕 Assassin's Creed Family`, {
type: "STREAMING",
url: "https://www.twitch.tv/synayzen"})
    .then(presence => console.log(`HAZIR KAPTAN ASSASSİNS!  ${presence.game ? presence.game.none : '🛠'}`))
    .catch(console.error);
});

//-----------------------------//

//-----------------------KOMUTLAR-----------------------\\

const iltifatlar1 = [
  " \n <a:twicth_siyah:839090517115535391> Sizin oy vermeniz,  **𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲** 'i discord public sunucular arasında zirveye taşıyıcaktır. \n <a:twicth_siyah:839090517115535391> Oy verebilmek için <#831909305656672306> kanalına,  \` /like \` yazmanız yeterlidir. \n Bu işlemi __3 saat' de bir tekrar edebilirseniz__ ne mutlu hepimize. \n <a:twicth_siyah:839090517115535391> Oy veren herkese teşekkürler.<a:ugen:838420877330219088> \n <a:mor_alev:838421339827470367> <@&800108734968758293> <a:mor_alev:838421339827470367>",
 " \n <a:twicth_siyah:839090517115535391> Sizin oy vermeniz,  **𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲** 'i discord public sunucular arasında zirveye taşıyıcaktır. \n <a:twicth_siyah:839090517115535391> Oy verebilmek için <#831909305656672306> kanalına,  \` /like \` yazmanız yeterlidir. \n Bu işlemi __3 saat' de bir tekrar edebilirseniz__ ne mutlu hepimize. \n <a:twicth_siyah:839090517115535391> Oy veren herkese teşekkürler.<a:ugen:838420877330219088> \n <a:mor_alev:838421339827470367> <@&800108734968758293> <a:mor_alev:838421339827470367>",
" \n <a:twicth_siyah:839090517115535391> Sizin oy vermeniz,  **𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲** 'i discord public sunucular arasında zirveye taşıyıcaktır. \n <a:twicth_siyah:839090517115535391> Oy verebilmek için <#831909305656672306> kanalına,  \` /like \` yazmanız yeterlidir. \n Bu işlemi __3 saat' de bir tekrar edebilirseniz__ ne mutlu hepimize. \n <a:twicth_siyah:839090517115535391> Oy veren herkese teşekkürler.<a:ugen:838420877330219088> \n <a:mor_alev:838421339827470367> <@&800108734968758293> <a:mor_alev:838421339827470367>",
" \n <a:twicth_siyah:839090517115535391> Sizin oy vermeniz,  **𝐀𝐬𝐬𝐚𝐬𝐬𝐢𝐧'𝐬 𝐂𝐫𝐞𝐞𝐝 𝐅𝐚𝐦𝐢𝐥𝐲** 'i discord public sunucular arasında zirveye taşıyıcaktır. \n <a:twicth_siyah:839090517115535391> Oy verebilmek için <#831909305656672306> kanalına,  \` /like \` yazmanız yeterlidir. \n Bu işlemi __3 saat' de bir tekrar edebilirseniz__ ne mutlu hepimize. \n <a:twicth_siyah:839090517115535391> Oy veren herkese teşekkürler.<a:ugen:838420877330219088> \n <a:mor_alev:838421339827470367> <@&800108734968758293> <a:mor_alev:838421339827470367>"
];

var iltifatSayi = 0; 
client.on("message", async message => {
  if(message.channel.id !== "844277646732689451" || message.author.bot) return;
  iltifatSayi++
  if(iltifatSayi >= 200) { // 20 yazan yer, 20 mesajda bir iltifat edeceğini gösterir, değiştirebilirsiniz.
    iltifatSayi = 0;
    const pinkcode = Math.floor(Math.random() * ((iltifatlar1).length - 1) + 1);
    message.reply(`**${(iltifatlar1)[pinkcode]}**`);
  };
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let ozelhosgeldin = await db.fetch(`ozelhosgeldin_${member.guild.id}`);
  if (!ozelhosgeldin) return;

  member.send(
    ozelhosgeldin
      ? ozelhosgeldin
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});

client.on("guildMemberRemove", async member => {
  let ozelgorusuruz = await db.fetch(`ozelgorusuruz_${member.guild.id}`);
  if (!ozelgorusuruz) return;

  member.send(
    ozelgorusuruz
      ? ozelgorusuruz
          .replace("-sunucu-", `\`${member.guild.name}\``)
          .replace("-kullanıcı-", `\`${member.user.tag}\``)
      : ``
  );
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////


client.on("message", msg => {
var dm = client.channels.cache.get("845235521810857994")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("#2baa05")
.setThumbnail(`${msg.author.avatarURL()}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)
dm.send("<@&844277645995016208>")
dm.send(botdm)

}
if(msg.channel.bot) return;
});


