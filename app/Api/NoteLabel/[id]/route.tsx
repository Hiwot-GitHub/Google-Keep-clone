import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

//Deleting notelabel
export async function DELETE(request: NextRequest, {params}: {params: {id: number}}){
    const label = await prisma.label.findUnique({
        where: {id: params.id}
    });
    if (!label)
    return NextResponse.json({error: "Note not found"}, {status: 404});
await prisma.label.delete({
    where: {id: label.id}
});
return NextResponse.json({});
}