const emojis = require('./emojis.js');

const spell = (request, response, params) => {
  var defaultText;

  if(!params.text) {
    defaultText = "Hiya";
  } else {
    defaultText = params.text;
  }

  defaultText = defaultText.toUpperCase();
  var emojiString = "";

  for(var i = 0; i < defaultText.length; i++) {
      var currLetter = defaultText[i];
      if(getLetter(currLetter))
        emojiString += getLetter(currLetter);
      else
        emojiString += currLetter;
  }

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(emojiString);
  response.end();
};

const getLetter = (letter) => {
  const letterEmojiArray = emojis.alphabet[letter];
  if(!letterEmojiArray)
    return letter;
  const emojiArrayLength = letterEmojiArray.length;
  const randIndex = getRandomInt(emojiArrayLength);

  return letterEmojiArray[randIndex];
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

module.exports.spell = spell;
