import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join((process.constrainedMemory(),'.env'))})

export default{
    port:process.env.Port,
    database_url:process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    node_env:process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET
}