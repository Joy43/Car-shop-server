import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join((process.constrainedMemory(),'.env'))})

export default{
    port:process.env.Port,
    database_url:process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV:process.env.NODE_ENV,
    jwt_secret:process.env.JWT_SECRET,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
}