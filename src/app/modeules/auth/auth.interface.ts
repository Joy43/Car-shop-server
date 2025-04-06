
export interface TLoginUser{
    email:string,
    password:string
}
export interface IJwtPayload {
    userId: string;
    name: string;
    email: string;
    role:'user' | 'admin';
    isBlocked: boolean;
    status: 'in-progress' | 'blocked';
  }