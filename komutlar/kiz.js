const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {//splashen

    let kadınROL = ayarlar.kadınROL 
    let kayıtsızROL = ayarlar.kayıtsızROL
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.yetkiliROL
    let kayıtLOG = ayarlar.kayıtLOG
    let ELİSEDELASERRE = ayarlar.ELİSEDELASERRE

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu işlemi sadece yetkililer yapabilir <a:Assassins_pixelkalp:800605439322488872>')


if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = '❌Şüpheli'
if (kurulus > 1296000000) kontrol = '✅Güvenli'
  
  
  
let isim = args[1];
if(!isim) return message.channel.send(`Üyenin ismini belirtmelisin.`)
if(isim.length > 16) return message.channel.send(`Daha kısa bir isim yaz.`)

let yaş = args[2];
if(!yaş) return message.channel.send(`Üyenin yaşını belirtmelisin.`)
if(yaş.length > 100) return message.channel.send(`Üyenin yaşı 100'den büyük olamaz.`)
  
const emb = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setTimestamp()
.setColor(`#fffff0`)
.setFooter(`Kayıt Başarılı`)
let kız = db.fetch(`kız_${message.author.id}_${message.guild.id}`)
let erkek = db.fetch(`erkek_${message.author.id}_${message.guild.id}`)
let toplam = erkek+kız
message.guild.members.cache.get(kullanıcı.id).setNickname(` ${isim} | ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(kadınROL)
message.guild.members.cache.get(kullanıcı.id).roles.add(ELİSEDELASERRE)
message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL)
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`<a:assassins_Yonok:827100827943960576> Kaydın başarıyla ${message.author} tarafından yapıldı.\n \n <a:assassins_Yonok:827100827943960576> Sunucudaki İsmin :\` ${isim} | ${yaş} \` \n \n <a:assassins_Yonok:827100827943960576>  <#844277646430568481> kanalımızı okumayı unutma! <a:Assassins_pixelkalp:800605439322488872> \n \n <a:assassins_Yonok:827100827943960576>  𒋝  Tagımızı alarak ekibimize katılabilirsin. \n  \n <a:assassins_Yonok:827100827943960576> Aşağıdan rollerini alabilirsin \n <a:Rgb_ok:833453160713814056> <#844277646732689457> <a:Rgb_ok:833453160713814056> <#844277647093530645> <a:Rgb_ok:833453160713814056> <#844277647093530646>  <a:Rgb_ok:833453160713814056> <#844277647093530647> \n \n <a:assassins_Yonok:827100827943960576> 𝖀𝖓𝖚𝖙𝖒𝖆 𝕭𝖎𝖊𝖓𝖛𝖊𝖓𝖎𝖉𝖔𝖘𝖑𝖚 𝖔𝖑𝖒𝖆𝖐 𝖆𝖞𝖗𝖎𝖈𝖆𝖑𝖎𝖐𝖙𝖎𝖗 <:Assassins_:822360019626491954>`))
  db.add(`kız_${message.author.id}_${message.guild.id}`, "1")
let embed2 = new Discord.MessageEmbed()
.setTitle(`• Bir Kullanıcı Kayıt Oldu.`)
.setDescription(`
• **Kayıt Olan Kullanıcı:** ${kullanıcı} \`  { ${kullanıcı.id} } \` 
• **İsim Yaş:** \` ${isim} | ${yaş} \`
• **Verilen Rol:** <@&${kadınROL}> \`   ♀ \` 
• **Verilen Rol:** <@&${ELİSEDELASERRE}> \`    \` 
• **Bu Hesap:** \`  { ${kontrol} }  \` 
• **Sunucumuz şu an** \` ${message.guild.members.size} \`** kişi **
• **Kayıt eden:** ${message.author} \`  { ${message.author.id} }  \` 
• **{ ${message.author} } Toplam kayıt sayısı =**  \` ${toplam} \` 

• **{    __Toplam Erkek Kaydı =  \` ${erkek} \` Toplam Kız Kaydı= \` ${kız} \`__  }**  
`)
.setImage('')

let kanal = client.channels.cache.get(ayarlar.Genelchat)
if(kanal) kanal.send(`\` 𒋝 \` ${kullanıcı},** Ailemize Hoş geldin ** <#844277646430568481> ** kanalından kurallarımızı öğrenebilirsin.\n İyi eğlenceler ** <a:Assassins_pixelkalp:800605439322488872>`)


client.channels.cache.get(ayarlar.kayıtLOG).send(embed2)
let embed3 = new Discord.MessageEmbed()
.setTitle(`Kayıt Başarılı.`)
.setDescription(`
• **Kayıt edilen:** ${kullanıcı} \`    \` 
• **Verilen Rol:** <@&${kadınROL}> \` ♀   \` 
• **Verilen Rol:** <@&${ELİSEDELASERRE}> \`    \` 
• **Kayıt eden:** ${message.author} \`    \` 
• **Güncellenen isim:** \`  ${isim} | ${yaş} \`
`)
.setImage('')
message.channel.send(embed3)


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k'],
  permLevel: 0
};

exports.help = {
  name: 'kadın'
}//splashen


