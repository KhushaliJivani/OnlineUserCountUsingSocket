const redis = require("redis");
const client = redis.createClient({
    port: 6379,
});
client.on('connect', () => {
    console.log("you are connected to redis");
})
client.on('error', (err) => { //call an error event
    console.log(err.message);
})
//end event
client.on('end', () => {
    console.log("disconnected");
})

module.exports = client;