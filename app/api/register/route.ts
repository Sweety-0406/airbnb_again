import  {NextResponse}  from "next/server";
import prisma from '@/app/libs/prismadb';
import bcrypt from 'bcrypt'

export async function POST(request : Request) {
   const body =await request.json();
   const {email, password,name} = body;

   const hashedpassword = await bcrypt.hash(password,12)
   const user = await prisma.user.create({
    data:{
        email,
        name,
        hashedpassword
    }
   });

   return NextResponse.json(user);
}