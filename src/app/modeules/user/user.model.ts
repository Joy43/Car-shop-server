import mongoose, { model, Schema } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import { UserStatus } from "./user.contant";


// -----------user schema--------------
const userSchema=new Schema<TUser>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
          },
          password: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
          },
          status: {
            type: String,
            enum: UserStatus,
            default: 'in-progress',
          },
          image:{type:String,default:'N/A'},
          phone: { type: String, default: 'N/A' },
          address: { type: String, default: 'N/A' },
          city: { type: String, default: 'N/A' },
          isDeleted: {
            type: Boolean,
            default: false,
          },
    },
    {
        timestamps:true,
    }
);
// ---------password encrioted with hash-----------
userSchema.pre('save', async function (next) {

  const user = this; 
  // hashing password and save into DATABASE

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const User = model<TUser>('User', userSchema)
export default User;