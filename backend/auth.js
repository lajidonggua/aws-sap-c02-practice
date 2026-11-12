import { betterAuth } from 'better-auth';
import { bearer } from 'better-auth/plugins';

export function authOptions(env,database=env.DB){
 return {
  database,secret:env.BETTER_AUTH_SECRET,baseURL:env.AUTH_BASE_URL,
  trustedOrigins:env.ALLOWED_ORIGINS.split(',').map(origin=>origin.trim()),
  emailAndPassword:{enabled:true,minPasswordLength:10,maxPasswordLength:128},
  session:{expiresIn:60*60*24*30,updateAge:60*60*24},
  advanced:{ipAddress:{ipAddressHeaders:['cf-connecting-ip']}},
  rateLimit:{enabled:true,storage:'database',window:60,max:60,customRules:{'/sign-in/email':{window:60,max:5},'/sign-up/email':{window:60,max:3}}},
  plugins:[bearer({requireSignature:true})]
 };
}
export function createAuth(env){return betterAuth(authOptions(env));}
