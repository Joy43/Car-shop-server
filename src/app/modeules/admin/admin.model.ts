import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const adminSchema = new Schema<TAdmin, AdminModel>(
  {
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

adminSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
adminSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);