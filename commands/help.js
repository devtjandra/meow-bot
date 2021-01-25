const Discord = require("discord.js");

const commands = {
  "!meow help": "Shows this little list of commands.",
  "!meow facts": "Gives you a random cat fact.",
  "!meow pic": "A little cat pic to brighten your day.",
  "!meow breed <query>": "Searches some stuff up about a breed for you.",
};

function getCommands() {
  var line = "";

  for (var key in commands) {
    if (commands.hasOwnProperty(key)) {
      line += "\n**" + key + "**  →  " + commands[key];
      // console.log(key + " -> " + p[key]);
    }
  }

  return line;
}

function help() {
  const message = new Discord.RichEmbed();

  message.setTitle("Welcome to Meow-Bot!");
  message.addField(
    "Introduction",
    "A bot meant to do as much cat-related things as possible!"
  );
  message.addField(
    "Commands",
    "Here are a list of available commands so far: " + getCommands()
  );
  message.addField(
    "Contribution",
    "If you'd like to add things to this lil buddy, [click here](https://github.com/devtjandra/meow-bot)!"
  );

  return message;
}

module.exports = {
  help: help,
};
