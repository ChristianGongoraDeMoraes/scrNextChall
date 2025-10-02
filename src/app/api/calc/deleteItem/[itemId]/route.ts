import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function DELETE(request: Request,  context: { params: Promise<{ itemId: any}> }){
    try {
        const { itemId } = await context.params;
        

        await prisma.calculation.delete({
            where: {
                id: parseInt(itemId),
            },
        });

        return NextResponse.json({ message: "Deletado" }, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
    }
}