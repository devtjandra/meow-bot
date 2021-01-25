function react(words) {
  return new Promise(function (resolve, reject) {
    words.forEach((word) => {
      switch (word.toUpperCase()) {
        case "CAT":
          resolve("😽");
          break;
        case "PUSSY":
        case "PUSSEH":
        case "PUSS":
          resolve("😼");
          break;
        case "KITTEN":
          resolve("😻");
          break;
        case "MEOW":
        case "MEONG":
          resolve("🙀");
          break;
        case "KITTY":
          resolve("😾");
          break;
        default:
          reject();
          break;
      }
    });
    return;
  });
}

module.exports = {
  reactions: react,
};
