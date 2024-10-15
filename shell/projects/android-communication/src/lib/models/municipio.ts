import { IsNumber, IsOptional, IsString } from "class-validator";

export class Municipio {

  @IsNumber()
  @IsOptional()
  codigo?: number;

  @IsString()
  @IsOptional()
  nome?: string;

}
