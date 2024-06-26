import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions} from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import  CredentialsProvider  from 'next-auth/providers/credentials';
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'

export const authOptions:AuthOptions={
  adapter:PrismaAdapter(prisma),
  providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GithubProvider({
        clientId:process.env.GITHUB_ID as string,
        clientSecret:process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { type: 'text', label: 'email' },
            password: { type: 'password', label: 'password' },
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password){
                throw new Error('Invalid credentials')
            }
            
            const user = await prisma.user.findUnique({
                where:{
                    email:credentials.email
                }
            })
            if(!user || !user?.hashedpassword){
                throw new Error('Invalid credentials') 
            }
            const iscorrectPasswoed = await bcrypt.compare(
                credentials.password,
                user.hashedpassword
            )
            if(!iscorrectPasswoed){
                throw new Error('Invalid credentials')
            }

            return user;
        }
    }),
  ],
  
  pages:{
    signIn:"/"
  },
  debug:process.env.NODE_ENV ===('development' || 'production'),
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
  
}

export default NextAuth(authOptions);