const redis = require("redis")

const RedisClient = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: "6379"
    },
    username: "",
    password: ""
})

const connectRedis = async () => {
    // connect to redis
    await RedisClient.connect()
    
    // handle error
    RedisClient.on('error', (err) => {
        console.error(`An error occurred with Redis: ${err}`)
    })

    console.log('Redis connected successfully...')
}

const testCommands = async () => {
    await connectRedis() // connect to redis

    const setCommand = await RedisClient.set("name", "Tim")
    console.log(setCommand)
    const getCommand = await RedisClient.get("name")
    console.log(getCommand)
    const deleteCommand = await RedisClient.del("days");
    console.log(deleteCommand)
    await RedisClient.setEx("location", 60, "Lagos")
    const location = await RedisClient.get("location")
    console.log(location)
    // create a new list and push to it
    await RedisClient.lPush("days", "monday")
    // push an element from behind
    await RedisClient.rPush("days", "tuesday")
    // push an element from front
    await RedisClient.lPush("days", "wednesday")
    // get array
    const daysArray = await RedisClient.lRange("days", 0, -1)
    console.log(daysArray)

    process.exit(0)
}

testCommands()
