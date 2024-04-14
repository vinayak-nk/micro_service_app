import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface describes the props to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// props user "MODEL" has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// props user "DOCUMENT" has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// pre is a middleware provided by mongoose. do not use arrow fn
userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const password = this.get('password') as string; // Type assertion to ensure 'password' is treated as a string
    const hashedPassword = await Password.toHash(password)
    this.set('password', hashedPassword) 
  }
  done()
})

// this function is created to overcome typescript checking at the time of creation of new user.
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// User Model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
