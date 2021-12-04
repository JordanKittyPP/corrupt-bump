const Discord = require('discord.js')
const db = require('quick.db')
let color = require("../config.json")
let e = require("../emojis.json")

module.exports = {
  name: 'bump',
  description: "Use this command to bump your server.",
  aliases: ["pbump", "brodcast"],
  guildOnly: true,
  cooldown: 7200,
  execute(client, message, args, config) {
    const desc = db.fetch(`desc_${message.guild.id}`);
    const iCode = db.fetch(`inviteLink_${message.guild.id}`);
    let chan = db.fetch(`channelID_${message.guild.id}`)
    
    
    
    let regions = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "europe": "Europe",
        "us-central": "US Central",
        "sydney": "Sydney",
        "us-east": "US East",
        "us-south": "US South",
        "us-west": "US West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP US East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong",
        "russia": "Russia",
        "southafrica": "South Africa"
    };
    
    let bumpEmbed = new Discord.RichEmbed()
      .setThumbnail(message.guild.iconURL)
      .setColor(color.blue)
      .setTitle("**"+message.guild.name+"**")
      .setDescription(`${e.owner} **Owner:** \`${message.guild.owner.user.tag}\`\n${e.region} **Region:** \`${regions[message.guild.region]}\`\n${e.created} **Created:** \`${message.guild.createdAt.toUTCString().substr(0, 16)}\`\n\n${desc}`)
      .addField(`${e.link} Inivte Link`, `https://discord.gg/${iCode}`)
      .addField(`<:members:704749241506988163> Members`, `<:online:707759873407844412> ${message.guild.members.filter(m => m.presence.status === 'online').size} Online<:transparent:707985440451461190><:offline:707759875362390097> ${message.guild.memberCount} Members`)
      .setFooter("Bumped by "+message.author.tag, message.author.avatarURL)
      .setTimestamp();
    
    if(iCode === null) {
      const missInvite = new Discord.RichEmbed()
          .setTitle("<:cross:704749238634020924> Your guild is not ready yet!")
          .setColor(color.red)
          .setDescription("**Missing:** Invite")
          .addField(
            "**:bell: Suggestion: Help Command**",
            "Check out `vb!help` to see how to set the missing values above."
          );
      
      message.chnanel.send(missInvite)
    } else if(desc === null) {
      const missDesc = new Discord.RichEmbed()
          .setTitle("<:cross:704749238634020924> Your guild is not ready yet!")
          .setColor(color.red)
          .setDescription("**Missing:** Description")
          .addField(
            "**:bell: Suggestion: Help Command**",
            "Check out `vb!help` to see how to set the missing values above."
          );
      
      message.chnanel.send(missDesc)
    } else if(chan === null) {
      const missDesc = new Discord.RichEmbed()
          .setTitle("<:cross:704749238634020924> Your guild is not ready yet!")
          .setColor(color.red)
          .setDescription("**Missing:** Channel")
          .addField(
            "**:bell: Suggestion: Help Command**",
            "Check out `vb!help` to see how to set the missing values above."
          );
      
      message.chnanel.send(missDesc)
    } else {
    
      client.guilds.forEach(async g => {
          let setting = db.fetch(`channelID_${g.id}`);
          let settingChan = client.channels.get(setting);
          settingChan.send(bumpEmbed);
        });
    } 
  },
};