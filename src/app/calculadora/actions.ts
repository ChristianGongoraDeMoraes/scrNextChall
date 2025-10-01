"use server";

import { calcularType, CalculationPlainM } from "./types";
import { prisma } from "../lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { Calculation } from "@/generated/prisma";

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export interface LinhaResultadoProps {
  mes: number;                 
  aporte: number;             
  acumulado: number;          
  rendimento_mes: number;      
  rendimento_acumulado: number;
  total_acumulado: number;   
}

export async function calcular(data: calcularType, tipoPrevisao: String): Promise<LinhaResultadoProps[]> {
  const inicial = Number(data.inicial) || 0;
  const taxa = Number(data.taxa) || 0;
  const aporte = Number(data.aporte) || 0;
  const nomeDoCalculo = data.nomeDoCalculo || "sem_nome";
  const tipo = String(tipoPrevisao) || "mes";
  let taxaDecimal = 0;

  if(tipo == "mes"){
    taxaDecimal = (taxa / 100) / 12;
  }else{
    taxaDecimal = (taxa / 100);
  }

  let valorTotal = inicial;
  let acumuladoAportes = inicial;
  let rendimentoAcumulado = 0;

  let resultados: LinhaResultadoProps[] = [];
  let meses = 1;
  resultados.push({
    mes: meses,
    aporte: aporte,
    acumulado: acumuladoAportes,
    rendimento_mes: 0,
    rendimento_acumulado: rendimentoAcumulado,
    total_acumulado: valorTotal,
  });

  while (valorTotal < 1_000_000) {
    meses++;

    acumuladoAportes += aporte;

    const valorAntes = valorTotal + aporte; //Vt-1 + Am
    const rendimentoMes = valorAntes * taxaDecimal; //(Vt-1 + Am) × R
    valorTotal = valorAntes + rendimentoMes; //(Vt-1 + Am) × (1 + R)

    rendimentoAcumulado += rendimentoMes;

    resultados.push({
      mes: meses,
      aporte: aporte,
      acumulado: acumuladoAportes,
      rendimento_mes: rendimentoMes,
      rendimento_acumulado: rendimentoAcumulado,
      total_acumulado: valorTotal,
    });

    if (meses > 1000 * 12) break; // trava de segurança
  }

  const sessionToken = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionToken) as SessionPayload | undefined;

  if(session){
    await prisma.calculation.create({
       data: { 
         calculation_name: nomeDoCalculo,
         calculation_date: new Date(),
         initial_contribution: inicial,
         monthly_contribution: aporte,
         rate: taxa,
         rate_type: String(tipoPrevisao),
         months_to_reach_goal: meses,
         user_id: parseInt(session.userId),
        }
     });
  } 


  return resultados;
}



export async function getHistorico(): Promise<CalculationPlainM[]>{
  const sessionToken = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionToken) as SessionPayload | undefined;
  let res: Calculation[] = [];
  let formatedRes: CalculationPlainM[] = [];

  if(session){
    res = await prisma.calculation.findMany({
      where:  {
        user_id: parseInt(session.userId)
      }
    });
  }

  for(let i =  0; i < res.length; i++){
    const item = res[i];
    formatedRes.push({
      ...item,
      initial_contribution: Number(item.initial_contribution),
      monthly_contribution: Number(item.monthly_contribution),
      rate: Number(item.rate),
    });
  }

  return formatedRes;
}


export async function excluirItemHistorico(itemId: number){
  await prisma.calculation.delete({
    where: {
      id: itemId,
    },
  });
}