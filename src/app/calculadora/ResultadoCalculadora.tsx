import LinhaResultado, { LinhaResultadoProps } from "./LinhaResultado";


export interface ResultadoCalculadoraProps{
    tipo?: "mes" | "ano";
    resultados: LinhaResultadoProps[];
}



export default function ResultadoCalculadora(props: ResultadoCalculadoraProps){

    return(
        <div className="mt-6 p-4 bg-white-50 border border-black-200 rounded-lg">
             <div className="grid grid-cols-1 sm:grid-cols-3  text-center font-bold border-b-2 border-black bg-gray-200">
                <p className="p-3 border border-gray-300 w-full">{props.tipo === "ano" ? "Ano" : "Mês"}</p>
                <p className="p-3 border border-gray-300 w-full">Aporte Mensal</p>
                <p className="p-3 border border-gray-300 w-full">Aporte Acumulado</p>
                <p className="p-3 border border-gray-300 w-full">Rendimento {String(props.tipo).charAt(0).toUpperCase() + String(props.tipo).slice(1)}</p>
                <p className="p-3 border border-gray-300 w-full">Rendimento Acumulado</p>
                <p className="p-3 border border-gray-300 w-full">Total Acumulado</p>
            </div>
                {props.resultados.map((res, i)=>(
                    <LinhaResultado
                    key={i}
                    mes={res.mes}
                    aporte={res.aporte}
                    acumulado={res.acumulado}
                    rendimento_mes={res.rendimento_mes}
                    rendimento_acumulado={res.rendimento_acumulado}
                    total_acumulado={res.total_acumulado}
                    tipo={res.tipo}
                    />
                ))}
          </div>
    );
}