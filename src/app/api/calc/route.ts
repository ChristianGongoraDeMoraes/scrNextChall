import { NextResponse } from "next/server";
import { prisma } from "../../../app/lib/prisma";

export async function POST(request: Request) {
  try {
    const { nomeDoCalculo, data, tipoPrevisao, meses, inicial, userId, aporte, taxa } = await request.json();

    if (!nomeDoCalculo || !data || !tipoPrevisao || !meses || !inicial || !userId || !aporte || !taxa) {
      return NextResponse.json({ message: "Faltam campos obrigatórios" }, { status: 400 });
    }

    await prisma.calculation.create({
        data: { 
            calculation_name: nomeDoCalculo,
            calculation_date: data,
            initial_contribution: inicial,
            monthly_contribution: aporte,
            rate: taxa,
            rate_type: String(tipoPrevisao),
            months_to_reach_goal: meses,
            user_id: parseInt(userId),
        }
    });
   
   

    return NextResponse.json({ message: "Salvo com sucesso"}, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
