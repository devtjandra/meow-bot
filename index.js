require("dotenv").config();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const commands = require("./commands/index");

bot.login(TOKEN);

bot.on("message", async (msg) => {
  const words = msg.content.split(" ");

  if (msg.author.bot) return;
  if (words.length === 0) return;

  if (words[0] !== "!meow") {
    await commands
      .react(words)
      .then((response) => msg.react(response))
      .catch((error) => {});
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
      commands.facts(msg);
      break;

    case "PIC":
    case "PICS":
    case "PIX":
    case "PICTURE":
      msg.channel.send("Getting a cat pic, brb.");
      commands.pics(msg);
      break;

    case "BREED":
    case "BREEDS":
      msg.channel.send("Looking up the kitty, be pawtient.");
      commands.breeds(msg, words);
      break;

    default:
      msg.channel.send("Haven't done this yet, meow.");
      break;
  }
});
