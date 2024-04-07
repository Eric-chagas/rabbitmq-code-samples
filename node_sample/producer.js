import amqp from "amqplib"

async function queueHandler() {
    // Initiate connection to rabbitmq
    const connection = await amqp.connect({
        hostname: 'localhost',
        port: 5672,
        username: 'papercut',
        password: 'secret'
    })

    // Create first message channel
    const channel = await connection.createChannel()

    // Create first queue
    let queue = 'hellofri3nd'
    await channel.assertQueue(queue, {
        durable: true
    })

    // Sending first message
    await sendMessage(channel, queue, 'hello_fri3nd')
    
    // Publish first message
    
    await publishMessage(channel,  queue, 'hello_fri3nd')
    
    // Close channel (using this destroys the channel, rendering external receivers incapable of subscribing to the channel, and thus, incapable of receiving messages)
    // await channel.close()

    // Close connection
    await connection.close()

}

// Send message function
async function sendMessage(channel, queue, msg) {
    let response = await channel.sendToQueue(queue, Buffer.from('Sent message: ' + msg))
    
    console.log("Sending status: ", response)
    console.log(" [x] Sent %s", msg)
}

// Publish message function
async function publishMessage(channel, queue, msg) {
    let response = await channel.publish('', queue, Buffer.from('published: ' + msg))
    
    console.log("Sending status: ", response)
    console.log(" [x] Sent %s", msg)
}


queueHandler()