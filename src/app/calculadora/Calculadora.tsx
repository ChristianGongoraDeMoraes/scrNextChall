"use client";

import { useState, useEffect } from "react";
import { calcular, getHistorico,  excluirItemHistorico} from "./actions";
import { number } from "zod";
import { calcularType, CalculationPlainM } from "./types";
import LinhaResultado, { LinhaResultadoProps } from "./LinhaResultado";
import { Calculation } from "@/generated/prisma";



export default function CalculadoraForm() {
    //const [resultado, setResultado] = useState<string>("");
    const [historico, setHistorico] = useState<CalculationPlainM[]>([]);
    const [showHistorico, setShowHistorico] = useState<boolean>(false);

    const [resultados, setResultados] = useState<LinhaResultadoProps[]>([]);
    const [tipoPrevisao, setTipoPrevisao] = useState<"mes" | "ano">("mes");
    const [form, setForm] = useState<calcularType>({
        inicial: undefined,
        taxa: 50,
        aporte: undefined,
        nomeDoCalculo: ""
    });

    const excluirItemHistoricoF = async (itemId: number) => {
      excluirItemHistorico(itemId)

      setHistorico(historico.filter(item => item.id !== itemId))
    }

    const calcularRes = async () => {
        let res: LinhaResultadoProps[] = [];

        if (tipoPrevisao === "mes") {
            res = await calcular(form, tipoPrevisao);
        } else {
            res = await calcular(form, tipoPrevisao);
        }
        
        setResultados(res);
    }

    const myHistory = async() =>{
      let res: CalculationPlainM[] = [];
      res = await getHistorico();
      
      setHistorico(res);

      setShowHistorico(showHistorico => !showHistorico);
    }

    //bloqueia scroll
    useEffect(() => {
      if (showHistorico) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [showHistorico]);

    return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[70%] text-black">
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          SIMULADOR DO PRIMEIRO MILHÃO
        </h1>

        <form
          className="space-y-4"
        >
           <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do Calculo
            </label>
            <input
              type="text"
              name="nomeDoCalculo"
              placeholder="Nome Do Calculo"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => setForm({...form, nomeDoCalculo: String(e.target.value) || ""})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aporte Inicial
            </label>
            <input
              type="number"
              step="0.01"
              name="inicial"
              placeholder="R$ 0,00"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => setForm({...form, inicial: parseFloat(e.target.value) || 0})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Taxa de Juros (%)
            </label>
            <input
              type="number"
              step="0.01"
              name="taxa"
              placeholder="50%"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => setForm({...form, taxa: parseFloat(e.target.value) || 0})}
            />
          </div>
          <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="tipo"
                    value="mes"
                    checked={tipoPrevisao === "mes"}
                    onChange={() => setTipoPrevisao("mes")}
                    />
                    Por Mês
                </label>

                <label className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="tipo"
                    value="ano"
                    checked={tipoPrevisao === "ano"}
                    onChange={() => setTipoPrevisao("ano")}
                    />
                    Por Ano
                </label>
            </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aporte Mensal
            </label>
            <input
              type="number"
              step="0.01"
              name="aporte"
              placeholder="R$ 0,00"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              onChange={(e) => setForm({...form, aporte: parseFloat(e.target.value) || 0})}
            />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="reset"
              onClick={() => setResultados([])}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer"
            >
              LIMPAR
            </button>
            <button 
            type="button"
              onClick={() => calcularRes()}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer"
            >
              CALCULAR
            </button>
            <button 
            type="button"
              onClick={() => myHistory()}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer"
            >
              Historico
            </button>
          </div>
        </form>

        {resultados.length > 0 && (
          <div className="mt-6 p-4 bg-white-50 border border-black-200 rounded-lg">
             <div className="grid grid-cols-1 sm:grid-cols-3  text-center font-bold border-b-2 border-black bg-gray-200">
                <p className="p-3 border border-gray-300 w-full">{tipoPrevisao === "ano" ? "Ano" : "Mês"}</p>
                <p className="p-3 border border-gray-300 w-full">Aporte Mensal</p>
                <p className="p-3 border border-gray-300 w-full">Aporte Acumulado</p>
                <p className="p-3 border border-gray-300 w-full">Rendimento {tipoPrevisao.charAt(0).toUpperCase() + tipoPrevisao.slice(1)}</p>
                <p className="p-3 border border-gray-300 w-full">Rendimento Acumulado</p>
                <p className="p-3 border border-gray-300 w-full">Total Acumulado</p>
            </div>
                {resultados.map((res, i)=>(
                    <LinhaResultado
                        key={i}
                        mes={res.mes}
                        aporte={res.aporte}
                        acumulado={res.acumulado}
                        rendimento_mes={res.rendimento_mes}
                        rendimento_acumulado={res.rendimento_acumulado}
                        total_acumulado={res.total_acumulado}
                        tipo={tipoPrevisao}
                    />
                ))}
          </div>
        )}
      </div>

      {showHistorico && (
        <div className="fixed  inset-0 bg-black bg-opacity-70 flex justify-center flex-wrap items-center z-50 overflow-y-auto ">
            <div className="bg-white rounded-lg p-6 w-[90%] min-h-[90vh] relative mt-10">
              <button
                onClick={() => setShowHistorico(false)}
                className="absolute top-4 right-4 bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600"
              >
                Fechar
              </button>

              <h2 className="text-lg font-bold mb-4 text-center text-black">
                Histórico de Cálculos
              </h2>

              {historico.length === 0 ? (
                <p className="text-center text-black-800">Nenhum cálculo encontrado.</p>
              ) : (
                <table className="w-full border border-gray-300 text-sm text-black">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 border">Nome</th>
                      <th className="p-2 border">Data</th>
                      <th className="p-2 border">Aporte Inicial</th>
                      <th className="p-2 border">Aporte Mensal</th>
                      <th className="p-2 border">Taxa (%)</th>
                      <th className="p-2 border">Tempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historico.map((item) => (
                      <tr key={item.id} className="text-center text-black hover:bg-red-200 cursor-pointer" onClick={() => excluirItemHistoricoF(item.id)}>
                        <td className="p-2 border">{item.calculation_name}</td>
                        <td className="p-2 border">{new Date(item.calculation_date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-2 border">R$ {item.initial_contribution.toFixed(2)}</td>
                        <td className="p-2 border">R$ {item.monthly_contribution.toFixed(2)}</td>
                        <td className="p-2 border">{item.rate.toFixed(2)}%</td>
                        {item.rate_type == "ano" && 
                        <td className="p-2 border">{item.months_to_reach_goal} {item.rate_type}s</td>}
                        {item.rate_type == "mes" && 
                        <td className="p-2 border">{item.months_to_reach_goal} {item.rate_type}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

        </div>
      )}
    </main>
  );
}