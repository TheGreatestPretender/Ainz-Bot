const fetch = require('node-fetch');
const blizzCalls = require('../utils/blizzCalls');

async function getItem () {
    try {
      await blizzard.getApplicationToken()
        .then(response => {
          blizzard.defaults.token = response.data.access_token
        });
      const item = await blizzard.wow.item({ id: 168185 });
      console.log(item)
    } catch (err) {
      console.error(err);
    }
}

getItem();

