const fetch = require('node-fetch');

module.exports = {
    name: 'mplus',
    description: 'Get leader board stats of m+ for your character',
    args: true,
    execute(message, args){
        const charName = args[0];
        const serverName = args[1];

       fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${serverName}&name=${charName}&fields=mythic_plus_recent_runs`)
        .then(res => res.json())
        .then(data => {
            let runInfo = data.mythic_plus_recent_runs;
            let runArr = [];

            for(let props in runInfo){
                runArr.push(runInfo[props].dungeon)
                runArr.push(runInfo[props].mythic_level)
                runArr.push(runInfo[props].score)
            }
            console.log(runArr);
            message.channel.send(runArr);
        })
        .catch (err => console.error(err));
    }
}