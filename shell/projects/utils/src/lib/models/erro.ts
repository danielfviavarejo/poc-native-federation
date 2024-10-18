import { IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";
import { TipoInstrucao } from "./erro.enum";

// TODO: Alterar mensagem quando for definido a mensagem padrão pelo time de UX/UI
export const ERRO_DEFAULT: Erro = {
  codigo: "",
  mensagem: "Erro",
  instrucao: "Parece que o serviço está com problemas no momento, tente novamente. Caso o erro persista, entre em contato com o Service Desk para solucionar o problema"
}

// @dynamic
export class Erro {
  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  mensagem!: string;

  @IsEnum(TipoInstrucao)
  @IsOptional()
  tipoInstrucao?: TipoInstrucao;

  @ValidateIf(erro => !erro.tipoInstrucao)
  @IsString()
  instrucao?: string;
}
