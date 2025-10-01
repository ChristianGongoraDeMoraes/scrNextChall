import { NextResponse } from "next/server";
import { prisma } from "../../../../app/lib/prisma";

export async function GET(request, { params }) {
  try {
    const userId = await parseInt(params.userId);

    const calculations = await prisma.calculation.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        calculation_date: "desc",
      },
    });

    return NextResponse.json({ calculations }, {status: 200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar cálculos" }, { status: 500 });
  }

}