import { NextRequest, NextResponse } from "next/server";
import schema from './schema';
import { prisma } from "@/prisma/client";
import { json } from "stream/consumers";
import { Label } from "@prisma/client";


// Getting all 
export async function GET(request:NextRequest) {
    const notelabels = await prisma.noteLabel.findMany();
    return NextResponse.json(notelabels);
    
}

//Creating NoteLabel
export async function POST(request: NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);
    if (!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400});
    }
    try{
        let label: Label | null;
        if (body.name !== undefined){
             label = await prisma.label.create({
                data: {
                    name: body.name
                 }
        });
        if(!label){
            return NextResponse.json({ error: 'Label not found' }, { status: 404 });
        }
    }else  if(body.labelId !== undefined){
        label = await prisma.label.findUnique({
            where: {id: body.labelId}
        });
        if(!label){
            return NextResponse.json({ error: 'Label not found' }, { status: 404 });
        }

    }
    
       const newNoteLabel = await prisma.noteLabel.create({
        data:{
            noteId: body.noteId,
            labelId: label!.id
        }
           
        });
        return NextResponse.json(newNoteLabel, {status: 201});

    }catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
   
}