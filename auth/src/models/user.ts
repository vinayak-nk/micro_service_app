import mongoose from 'mongoose';
import { Password } from '../services/password';

/*
  there are 2 issues typescript and mongoose integration.

  1. data type mismtach. Eg: string in TS, String in Mongoose
  2. more properties in mongose than to User model we pass. Eg: createdAt, updatedAt etc 

  to over come this need to define UserModel and Userdoc interfaces.
*/

// Step 3 - An interface describes the props to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// step 5 - An interface that describes the properties that a User "MODEL" has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// step 6 - An interface that describes the props user "DOCUMENT" has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// step 1
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
},
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id

        delete ret._id
        delete ret.password
        delete ret.__v
      }
    }
  }
);

// userSchema.pre is a middleware provided by mongoose. The async function inside it is executed first whenever user tries to save anything to the DB. Do not use arrow fn as it will not have access to 'this' context.
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) { // hash password only when password is modified.
    const password = this.get('password') as string; // Type assertion to ensure 'password' is treated as a string
    const hashedPassword = await Password.toHash(password)
    this.set('password', hashedPassword)
  }
  done()
})

// this function is created to overcome typescript checking at the time of creation of new user.
// step 4 - this function is created to overcome typescript checking at the time of creation of new user.
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// step 2 - User Model - step 7 with interfaces
// const User = mongoose.model('User', userSchema);
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

/*
  const User = mongoose.model('User', userSchema);
  const buildUser = (attr: UserAttrs) => new User(attr)
  export { User, buildUser }
*/

/*
// test
const user = User.build({
  email: 'test@test.com',
  password: '123',
  // test: '' // show error
})

*/

/*
  toJSON in schema is written to transform json object
  {
    "email": "vnk4@gmail.com",
    "password": "71fa2987ee8a29a9ce55b4335167727d4e86f44b99ea4fb2cc203eaf7ca488a9850357a073bb49d0e98591a25b4c9d1f626a1283a79cf08e1b8c6837a89e1dbe.ee51c2624aa26a9b",
    "_id": "67af920be29fe9be67f05584",
    "__v": 0,
  }
  
  to

  {
    "email": "vnk4@gmail.com",
    "id": "67af920be29fe9be67f05584"
  }

*/
