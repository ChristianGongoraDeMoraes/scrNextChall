"use client";

import { useState } from "react";
import { calcularPorAno, calcularPorMes } from "./actions";
import { number } from "zod";
import { calcularType } from "./types";
import LinhaResultado, { LinhaResultadoProps } from "./LinhaResultado";


export default function CalculadoraForm() {
    //const [resultado, setResultado] = useState<string>("");
    const [resultados, setResultados] = useState<LinhaResultadoProps[]>([]);
    const [tipoPrevisao, setTipoPrevisao] = useState<"mes" | "ano">("mes");
    const [form, setForm] = useState<calcularType>({
        inicial: undefined,
        taxa: undefined,
        aporte: undefined
    });

    const calcularRes = async () => {
        let res: LinhaResultadoProps[] = [];

         if (tipoPrevisao === "mes") {
            res = await calcularPorMes(form);
        } else {
            res = await calcularPorAno(form);
        }
        
        setResultados(res);
    }

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
              Taxa de Juros
            </label>
            <input
              type="number"
              step="0.01"
              name="taxa"
              placeholder="0,00"
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
          </div>
        </form>

        {resultados.length > 0 && (
          <div className="mt-6 p-4 bg-white-50 border border-black-200 rounded-lg">
            <p className="text-black-800 font-medium">
             <div className="grid grid-cols-6 text-center font-bold border-b-2 border-black bg-gray-200">
                <p className="p-3">{tipoPrevisao === "ano" ? "Ano" : "Mês"}</p>
                <p className="p-3">Inicial</p>
                <p className="p-3">Acumulado</p>
                <p className="p-3">Rendimento Mês</p>
                <p className="p-3">Rendimento Acumulado</p>
                <p className="p-3">Total Acumulado</p>
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
            </p>
          </div>
        )}
      </div>
    </main>
  );
}