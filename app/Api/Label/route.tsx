import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import { prisma } from "@/prisma/client";


// Getting all labels
export async function GET(request:NextRequest) {
    const labels = await prisma.label.findMany();
    return NextResponse.json(labels);
    
}

//Creating label
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    const label = await prisma.label.create({
        data: {
            name: body.name
           
        }
    })
    return NextResponse.json(label, {status:201});
}