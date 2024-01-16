import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

//Deleting notelabel
export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    const notelabel = await prisma.noteLabel.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!notelabel)
    return NextResponse.json({error: "Note not found"}, {status: 404});
await prisma.noteLabel.delete({
    where: {id: notelabel.id}
});
return NextResponse.json({});
}