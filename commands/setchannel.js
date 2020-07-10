const { RichEmbed } = require("discord.js");
const emoji = require("../emojis.json")
const color = require("../config.json")
const db = require("quick.db")

module.exports = {
  name: "setchannel",
  description: "Use this command to set your server's bump channel.",
  usage: "[channel|reset]",
  guildOnly: true,
  execute(client, message, args) {

    let syntaxError = new RichEmbed()
    .setTitle(`${emoji.cross} Syntax Error`)
    .setColor(color.red)
    .setDescription("Missing arguments - `gy!setchannel [channel|reset]`");

      if(message.member.hasPermission("MANAGE_GUILD")) {
        
        let channelID = message.content.replace(/\D/g, "");

        if(args[0] === `<#${channelID}>`) {

            let channel = client.channels.get(channelID);

                let missingReadPerm = new RichEmbed()
                    .setColor(color.red)
                    .setTitle(emoji.cross + " Channel is not elgible")
                    .setDescription("- The `@everyone` role needs the `Read Messages` permisssion!")

                let missingReadPerm2 = new RichEmbed()
                    .setColor(color.red)
                    .setTitle(emoji.cross + " Channel is not elgible")
                    .setDescription("- The `@everyone` role needs the `Read Messages` permisssion!\n- The `@everyone` role needs the `Read Message History` permisssion!")

                let {id} = message.guild.defaultRole, 
                ow = channel.permissionOverwrites.get(id);

                if (!isNaN(args[0])) return message.channel.send(syntaxError);

                let newValue = new RichEmbed()
                    .setTitle(emoji.check + " Channel has been changed")
                    .setColor(color.blue)
                    .setDescription("__**New Channel:**__ <#" + channelID + ">");

                message.channel.send(newValue).then(m => {
                    db.set(`channelID_${message.guild.id}`, channelID);
                });
            } else if(args[0] === "reset") {
                if (!isNaN(args[0])) return message.channel.send(syntaxError);

                let newValue = new RichEmbed()
                    .setTitle(emoji.check + " Channel has been changed")
                    .setColor(color.blue)
                    .setDescription("__**New Channel:**__ None");

                message.channel.send(newValue).then(m => {
                    db.delete(`channelID_${message.guild.id}`);
                });
            } else {
                message.channel.send(syntaxError)
            }
        }      
    },
};