import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ userId: any }> }) {
  try {
    const { userId } = await context.params;

    const calculations = await prisma.calculation.findMany({
      where: {
        user_id: parseInt(userId),
      },
      orderBy: {
        calculation_date: "desc",
      },
    });

    return NextResponse.json({ calculations }, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar cálculos" }, { status: 500 });
  }

}