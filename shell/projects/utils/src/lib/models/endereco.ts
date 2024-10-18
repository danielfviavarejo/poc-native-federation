import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Estado } from './estado';
import { Municipio } from './municipio';

// @dynamic
export class Endereco {

  @IsString()
  @IsOptional()
  logradouro?: string;

  @IsString()
  @IsOptional()
  codigoLogradouro?: string;

  @IsString()
  @IsOptional()
  sequenciaLogradouro?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => Municipio)
  municipio?: Municipio;

  @ValidateNested()
  @IsOptional()
  @Type(() => Estado)
  estado?: Estado;

  @IsString()
  @IsOptional()
  numero?: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsOptional()
  codigoEndereco?: string;

  @IsString()
  @IsOptional()
  CEP?: string;

}
