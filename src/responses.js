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

  emojiJSON = {
	  "response_type": "in_channel"
  }
  emojiJSON.text = emojiString

  blameJSON = {
	  "text": "From <@" + request.form['user_id'] + ">",
	  "response_type": "in_channel"
  }

  // Sends 2 messages, the first with emoji, the second blaming the poster
  url = request.form['response_url']
  requests.post(url, json=JSON.stringify(emojiJSON))
  requests.post(url, json=JSON.stringify(blameJSON))

  //emojiString += ` -${params.user_name}`;
  
  const responseJSON = {
    "response_type": "ephemeral" //Deletes command
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
