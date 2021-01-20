const fetch = require('node-fetch');
const {makeDateReadable} = require('../utils/utils')

module.exports = {
	name: 'mplus-check',
	description: 'See if you did mplus this week because Kat always forgets to do them...',
	execute(message, args) {
		let character = args[0];
		let realm = args[1];
		
		if (args.length <= 1) {
			message.channel.send(`You are either missing the character name or the realm in which they are on...come on man`);
			return;
		}

		//fetch data depending on user input
		fetch(`https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${character}&fields=mythic_plus_recent_runs`)
		.then(res => res.json())
		.then(data => {
			character = character[0].toUpperCase() + character.substr(1);
			const runObj = data.mythic_plus_recent_runs;
			
			//make sure that the returned array of objects isn't undefined or 0
			if (typeof runObj !== 'undefined' && runObj.length > 0) {
				for (let i = 0; i < runObj.length; i++) {
					const dungeon = runObj[i].dungeon;
					const level = runObj[i].mythic_level;
					const upgrade = runObj[i].num_keystone_upgrades;
					const score = runObj[i].score;
					const daysCompleted = makeDateReadable(runObj[i].completed_at);
						if (upgrade > 0) {
							message.channel.send(`${character} completed ${dungeon} at mythic level ${level} on ${daysCompleted}. The key ended up getting upgrade by ${upgrade} and the raider.io score was ${score}`);

							break;
						}
				}
			} else {
				message.channel.send(`${message.author} heres a thought... how about instead of sending me commands, you just go do one mythic plus on time so you can get phat lewts on Tuesdays? kthxbye`);
				
			}
		});
	}
} 
