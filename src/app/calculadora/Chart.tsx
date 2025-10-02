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

export interface ChartProps{
    resultados: LinhaResultadoProps[];
    setShowGrafico: (arg: boolean) => void;
}

export default function ChartGanhos(props: ChartProps) {
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
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={props.resultados}>
                    <CartesianGrid strokeDasharray="12 12" className="stroke-gray-300 dark:stroke-gray-600" />
                    <XAxis dataKey="mes" stroke="#000000ff" />
                    <YAxis stroke="#000000ff" />
                    <Tooltip />
                    <Line type="monotone" dataKey="rendimento_acumulado" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="acumulado" stroke="#46eb25" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  )
}