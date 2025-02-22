import nats from 'node-nats-streaming'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

console.clear()

const client = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
})

client.on('connect', async () => {
  console.log('Publisher connected to NATS...!')
  const data = { id: '123', title: 'connect', price: 20 }

  const publisher = new TicketCreatedPublisher(client)
  try {
    await publisher.publish(data)
  } catch (error) {
    console.error('Error ', error)
  }
  /*
  client.publish('ticket:created', JSON.stringfy(data), () => {
    console.log('Event published')
  })
  */
})