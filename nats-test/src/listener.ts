import { randomUUID } from 'crypto'
import nats, { Message, Stan } from 'node-nats-streaming'
import { TicketCreatedListener } from './events/ticket-created-listener'

console.clear()

// const clientId = randomBytes(4).toString().replace(/[^a-zA-Z0-9]/g, "") + 'id'

const clientId = randomUUID()
const client = nats.connect('ticketing', clientId, { url: 'http://localhost:4222' })

client.on('connect', () => {
  console.log('Listener connected to NATS...')

  client.on('close', () => {
    console.log('NATS connection closed...!')
    process.exit()
  })

  new TicketCreatedListener(client).listen()

  /*
  // handled as part of Listen class
  const options = client.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setDurableName('order-service')

  // topic/channel, queue group, options
  const subscription = client.subscribe('ticket:created', 'order-service-queue-group', options)

  subscription.on('message', (msg: Message) => {
    const data = msg.getData()
    if (typeof data === 'string') {
      console.log(`Received event # ${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
  */
})

process.on('SIGINT', () => client.close()) // interrupt
process.on('SIGTERM', () => client.close()) // terminate
