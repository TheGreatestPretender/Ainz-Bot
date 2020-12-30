const AWS = require('aws-sdk');

//basic AWS Dynamo Configuration
const awsConfig = {
    'region': 'your region',
    'endpoint': 'your endpoint',
    'accessKeyId': 'your accessKeyId',
    'secretAccessKey': 'your accesskey'
}

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    name: 'xyron-rating',
    description: 'Get a random Xyron Yelp review and rate it randomly',
    execute(message) {
        let listOfReviews = [];
        let params = {
            TableName: 'XyronReviews',
        };
        
        //function that triggers when command is called
        const onScan = (err, data) => {
            if (err) {
                console.error('Unable to get review - ' + JSON.stringify(err, null, 2));
                message.channel.send('Unable to get review');
            } else {
                console.log('Scan success!');
                //loop through the returned query and add only the 'reviews' value into list of reviews
                data.Items.forEach((item) => {
                    listOfReviews.push(item.reviews);
                });
                
                if (typeof data.LastEvaluatedKey != 'undefined') {
                    console.log('Scanning for more...');
                    params.ExclusiveStartKey = data.LastEvaluatedKey;
                    docClient.scan(params, onScan);
                };
                console.log(listOfReviews[Math.floor(Math.random() * listOfReviews.length)]);
                //return a randomized review
                return message.channel.send(listOfReviews[Math.floor(Math.random() * listOfReviews.length)]);
            }
        };

        console.log('scanning reviews table');
        docClient.scan(params, onScan);
    }
}
