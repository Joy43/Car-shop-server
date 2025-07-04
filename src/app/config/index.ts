import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join((process.constrainedMemory(),'.env'))})

export default{
    port:process.env.Port,
    database_url:process.env.DATABASE_URL,
    gemini_api_key:process.env.GEMINI_API_KEY,
    openai_api_key: process.env.OPENAI_API_KEY,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    NODE_ENV:process.env.NODE_ENV,
    jwt_access_secret:process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
    jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    emailSender:process.env.SENDER_EMAIL,
    sender_pass:process.env.SENDER_APP_PASS,
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
      }
}