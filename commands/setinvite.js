const { RichEmbed } = require("discord.js");
const emoji = require("../emojis.json")
const color = require("../config.json")
const db = require("quick.db")

module.exports = {
  name: "setinvite",
  description: "Use this command to set your server's invite",
  guildOnly: true,
  execute(client, message, args) {

    let syntaxError = new RichEmbed()
    .setTitle(`${emoji.cross} Syntax Error`)
    .setColor(color.red)
    .setDescription("Missing arguments - `gy!setchannel [channel|reset]`");

      if(message.member.hasPermission("MANAGE_GUILD")) {

                let missingReadPerm = new RichEmbed()
                    .setColor(color.red)
                    .setTitle(emoji.cross + " Channel is not elgible")
                    .setDescription("I can't create an invite here.\nI need the `Create Instant Invite` permission for this channel.")

                let {id} = message.guild.defaultRole, 
                ow = message.channel.permissionOverwrites.get(id);

                if(ow && ow.CREATE_INSTANT_INVITE === true) {
                    message.channel.send(missingReadPerm)
                } else {
                    if (!isNaN(args[0])) return message.channel.send(syntaxError);

                    message.channel.createInvite({
                        unique: true, 
                        maxAge: 0
                    }).then(invite => {
                    let newValue = new RichEmbed()
                    .setTitle(emoji.check + " Invite has been changed")
                    .setColor(color.blue)
                    .setDescription("__**New Invite:**__ https://discord.gg/" + invite.code + "");

                    message.channel.send(newValue)
                        db.set(`inviteLink_${message.guild.id}`, invite.code)
                });
            }
        }      
    },
};