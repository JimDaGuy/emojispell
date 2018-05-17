const emojis = require('./emojis.js');

const spell = (request, response, params) => {
  var defaultText;

  if(!params.text) {
    defaultText = "Hi ya";
  } else {
    defaultText = params.text;
  }

  defaultText = defaultText.toUpperCase();
  var emojiString = "";

  for(var i = 0; i < defaultText.length; i++) {
      var currLetter = defaultText[i];
      if(defaultText.substring(i, 3) == ":B:") {
          emojiString += ":B:";
          i += 3;
          continue;
      }
      if(getLetter(currLetter))
        emojiString += getLetter(currLetter);
      else
        emojiString += currLetter;
  }

  const responseJSON = {
    "response_type": "in_channel",
  }

  responseJSON.text = emojiString;
  const JSONString = JSON.stringify(responseJSON);
  console.dir(JSONString);

  response.writeHead(200, {'Content-Type': 'application/json', 'response_type': 'in_channel'});
  response.write(JSONString);
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
