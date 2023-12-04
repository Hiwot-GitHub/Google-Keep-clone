import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client"

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
// create request
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 404});
    
    const checkUser = await prisma.user.findUnique({
        where: {email: body.email}
    });

    if (checkUser)
    return NextResponse.json({error: 'User already exist.'},{status: 400});
    

    const user = await prisma.user.create({
        data: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password
        }
    })
return NextResponse.json(user, {status: 201});
}


