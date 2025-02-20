import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

describe('Create /api/v1/tickets', () => {
  it('should listen to /api/v1/tickets', async () => {
    const response = await request(app).post('/api/v1/tickets').send({})

    expect(response.status).not.toEqual(404)
  });

  it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/v1/tickets').send({}).expect(401) // Unauthorized
  });

  it('should return stauts 200 if the user is signed in, set session', async () => {
    const response = await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({})

    expect(response.status).not.toEqual(401)
  });

  it('should return an error if invalid title provided', async () => {
    await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({
        title: '',
        price: 10
      })
      .expect(400)

  });

  it('should return an error if invalid price provided', async () => {
    await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({
        title: 'test',
        price: -10
      })
      .expect(400)

  });

  it('should create a ticket with valid inuts - working', async () => {

    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({ title: 'test', price: 1001 })
      .expect(201)

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].price).toEqual(1001)

  });
})
