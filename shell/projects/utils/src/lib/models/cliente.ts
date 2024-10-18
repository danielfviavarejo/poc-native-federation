import { IsNumber, IsOptional, IsString } from "class-validator";

export class Cliente {

  @IsOptional()
  @IsNumber()
  codigo?: number;

  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  documento?: string;

  @IsString()
  nomeCompleto!: string;

  @IsOptional()
  @IsString()
  sexo?: string;

  @IsOptional()
  @IsString()
  tipoPessoa?: string;

}
