
export interface LinhaResultadoProps{
    mes: number,
    aporte: number,
    acumulado: number,
    rendimento_mes: number,
    rendimento_acumulado: number,
    total_acumulado: number,
    tipo?: "mes" | "ano";
}

export default function LinhaResultado(props: LinhaResultadoProps){
    const formatBRL = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

    return(

        <div
        className="
            grid grid-cols-1 
            sm:grid-cols-3 
            text-center 
            hover:bg-gray-100 cursor-pointer 
            border-b border-black
        "
        >
            <p className="p-3 font-medium border border-gray-300 w-full">
                {props.tipo === "ano" ? "Ano" : "Mês"} {props.mes}
            </p>
            <p className="p-3 border border-gray-300 w-full">{formatBRL(props.aporte)}</p>
            <p className="p-3 border border-gray-300 w-full">{formatBRL(props.acumulado)}</p>
            <p className="p-3 border border-gray-300 w-full">{formatBRL(props.rendimento_mes)}</p>
            <p className="p-3 border border-gray-300 w-full">{formatBRL(props.rendimento_acumulado)}</p>
            <p className="p-3 border border-gray-300 w-full font-semibold">{formatBRL(props.total_acumulado)}</p>
        </div>
    );
}