function react(words) {
  return new Promise(function (resolve, reject) {
    var responses = [];
    words.forEach((word) => {
      switch (word.toUpperCase()) {
        case "CAT":
        case "CATS":
        case "KUCING":
        case "KOCHENG":
          responses.push("😽");
          break;
        case "PUSSY":
        case "PUSSEH":
        case "PUSS":
          responses.push("😼");
          break;
        case "KITTEN":
        case "KITTENS":
          responses.push("😻");
          break;
        case "MEOW":
        case "MEONG":
          responses.push("🙀");
          break;
        case "KITTY":
        case "KITTIES":
          responses.push("😾");
          break;
        default:
          break;
      }
    });
    if (responses.length > 0) resolve(responses);
    return;
  });
}

module.exports = {
  reactions: react,
};
