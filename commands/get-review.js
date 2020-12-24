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
    return Math.floor(Math.random() * 10) + 1;
}

module.exports = {
    name: 'xyron-rating',
    description: 'Get a random Xyron Yelp review and rate it randomly',
    execute(message) {



        let params = {
            TableName: 'XyronReviews',
            Key: 'reviews',
            Item: {
                "user": message.author.username
            },
        };
        
        docClient.get(params, (err, data) => {
            if (err) {
                console.log('womp - ' + JSON.stringify(err, null, 2) );
                message.channel.send('more womp');
            } else {
                console.log('yay');
                message.channel.send('yay!');
            }
        })
    }
}