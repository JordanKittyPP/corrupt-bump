const { prefix } = require("../config.json");
const { RichEmbed } = require("discord.js");
const bot = require("../info.json");

module.exports = {
  name: "about",
  description: "Use this command to view information on the bot..",
  aliases: ["info", "information", "invite", "support"],
  guildOnly: true,
  args: false,
  execute(client, message, args) {
    let three = "```";
    let requested = `Requested by ${message.author.tag}`;

    let about = new RichEmbed()
      .setColor("6a8ccd")
      .setThumbnail(client.user.avatarURL)
      .setTitle("About")
      .addField("Bot Library", three + "Discord.js" + three, true)
      .addField("Library Version", three + "11.5.1" + three, true)
      .addField("Bot Version", three + "Beta V1" + three, true)
      .addField("Owner", three + "Zenix#0003" + three, true)
      .addField(`**Invite Bot:**`, `[Click Here](${bot.invite})`, true)
      .addField(`**Upvote Bot:**`, `Coming Soon`, true)
      .addField(`**Support Server:**`, `[Click Here](${bot.server})`, true)

    message.channel.send(about);
  }
};
