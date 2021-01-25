const axios = require("axios");
const Discord = require("discord.js");
require("dotenv").config();
const THE_CAT_API_KEY = process.env.THE_CAT_API_KEY;

function facts() {
  return new Promise(async (resolve, reject) => {
    response = await axios.get("https://catfact.ninja/facts");
    resolve(response.data.data[0].fact);
    return;
  });
}

function pics() {
  return new Promise(async (resolve, reject) => {
    response = await axios.get(
      "https://api.thecatapi.com/v1/images/search?api_key=" + THE_CAT_API_KEY
    );
    const image = response.data[0].url;
    resolve(image);
    return;
  });
}

function breeds(words) {
  return new Promise(async (resolve, reject) => {
    if (words.length <= 2) {
      reject("What breed?");
      return;
    }

    const breed = words.slice(2, words.length).join("+");

    response = await axios.get(
      "https://api.thecatapi.com/v1/breeds/search?q=" +
        breed +
        "&api_key=" +
        THE_CAT_API_KEY
    );
    
    const message = new Discord.RichEmbed();
    const data = response.data[0];

    message.setTitle(data.name);
    message.addField("Origin", data.origin);
    message.addField("Life Span", data.life_span);
    message.addField("Temperament", data.temperament);
    message.addField("Description", data.description);
    message.addField("More Info", "[Click here](" + data.wikipedia_url + ")");

    const imageUrl =
      "https://api.thecatapi.com/v1/images/" + data.reference_image_id;

    const image = await axios
      .get(imageUrl + "?api_key=" + THE_CAT_API_KEY)
      .catch(() => {
        resolve({ message: message, image: null });
        return;
      });

    resolve({ message: message, image: image.data.url });
    return;
  });
}

module.exports = {
  facts: facts,
  pics: pics,
  breeds: breeds,
};
