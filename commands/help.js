const fetch = require('node-fetch');

module.exports = {
  name: 'help',
  description: 'Shows all the options',
  execute(message){
      message.channel.send('**!affix <name of current season m+ affix>** : Gives you the word-for-word Blizzard text for said affix\n**!mplus <character name> <server name>** : Get leader board stats for m+ on your character/server combination\n**!affixes **: Gets the weekly affixes for NA');

  }
};