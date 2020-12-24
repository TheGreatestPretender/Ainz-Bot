const AWS = require('aws-sdk');

let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIA45SC6DPNNG6KQUPN",
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const randoNumbero = () => {
    return (Math.floor(Math.random() * 10) + 1).toString();
}

const randomSuccessfulMessage = () => {
    let rng = Math.floor(Math.random() * 10) + 1;

    let messages = [
        "I hear you loud and clear even though I wish I didn't... review recieved",
        "This is about Xyron again isn't it... review recieved",
        "Xyron, Xyron, Xyron.... review recieved",
        "I'm surprised you know that many words... review recieved",
        "No promises I'll remember this... review recieved",
        "I'll add that behind the 42069 reviews...",
        "Okay Karen, your review has been recieved",
        "Sorry if it seemed I was interested in reviews, I don't... review unfortunately recieved",
        "We have successfully recieved your review and thrown it out",
        "🥺💩👻🕺🏻🧛🏼🧙🏼🤱🏼🦊🍆",
        "🥺 thank you for the review Oni-chan 🥺"
    ]
    return messages[rng];
}

module.exports = {
    name: 'add-review',
    description: 'Add a Xyron yelp review',
    args: true,
    execute(message, args){
        let review = args.join(' ');

        let messageToSend = {
            "User": message.author.username,
            "Reviews": review,
            "Timestamp": new Date().toString(),
            "reviews": review,
            "ID": randoNumbero()
        }

        let params = {
            TableName: 'XyronReviews',
            Item: messageToSend
        };

        docClient.put(params, (err, data) => {
            if (err) {
                console.log("xyronreviews save error - " + JSON.stringify(err, null, 2));
                message.channel.send(`Pardon me, ${message.author} but are you stupid?... review NOT recieved`);

            } else {
                console.log('xyronreviews save success - ' + JSON.stringify(data, null, 2));
                message.channel.send(randomSuccessfulMessage());
            }
        });
    }
};

