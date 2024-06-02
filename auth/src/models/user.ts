import mongoose from 'mongoose';

/*
  there are 2 issues typescript and mongoose integration.

  1. data type mismtach. Eg: String in TS, string in Mongoose
  2. more properties in mongose than to User model we pass. Eg: createdAt, updatedAt etc 

  to over come this need to define UserModel and Userdoc interfaces.
*/

// An interface describes the props to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// describes the properties that a User "MODEL" has
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

// this function is created to overcome typescript checking at the time of creation of new user.
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// User Model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

/*
  const User = mongoose.model('User', userSchema);
  const buildUser = (attr: UserAttrs) => new User(attr)
  export { User, buildUser }
*/