"use server";

import { calcularType, CalculationPlainM } from "./types";
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
  taxaDecimal = (taxa/100);

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
    let valorTotalNovo = 0;
    let rendimentoMes = 0;

    acumuladoAportes += aporte;

    // aplica o aporte antes dos juros
    const valorAntes = valorTotal + aporte; 
    
    // crescimento do capital no mês // APLICA JUROS COM BASE NO SELECIONADO
    if (tipo === "ano") {
      // aplica só no fim do ano
      if (meses % 12 === 0) {
        valorTotalNovo = valorAntes * (1 + taxaDecimal);
        rendimentoMes = valorTotalNovo - valorAntes;
      // meses que nao se aplica
      }else{
        valorTotalNovo = valorAntes;
        rendimentoMes = valorTotalNovo - valorAntes;
      }
    } else {
      // aplica todo mês
      valorTotalNovo = valorAntes * (1 + taxaDecimal);
      rendimentoMes = valorTotalNovo - valorAntes;
    }
    
    valorTotal = valorTotalNovo;

    rendimentoAcumulado += rendimentoMes;

    if(tipo == "ano"){
      if(meses % 12 === 0){
        resultados.push({
          mes: meses,
          aporte: aporte,
          acumulado: acumuladoAportes,
          rendimento_mes: rendimentoMes,
          rendimento_acumulado: rendimentoAcumulado,
          total_acumulado: valorTotal,
        });
      }
    }else if(tipo == "mes"){
      resultados.push({
          mes: meses,
          aporte: aporte,
          acumulado: acumuladoAportes,
          rendimento_mes: rendimentoMes,
          rendimento_acumulado: rendimentoAcumulado,
          total_acumulado: valorTotal,
        });
    }
    if(valorTotal >= 1_000_000){
      resultados.push({
          mes: meses,
          aporte: aporte,
          acumulado: acumuladoAportes,
          rendimento_mes: rendimentoMes,
          rendimento_acumulado: rendimentoAcumulado,
          total_acumulado: valorTotal,
        });
    }

    if (meses > 1000 * 12) break; // trava de segurança
  }

  const sessionToken = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionToken) as SessionPayload | undefined;

  if(session){
    await fetch(`${process.env.PATH_URL_DOMAIN}/api/calc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        nomeDoCalculo, 
        data: new Date(),
        tipoPrevisao, 
        meses, 
        inicial, 
        userId: session.userId
      }),
      cache: "no-store",
    });
  } 


  return resultados;
}



export async function getHistorico(): Promise<CalculationPlainM[]>{
  const sessionToken = (await cookies()).get("session")?.value;
  const session = await decrypt(sessionToken) as SessionPayload | undefined;
  let res: Calculation[] = [];
  let formatedRes: CalculationPlainM[] = [];

  if(!session) { return []}

  let resCalculations = await fetch(`${process.env.PATH_URL_DOMAIN}/api/calc/${session.userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if(!resCalculations.ok) {return []}

  const calculationsArray = await resCalculations.json();
  res = calculationsArray.calculations;


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
  await fetch(`${process.env.PATH_URL_DOMAIN}/api/calc/deleteItem/${itemId}`, 
  {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }
);
}