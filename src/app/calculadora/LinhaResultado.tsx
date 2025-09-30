
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
            grid grid-cols-6 
            text-center 
            hover:bg-gray-100 cursor-pointer 
            border-b border-black
        "
        >
            <p className="p-3 font-medium">
                {props.tipo === "ano" ? "Ano" : "Mês"} {props.mes}
            </p>
            <p className="p-3">{formatBRL(props.aporte)}</p>
            <p className="p-3">{formatBRL(props.acumulado)}</p>
            <p className="p-3">{formatBRL(props.rendimento_mes)}</p>
            <p className="p-3">{formatBRL(props.rendimento_acumulado)}</p>
            <p className="p-3 font-semibold">{formatBRL(props.total_acumulado)}</p>
        </div>
    );
}