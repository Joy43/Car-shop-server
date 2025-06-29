import { TAdmin } from "../admin/admin.interface";
import { TUser } from "./user.interface";
import User from "./user.model";


const createUser = async (payload: TUser): Promise<TUser> => {
  payload.role = 'user';
  const result = await User.create(payload)
  return result;
}

const createAdminIntoDB = async (userData: TAdmin) => {
  const result = await User.create(userData);
  return result;
};

const getUser = async () => {
  const result = await User.find()
  return result;
};

const getSingleUser = async (id: string) => {
const result = await User.findById(id)
return result
};

const updateUser = async (id: string, payload:Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload)
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
};

export const userService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createAdminIntoDB
};