const emojis = require('./emojis.js');
var requests = require('request');

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
      if(defaultText.substring(i, i+3) == ":B:") {
          emojiString += ":B:";
          i += 2;
          continue;
      }
      if(getLetter(currLetter))
        emojiString += getLetter(currLetter);
      else
        emojiString += currLetter;
  }
  
  var emojiJSON = {
    "response_type": "in_channel",
    "text": emojiString
  };
  
  var blameJSON = {
    "response_type": "in_channel",
    "text": "From <@" + params.user_id + ">"
    // Uses the ID of the poster, since usernames are ephemeral
  };
  
  var post_options = {
    url: params.response_url,
    method: "POST",
    json: true
  };
  
  post_options.json = emojiJSON
  requests(post_options, function(error, response, body) {
  });
  
  post_options.json = blameJSON
  requests(post_options, function(error, response, body) {
  });
    
  const responseJSON = {
    "response_type": "ephemeral" // Delete the issued command
  }
  const JSONString = JSON.stringify(responseJSON);
  response.writeHead(200, {'Content-Type': 'application/json', 'response_type': 'ephemeral'});
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
