export type calcularType = {
    inicial: number | undefined,
    taxa: number | undefined,
    aporte: number | undefined,
    nomeDoCalculo: string | undefined
}

export type CalculationPlainM = {
  id: number;
  calculation_name: string;
  calculation_date: Date;
  initial_contribution: number;
  monthly_contribution: number;
  rate: number;
  rate_type: string;
  months_to_reach_goal: number;
  user_id: number;
}