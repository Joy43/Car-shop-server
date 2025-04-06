import { Model } from 'mongoose';

export type TAdmin = {
  role: string;
  name: string;
  email: string;
  password: string;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}