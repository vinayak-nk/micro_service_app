import request from 'supertest';
import { app } from '../../app';

describe('GET/READ /api/v1/tickets', () => {
  it('should return an array of tickets', async () => {
    const price = 100

    await request(app).post('/api/v1/tickets').set('Cookie', await global.signin()).send({ title: 'test1', price }).expect(201)
    await request(app).post('/api/v1/tickets').set('Cookie', await global.signin()).send({ title: 'test2', price }).expect(201)


    const getAllTicketsResponse = await request(app).get(`/api/v1/tickets`).set('Cookie', await global.signin()).send().expect(200)

    console.log("getAllTicketsResponse", getAllTicketsResponse)

    expect(getAllTicketsResponse.body.length).toEqual(2)
  })
})