import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest, {params}: {params: {id: string}}){
    const note = await prisma.note.findUnique({
        where: {id: parseInt(params.id)}
    })
    if (!note)
    return NextResponse.json({error: "note not found"}, {status: 404});
return NextResponse.json(note);
}

//update note
export async function PUT(request: NextRequest, {params}: {params: {id: string}}){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400});
const note = await prisma.note.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!note)
    return NextResponse.json({error: "note not found"}, {status: 404});
const updatedNote = await prisma.note.update({
    where: {id: note.id}, 
    data: {
        title: body.title,
        content: body.content
    }
});
return NextResponse.json(updatedNote, {status: 200})

}

//delete note
export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    const note = await prisma.note.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!note)
    return NextResponse.json({error: "Note not found"}, {status: 404});
await prisma.note.delete({
    where: {id: note.id}
});
return NextResponse.json({});
}