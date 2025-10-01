import { NextResponse } from "next/server";
import { prisma } from "../../../app/lib/prisma";

export async function POST(request) {
  try {
    const { nomeDoCalculo, data, tipoPrevisao, meses, inicial, userId } = await request.json();

    if (!nomeDoCalculo || !data || !tipoPrevisao || !meses || !inicial || !userId) {
      return NextResponse.json({ message: "Faltam campos obrigatórios" }, { status: 400 });
    }

    await prisma.calculation.create({
        data: { 
            calculation_name: nomeDoCalculo,
            calculation_date: new Date(data),
            initial_contribution: inicial,
            monthly_contribution: aporte,
            rate: taxa,
            rate_type: String(tipoPrevisao),
            months_to_reach_goal: meses,
            user_id: parseInt(userId),
        }
    });
   
   

    return NextResponse.json({ message: "Salvo com sucesso"}, {status: 204});
  } catch (error) {
    return NextResponse.json({ error: "erro" }, { status: 500 });
  }
}
