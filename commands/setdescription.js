const Discord = require("discord.js");
const db = require("quick.db");
let e = require("../emojis.json");
let config = require("../config.json");

module.exports = {
  name: "setdescription",
  description: "Use this command to set your server's description.",
  guildOnly: true,
  execute(client, message, args) {
    
    if(message.member.hasPermission("MANAGE_GUILD")) {
    
        const desc = args.join(" ");
        if (args[0] === "reset") {
          let newValue = new Discord.RichEmbed()
            .setTitle(e.check + " Description has been changed")
            .setColor(config.blue)
            .setDescription("__**New Description:**__ None")
            .addField(
              "<:ImportantNotice:704749241569902673> **Important Notice: Description required**",
              "Please note that you to set your description again if you want to continue using the bot."
            );

          message.channel.send(newValue);
          db.set(`desc_${message.guild.id}`, null);
        } else {
          if (desc.length < 1882) {
            if (desc.length < 128) {
              let newValue = new Discord.RichEmbed()
                .setTitle(e.check + " Description has been changed")
                .setColor(config.blue)
                .setDescription("__**New Description:**__\n" + desc + "")
                .addField(
                  "**:bell: Suggestion: Length**",
                  "We recommend choosing a description of at least 128 characters so that potential members know what your server is about."
                );

              message.channel.send(newValue);
              db.set(`desc_${message.guild.id}`, desc);
            }
            if (desc.length > 128) {
              let newValue = new Discord.RichEmbed()
                .setTitle(e.check + " Description has been changed")
                .setColor(config.blue)
                .setDescription("__**New Description:**__\n" + desc + "");

              message.channel.send(newValue);
              db.set(`desc_${message.guild.id}`, desc);
            }
          } else {
            const perm = new Discord.RichEmbed()
              .setTitle("<:cross:704749238634020924> **Description Error**")
              .setColor(config.red)
              .setDescription("Exceeds character count");

            message.channel.send(perm);
          }
        }
    }
  }
};