import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { LinhaResultadoProps } from "./LinhaResultado"
import { useEffect, useState } from "react";

export interface ChartProps{
    resultados: LinhaResultadoProps[];
    setShowGrafico: (arg: boolean) => void;
}
interface ChartArray{
    Total: number,
    Rendimento_dos_Juros: number,
    Total_Investido: number,
    mes: number
}

export default function ChartGanhos(props: ChartProps) {
    const [arrayFomatado, setArrayFormatado] = useState<ChartArray[]>([]);

    useEffect(() => {
        const arrayLoop: ChartArray[] = [];
        props.resultados.map(i => {
            arrayLoop.push({
                Total: Number(i.total_acumulado.toFixed(2)),
                Rendimento_dos_Juros: Number(i.rendimento_acumulado.toFixed(2)),
                Total_Investido: Number(i.acumulado.toFixed(2)),
                mes: i.mes
            });
        });
        setArrayFormatado(arrayLoop);
    }, [props.resultados]);
    
    return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-70 flex justify-center flex-wrap items-center z-50 overflow-y-auto ">
        <div className="bg-gray-200 rounded-lg p-3 w-[90%] min-h-[90vh] relative mt-10">
            <button
                onClick={()=> props.setShowGrafico(false)}
                className="absolute top-4 right-4 bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
                Fechar
            </button>
            <div className="px-6 py-4 border-b border-gray-200 ">
                <h1 className="text-lg font-semibold text-black text-center">
                Gráfico dos Ganhos
                </h1>
            </div>
            <div className="p-2">
                <div className="w-full h-[400px]">
                <div className="flex flex-col text-black items-center justify-center w-full font-bold">
                    <div className="flex items-center justify-center">
                        <div className="bg-red-500 h-3 w-3 rounded-full"></div>
                        <p>Total</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="rounded bg-blue-500 h-3 w-3"></div>
                        <p>Rendimento dos Juros</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="rounded bg-green-500 h-3 w-3"></div>
                        <p>Total Investido</p>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height="100%" className={"text-black"}>
                    <LineChart data={arrayFomatado}>
                    <CartesianGrid strokeDasharray="12 12" className="stroke-black" />
                    <XAxis dataKey="mes" stroke="#000000ff" />
                    <YAxis stroke="#000000ff" />
                    <Tooltip/>
                    <Line type="monotone" dataKey="Rendimento_dos_Juros" stroke="#0011ffff" strokeWidth={2} />
                    <Line type="monotone" dataKey="Total_Investido" stroke="#46eb25" strokeWidth={2} />
                    <Line type="monotone" dataKey="Total" stroke="#ff0000ff" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  )
}