const blizzard = require('blizzard.js').initialize({
    key: 'client id',
    secret: 'client secret',
    origin: 'us',
    locale: 'en_US'
});

//returns oAuth2 access token
async function getToken () {
    try {
        await blizzard.getApplicationToken().then(resp => {
            console.dir(resp.data);
            blizzard.defaults.token = resp.data.access_token;
            console.log(blizzard.defaults.token);
        })
    } catch (err) { 
        console.error(err);
    }
};

//get character info
async function getChar () {
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

module.exports = {
    getToken,
    getChar
} 
