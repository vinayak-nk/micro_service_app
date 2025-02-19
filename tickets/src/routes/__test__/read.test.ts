import request from 'supertest';
import mongoose, { Types } from 'mongoose';
import { app } from '../../app';

describe('GET/READ /api/v1/tickets/:id', () => {
  it('should return 404 if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).get(`/api/v1/tickets/${id}`).set('Cookie', await global.signin()).expect(404)
    // console.log(resp.body)
  });

  it('should return ticket if found', async () => {
    const title = 'test'
    const price = 100

    const response = await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', await global.signin())
      .send({ title, price })
      .expect(201)

    // console.log("response", response)

    if (Types.ObjectId.isValid(response.body.id)) {
      const objectId = new Types.ObjectId(response.body.id);
      const getTicketResponse = await request(app).get(`/api/v1/tickets/${objectId}`).set('Cookie', await global.signin()).send().expect(200)

      expect(getTicketResponse.body.title).toEqual(title)
      expect(getTicketResponse.body.price).toEqual(price)
    } else {
      console.log("Invalid ObjectId");
    }
  })
})