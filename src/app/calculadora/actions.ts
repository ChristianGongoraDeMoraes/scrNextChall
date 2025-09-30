"use server";

import { calcularType } from "./types";

export interface LinhaResultadoProps {
  mes: number;                 
  aporte: number;             
  acumulado: number;          
  rendimento_mes: number;      
  rendimento_acumulado: number;
  total_acumulado: number;   
}

export async function calcularPorMes(data: calcularType): Promise<LinhaResultadoProps[]> {
  const inicial = Number(data.inicial) || 0;
  const taxa = Number(data.taxa) || 0;
  const aporte = Number(data.aporte) || 0;

  const taxaMensal = (taxa / 100) / 12;

  let valorTotal = inicial;
  let acumuladoAportes = inicial;
  let rendimentoAcumulado = 0;

  let resultados: LinhaResultadoProps[] = [];
  let meses = 0;

  while (valorTotal < 1_000_000) {
    meses++;

    // antes do rendimento: soma aporte
    acumuladoAportes += aporte;

    const valorAntes = valorTotal + aporte;
    const rendimentoMes = valorAntes * taxaMensal;

    valorTotal = valorAntes + rendimentoMes;
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

  return resultados;
}


export async function calcularPorAno(data: calcularType): Promise<LinhaResultadoProps[]> {
  const resultadosMensais = await calcularPorMes(data);

  const resultadosPorAno: LinhaResultadoProps[] = [];
  let acumuladoAno = 0;
  let rendimentoAno = 0;

  for (let i = 0; i < resultadosMensais.length; i += 12) {
    const ano = Math.floor(i / 12) + 1;
    const mesesAno = resultadosMensais.slice(i, i + 12);

    let aporteAno = 0;
    let acumuladoAnoMeses = 0;
    let rendimentoAnoMeses = 0;
    let totalAno = 0;

    mesesAno.forEach((m) => {
      aporteAno += m.aporte;
      acumuladoAnoMeses = m.acumulado;
      rendimentoAnoMeses += m.rendimento_mes;
      totalAno = m.total_acumulado;
    });

    resultadosPorAno.push({
      mes: ano, // aqui representa o ano
      aporte: aporteAno,
      acumulado: acumuladoAnoMeses,
      rendimento_mes: rendimentoAnoMeses,
      rendimento_acumulado: resultadosMensais[i + 11]?.rendimento_acumulado ?? rendimentoAno,
      total_acumulado: totalAno,
    });
  }

  return resultadosPorAno;
}