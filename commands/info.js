const axios = require("axios");
require("dotenv").config();

function facts(msg) {
  axios
    .get("https://catfact.ninja/facts")
    .then((response) => {
      console.info(response.data);
      const fact = response.data.data[0].fact;
      msg.channel.send("=^.^=\n" + fact);
      return;
    })
    .catch((error) => {
      console.info(error);
      return;
    });
}

function pics(msg) {
  axios
    .get(
      "https://api.thecatapi.com/v1/images/search?api_key=" + THE_CAT_API_KEY
    )
    .then((response) => {
      const image = response.data[0].url;
      msg.channel.send("=^.^=", { files: [image] });
      return;
    })
    .catch((error) => {
      console.info(error);
      return;
    });
}

function breeds(msg, words) {
  if (words.size <= 2) {
    msg.channel.send("What breed?");
    return;
  }

  const breed = words[2].toLowerCase();
  axios
    .get(
      "https://api.thecatapi.com/v1/breeds/search?q=" +
        breed +
        "&api_key=" +
        THE_CAT_API_KEY
    )
    .then((response) => {
      const data = response.data[0];
      const name = "**" + data.name + "**";
      const origin = "*Origin: " + data.origin + "*";
      const temperament = data.temperament;
      const description = data.description;

      const message =
        name + "\n" + origin + "\n" + temperament + "\n\n" + description;
      const imageUrl =
        "https://api.thecatapi.com/v1/images/" + data.reference_image_id;
      console.info(imageUrl);
      console.info;

      axios
        .get(imageUrl + "?api_key=" + THE_CAT_API_KEY)
        .then((imgresponse) => {
          const imageSrc = imgresponse.data.url;
          msg.channel.send("=^.^=\n" + message, { files: [imageSrc] });
          return;
        })
        .catch((error) => {
          msg.channel.send(message);
          return;
        });
    })
    .catch((error) => {
      msg.channel.send("Woops, can't find that breed!");
      return;
    });
}

module.exports = {
  facts: facts,
  pics: pics,
  breeds: breeds,
};
