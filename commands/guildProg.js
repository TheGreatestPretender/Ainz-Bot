const fetch = require('node-fetch');

module.exports = {
    name: 'progression',
    description: 'Displays the Rock Game Shops raid progression (current expansion only)',
    args: true,
    execute(message, args){
        let difficulty = args[0];
        
        let raids = [];
        
        let regexPattern = /[0-9]\/[0-9]/;

        let progressionObj = {
            raid: '',
            difficulty: '',
            progression: '',
        }
        fetch('https://raider.io/api/v1/guilds/profile?region=us&realm=thunderlord&name=The%20Rock%20Game%20Shop&fields=raid_progression%2C%20raid_rankings')
        .then(res => res.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                progressionObj.raid = Object.keys(data.raid_progression[i]);
            }
            
            console.dir(progressionObj);
            /**let objLength = Object.keys(data.raid_progression).length;
            
            for (let prop in data.raid_progression) {
                let guildRaidObj = new Object();
                guildRaidObj.raid = Object.getOwnPropertyNames(data.raid_progression);
                //console.dir(data.raid_progression)
                raids.push(guildRaidObj);
            }
            console.dir(raids);
            //raidArr.push(Object.keys(data.raid_progression))

          /*   for (let prop in data.raid_progression) {
                console.dir(data.raid_progression[prop].summary)
            } */

        })
        .catch (err => console.error(err));
    }
}