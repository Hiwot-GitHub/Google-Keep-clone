import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

//Getting all notes
export async function GET(request: NextRequest){
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
}

//Creating a note
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
    return NextResponse.json(validation.error.errors, {status:400});
const note = await prisma.note.create({
    data: {
        title: body.title,
        content: body.content,
        ownerid: body.ownerid
    }
});
return NextResponse.json(note, {status: 201});
}