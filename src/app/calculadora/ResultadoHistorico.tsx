import { CalculationPlainM } from "./types";

export interface ResultadoHistoricoProps{
    setShowHistorico: (value: boolean) => void;
    excluirItemHistoricoF: (itemId: number) => void;
    historico: CalculationPlainM[];
}


export default function ResultadoHistorico(props: ResultadoHistoricoProps){

    return(
        
        <div className="fixed  inset-0 bg-black bg-opacity-70 flex justify-center flex-wrap items-center z-50 overflow-y-auto ">
            <div className="bg-white rounded-lg p-6 w-[90%] min-h-[90vh] relative mt-10">
              <button
                onClick={()=> props.setShowHistorico(false)}
                className="absolute top-4 right-4 bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Fechar
              </button>

              <h2 className="text-lg font-bold mb-4 text-center text-black">
                Histórico de Cálculos
              </h2>

              {props.historico.length === 0 ? (
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
                    {props.historico.map((item) => (
                      <tr key={item.id} className="text-center text-black hover:bg-red-200 cursor-pointer" onClick={()=>props.excluirItemHistoricoF(item.id)}>
                        <td className="p-2 border">{item.calculation_name}</td>
                        <td className="p-2 border">{new Date(item.calculation_date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-2 border">R$ {item.initial_contribution.toFixed(2)}</td>
                        <td className="p-2 border">R$ {item.monthly_contribution.toFixed(2)}</td>
                        <td className="p-2 border">{item.rate.toFixed(2)}%</td>
                        <td className="p-2 border">{item.months_to_reach_goal} meses</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

        </div>
    );
}