const fetch = require('node-fetch');

module.exports = {
  name: 'help',
  description: 'Shows all the options',
  execute(message){
      message.channel.send('**!affix <name of current season m+ affix>** : Gives you the word-for-word Blizzard text for said affix\n**!mplus <character name> <server name>** : Get leader board stats for m+ on your character/server combination\n**!affixes **: Gets the weekly affixes for NA\n**!progression <name of current expansion raid>** : Shows you the progress on the highest difficulty that the guild has completed (whole guild does not need to be present to have this be recorded. Just needs to be a \'guild run \').\n\n If you have any new command ideas ask Foxx :heart:');

  }
};