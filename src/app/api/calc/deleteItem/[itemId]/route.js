import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(request, {params}){
    try {
        const itemId = await parseInt(params.itemId);
        
        await prisma.calculation.delete({
            where: {
                id: itemId,
            },
        });

        return NextResponse.json({ message: "Deletado" }, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
    }
}