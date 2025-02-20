import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
// import { Ticket } from '../../models/ticket';

const getObjectId = () => new mongoose.Types.ObjectId().toHexString()

const title = 'test'
const price = 100

describe('Update /api/v1/tickets/:id', () => {
  it('should listen to /api/v1/tickets/:id and return 404 if id not found', async () => {
    await request(app).put(`/api/v1/tickets/${getObjectId()}`)
      .set('Cookie', await global.signin())
      .send({ title, price })
      .expect(404)
  });

  it('can only be accessed if the user is signed in. return 401 if unauthorized', async () => {
    await request(app).put(`/api/v1/tickets/${getObjectId()}`)
      // .set('Cookie', await global.signin())
      .expect(401)
  });

  it('can only be accessed if the user if he is the eowner. return 401 if not owner', async () => {

    const response = await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({ title: 'test', price: 1001 })
      .expect(201)

    const objectId = new mongoose.Types.ObjectId(response.body.id);

    await request(app)
      .put(`/api/v1/tickets/${objectId}`)
      .set('Cookie', await global.signin())
      .send({ title: 'test1', price: 2001 })
      .expect(401)
  });

  it('should return an error if invalid title or price is provided. return 400', async () => {
    const cookie = await global.signin()
    const response = await request(app).post('/api/v1/tickets').set('Cookie', cookie).send({ title: 'test', price: 10 })

    const objectId = new mongoose.Types.ObjectId(response.body.id);
    await request(app).put(`/api/v1/tickets/${objectId}`).set('Cookie', cookie).send({ title: '', price: 10 }).expect(400)
    await request(app).put(`/api/v1/tickets/${objectId}`).set('Cookie', cookie).send({ title: 'test', price: -10 }).expect(400)
  });


  it('should update a ticket with valid inuts - working', async () => {
    const cookie = await global.signin()
    const response = await request(app).post('/api/v1/tickets').set('Cookie', cookie).send({ title: 'test', price: 10 })

    const objectId = new mongoose.Types.ObjectId(response.body.id);
    await request(app).put(`/api/v1/tickets/${objectId}`).set('Cookie', cookie).send({ title: 'test1', price: 10 }).expect(200)
  });
})
