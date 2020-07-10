const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const humanizeDuration = require("humanize-duration");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity(`Ur mom`, { type: 2 }); //nb!help | nb!invite
});

client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (command.guildOnly && message.channel.type !== "text") {
    return;
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = command.cooldown * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 60000;

      let { cross } = require("./emojis.json");
      let { red } = require("./config.json");

      const cooldownE = new Discord.RichEmbed()
        .setColor(red)
        .setTitle(cross + " Your on cooldown!")
        .setDescription(
          `**Total Cooldown:** 2 hours\n**Next Bump:** In ${timeLeft.toFixed(
            0
          )} minutes`
        )
        //.addField(":bell: Suggestion: Premium", "You don’t want to 2 hours until you can bump? Upgrade to premium!\nTo view more information about premium, use the command `gy!premium`.");

      return message.channel.send(cooldownE);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(client, message, args);
  } catch (e) {
    console.error(e);
    message.author.send("```js\n" + e + "```");
  }
});

client.login(token);
