import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
      email: z.string({
        required_error: "Email must be provided and must be a string",
    }).email(),
      password: z.string({ required_error: 'Password is required' }),
    }),
  })
  const refreshTokenValidationSchema = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh token is required!',
      }),
    }),
  });
  
  export const AuthValidation = {
    loginValidationSchema,refreshTokenValidationSchema
  };