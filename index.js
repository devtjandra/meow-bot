require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const commands = require("./commands/index");

bot.login(TOKEN);

bot.on("message", (msg) => handleMessage(msg));

async function handleMessage(msg) {
  const words = msg.content.split(" ");

  if (msg.author.bot) return;
  if (words.length === 0) return;

  if (words[0] !== "!meow") {
    const response = await commands.react(words);
    response.forEach((element) => {
      msg.react(element);
    });
    return;
  }

  if (words.length === 1) {
    msg.channel.send("Meow what?");
    return;
  }

  switch (words[1].toUpperCase()) {
    case "FACT":
    case "FACTS":
      msg.channel.send("Getting a cat fact, brb.");
      const fact = await commands.facts(msg);
      msg.channel.send(commands.formatCute(fact));
      return;

    case "PIC":
    case "PICS":
    case "PIX":
    case "PICTURE":
      msg.channel.send("Getting a cat pic, brb.");
      const pic = await commands.pics(msg);
      msg.channel.send("Here's a cat pic for you!", { files: [pic] });
      return;

    case "BREED":
    case "BREEDS":
      msg.channel.send("Looking up the kitty, be pawtient.");
      const breed = await commands
        .breeds(words)
        .catch((error) => msg.channel.send(error));

      if (breed.image === null) {
        msg.channel.send({ embed: breed.message });
      } else {
        msg.channel.send({ embed: breed.message, files: [breed.image] });
      }
      return;

    default:
      msg.channel.send("Haven't done this yet, meow.");
      return;
  }
}
