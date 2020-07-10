const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
   if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")
  const word = args.join(" ")
  if (word < 1) return message.channel.send("Didn't provide any text to embed")
  const embed = new Discord.RichEmbed()
    .setDescription(word)
    .setColor(0x00A2E8);
    message.delete()
  message.channel.send({embed});
}