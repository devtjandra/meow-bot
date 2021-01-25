const reactions = require("./reactions");
const info = require("./info");
const jemoji = require("./jemoji");

module.exports = {
  react: reactions.reactions,
  facts: info.facts,
  pics: info.pics,
  breeds: info.breeds,
  formatCute: jemoji.formatCute
};
