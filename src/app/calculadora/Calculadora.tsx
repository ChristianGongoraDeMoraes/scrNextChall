"use client";

import { useState, useEffect } from "react";
import { calcular, getHistorico,  excluirItemHistorico} from "./actions";
import { calcularType, CalculationPlainM } from "./types";
import { LinhaResultadoProps } from "./LinhaResultado";
import ResultadoCalculadora from "./ResultadoCalculadora";
import ResultadoHistorico from "./ResultadoHistorico";
import ChartGanhos from "./Chart";



export default function CalculadoraForm() {
    const [historico, setHistorico] = useState<CalculationPlainM[]>([]);
    const [showHistorico, setShowHistorico] = useState<boolean>(false);
    const[showGrafico, setShowGrafico] = useState<boolean>(false);

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
            <button 
            type="button"
              onClick={() => setShowGrafico(true)}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer"
            >
              Gráfico
            </button>
          </div>
        </form>

        {resultados.length > 0 && (<ResultadoCalculadora tipo={tipoPrevisao} resultados={resultados}/>)}
      </div>

      {showHistorico && (<ResultadoHistorico historico={historico} setShowHistorico={setShowHistorico} excluirItemHistoricoF={excluirItemHistoricoF}/>)}
      {showGrafico && <ChartGanhos resultados={resultados} setShowGrafico={setShowGrafico}/>}
    </main>
  );
}