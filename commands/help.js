const { prefix } = require("../config.json");
const { RichEmbed } = require("discord.js");

// You can play with the help embed. Dosent really matter how its structured. Just dont edit the bottom part.

module.exports = {
  name: "help",
  description: "This command shows the list of commands.",
  usage: "<command>",
  guildOnly: true,
  execute(client, message, args) {
    const data = [];
    const { commands } = message.client;
    let requested = `Requested by ${message.author.tag}`

    if (!args.length) {
      const Links = new RichEmbed()
        .setTitle(" Help")
        .setColor("#3377d0")
        .setThumbnail(client.user.avatarURL)
        .addField("")
        .setFooter("")
        .setTimestamp();

      return message.channel.send(Links);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      const nFound = new RichEmbed()
        .setTitle("<:cross:704749238634020924> **Error**")
        .setColor("#fe0600")
        .setDescription(
          "That command could not be found."
        );

      return message.channel.send(nFound);
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Syntax:** ${command.name} ${command.usage}`);

    if (!command.usage && !command.aliases) {
      const Links = new RichEmbed()
          .setTitle(":information_source: **gy!" + command.name + "**")
          .setColor("#6a8ccd")
          .setDescription(
            "**Syntax:** " +
              command.name +
              `\n**Aliases:** None` +
              `\n**Description:** ${command.description}`
          );
        message.channel.send(Links);
    } else if (!command.usage) {
      const Links = new RichEmbed()
          .setTitle(":information_source: **gy!" + command.name + "**")
          .setColor("#6a8ccd")
          .setDescription(
            "**Syntax:** " +
              command.name +
              `\n**Aliases:** ${command.aliases.join(", ")}` +
              `\n**Description:** ${command.description}`
          );
        message.channel.send(Links);
    } else if (!command.aliases) {
      if(!command.usage) {
        const Links = new RichEmbed()
          .setTitle(":information_source: **gy!" + command.name + "**")
          .setColor("#6a8ccd")
          .setDescription(
            "**Syntax:** " +
              command.name +
              `\n**Aliases:** None` +
              `\n**Description:** ${command.description}`
          );
        message.channel.send(Links);
      } else {
        const Links = new RichEmbed()
          .setTitle(":information_source: **gy!" + command.name + "**")
          .setColor("#6a8ccd")
          .setDescription(
            "**Syntax:** " +
            command.name +
            " " +
            command.usage +
              `\n**Aliases:** None` +
              `\n**Description:** ${command.description}`
          );
        message.channel.send(Links);
      }
    } 
    if(command.aliases === true) {
      const Links = new RichEmbed()
        .setTitle(":information_source: **gy!" + command.name + "**")
        .setColor("#6a8ccd")
        .setDescription(
          "**Syntax:** " +
            command.name +
            " " +
            command.usage +
            `\n**Aliases:** ${command.aliases.join(", ")}` +
            `\n**Description:** ${command.description}`
        );
      message.channel.send(Links);
    }
    
  }
};
