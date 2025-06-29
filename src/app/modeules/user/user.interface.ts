import { USER_ROLE } from "./user.contant";

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  needsPasswordChange: boolean;
  role: 'user' | 'admin';
  status: 'in-progress' | 'blocked';
  image?:string;
  isBlocked: boolean;
  isDeleted: boolean;
 
};
export type TUserRole = keyof typeof USER_ROLE;